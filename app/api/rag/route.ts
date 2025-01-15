import { OpenAI } from 'openai';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function saveMessage({ role, content, user_id }: { 
  role: string; 
  content: string; 
  user_id: string; 
}) {
  const { error } = await supabase
    .from('messages')
    .insert({
      role,
      content,
      user_id,
      agent: 'rag'
    });

  if (error) {
    console.error('Error saving message:', error);
    throw error;
  }
}

async function getRecentMessages(userId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('role, content')
    .eq('user_id', userId)
    .eq('agent', 'rag')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return (data || []).reverse().map(msg => ({
    role: msg.role as 'system' | 'user' | 'assistant',
    content: msg.content
  }));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, userId, fileName } = body;

    if (!message || !userId || !fileName) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Save user message
    await saveMessage({
      role: 'user',
      content: message,
      user_id: userId
    });

    // Get query embedding
    const queryEmbeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message.trim(),
    });

    const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

    // Search for relevant chunks
    const { data: chunks, error: searchError } = await supabase
      .rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.78,
        match_count: 5,
        p_user_id: userId,
        p_file_name: fileName
      });

    if (searchError) throw searchError;

    if (!chunks || chunks.length === 0) {
      const noContextResponse = "Je ne trouve pas d'information pertinente dans le document pour répondre à votre question.";
      await saveMessage({
        role: 'assistant',
        content: noContextResponse,
        user_id: userId
      });
      return NextResponse.json({ response: noContextResponse });
    }

    // Get recent conversation history
    const recentMessages = await getRecentMessages(userId);

    // Create completion with context
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Vous êtes un assistant expert en analyse de documents.
Instructions:
1. Basez vos réponses uniquement sur le contexte fourni
2. Si l'information n'est pas dans le contexte, dites-le poliment
3. Citez le contexte pertinent quand c'est approprié
4. Soyez précis et professionnel
5. Si la question n'est pas claire, demandez des précisions`
        },
        ...recentMessages,
        {
          role: "user",
          content: `Contexte du document:\n${chunks.map((c: { content: any; }) => c.content).join('\n\n')}\n\nQuestion: ${message}`
        }
      ],
      temperature: 0.5,
      max_tokens: 500
    });

    const response = completion.choices[0].message.content || 
      "Désolé, je n'ai pas pu générer une réponse.";

    // Save assistant response
    await saveMessage({
      role: 'assistant',
      content: response,
      user_id: userId
    });

    return NextResponse.json({ response });

  } catch (error) {
    console.error('RAG error:', error);
    return NextResponse.json({ 
      response: "Désolé, une erreur est survenue lors du traitement de votre demande.",
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 