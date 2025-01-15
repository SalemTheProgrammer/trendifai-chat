import { OpenAI } from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const CHUNK_SIZE = 1000;

export async function POST(request: Request) {
  try {
    const { fileContent, fileName, userId } = await request.json();

    if (!fileContent || !fileName || !userId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if file already exists
    const { data: existingFile } = await supabase
      .from('embeddings')
      .select('file_name')
      .eq('user_id', userId)
      .eq('file_name', fileName)
      .single();

    if (existingFile) {
      // Delete existing embeddings
      await supabase
        .from('embeddings')
        .delete()
        .eq('user_id', userId)
        .eq('file_name', fileName);
    }

    // Clean and split the text into chunks
    const chunks = splitIntoChunks(fileContent);
    const embeddings: any[] = [];

    // Process all chunks in one go
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunks.map(chunk => chunk.trim()),
    });

    // Create embeddings array
    response.data.forEach((embedding, index) => {
      embeddings.push({
        content: chunks[index],
        embedding: embedding.embedding,
        file_name: fileName,
        user_id: userId,
        created_at: new Date().toISOString()
      });
    });

    // Insert all embeddings in a single transaction
    const { error: insertError } = await supabase
      .from('embeddings')
      .insert(embeddings);

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    return Response.json({ 
      success: true,
      processedChunks: embeddings.length 
    });

  } catch (error) {
    console.error('Error processing file:', error);
    return Response.json({ 
      error: 'Failed to process file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function splitIntoChunks(text: string): string[] {
  const cleanedText = text
    .replace(/\0/g, '')
    .replace(/\\u[0-9a-fA-F]{4}/g, '')
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const sentences = cleanedText.match(/[^.!?]+[.!?]+/g) || [];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > CHUNK_SIZE && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += ' ' + sentence;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter(chunk => chunk.length >= 10);
} 