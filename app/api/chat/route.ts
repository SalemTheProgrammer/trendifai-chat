import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getContacts } from '@/lib/contactsService';
import { getMessages, saveMessage } from '@/lib/messagesService';
import { handleEmail } from '@/lib/emailAgent';
import { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources/index.mjs';

interface EmailToolCall {
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  tool_calls?: EmailToolCall[];
}

interface EmailParams {
  to: string;
  subject: string;
  content: string;
  needsConfirmation: boolean;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const emailTools = [{
  type: "function",
  function: {
    name: "prepare_email",
    description: "Prepare an email draft for confirmation",
    parameters: {
      type: "object",
      properties: {
        to: {
          type: "string",
          description: "Recipient email address"
        },
        subject: {
          type: "string",
          description: "Email subject line"
        },
        content: {
          type: "string",
          description: "Email body content"
        },
        needsConfirmation: {
          type: "boolean",
          description: "Whether to ask for user confirmation"
        }
      },
      required: ["to", "subject", "content", "needsConfirmation"]
    }
  }
}];

export async function POST(request: Request) {
  try {
    const { message, userId } = await request.json();
    
    await saveMessage({
      role: 'user',
      content: message,
      user_id: userId
    });

    const history = await getMessages(userId);
    const contacts = await getContacts();

    const systemPrompt = `Tu es un assistant AI expert en email. 

Contacts disponibles:
${contacts.map(c => `- ${c.name} (${c.email})`).join('\n')}

Instructions:
1. Demande toujours les informations manquantes (destinataire, sujet, contenu)
2. Propose un brouillon pour confirmation
3. Attends la confirmation de l'utilisateur avant d'envoyer
4. Suggère des améliorations si nécessaire

Processus:
1. Collecter les informations
2. Préparer le brouillon
3. Demander confirmation
4. Envoyer après confirmation`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-5).map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      messages: messages as ChatCompletionMessageParam[],
      model: "gpt-4",
      tools: emailTools as ChatCompletionTool[],
      tool_choice: "auto"
    });

    const response = completion.choices[0].message;
    
    // Handle function calls
    if (response.tool_calls) {
      for (const tool of response.tool_calls) {
        if (tool.function.name === 'prepare_email') {
          const params: EmailParams = JSON.parse(tool.function.arguments);
          
          if (params.needsConfirmation) {
            await saveMessage({
              role: 'system',
              content: `📧 Brouillon d'email:\n\nÀ: ${params.to}\nSujet: ${params.subject}\n\n${params.content}\n\nVoulez-vous envoyer cet email ? (Oui/Non)`,
              user_id: userId
            });
          } else {
            const result = await handleEmail({
              to: params.to,
              subject: params.subject,
              content: params.content,
              history: history.map(m => m.content)
            });

            if (result.success) {
              await saveMessage({
                role: 'system',
                content: `✉️ Email envoyé à ${params.to} ✅\n\nSujet: ${params.subject}`,
                user_id: userId
              });
            }
          }
        }
      }
    }

    await saveMessage({
      role: 'assistant',
      content: response.content || '',
      user_id: userId
    });

    return NextResponse.json({ 
      response: response.content || 'Brouillon préparé ✅' 
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ 
      response: 'Désolé, une erreur est survenue.' 
    }, { status: 500 });
  }
}
