import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { handleEmail } from '@/lib/emailAgent';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const AGENTIA_EMAIL = "trendifai@gmail.com";

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Tu es l'assistant d'Agentia. Sois bref et efficace.
CONTEXTE: ${context ? `L'utilisateur s'appelle ${context.name} (${context.email})` : 'Nouveau utilisateur'}

OBJECTIF: Collecter nom, email et raison du contact.`
        },
        {
          role: "user",
          content: message
        }
      ],
      tools: [{
        type: "function",
        function: {
          name: "send_emails",
          description: "Send welcome and notification emails",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              reason: { type: "string" }
            },
            required: ["name", "email", "reason"],
            additionalProperties: false
          },
          strict: true
        }
      }],
      temperature: 0.7,
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message;
    
    // Check if the model wants to send emails
    if (aiResponse.tool_calls) {
      const toolCall = aiResponse.tool_calls[0];
      const args = JSON.parse(toolCall.function.arguments);

      // Send notification to Agentia
      await handleEmail({
        to: AGENTIA_EMAIL,
        subject: "Nouveau prospect - Assistant Agentia",
        content: `Nouveau prospect:
Nom: ${args.name}
Email: ${args.email}
Raison: ${args.reason}`,
        history: []
      });

      // Send welcome email to user
      await handleEmail({
        to: args.email,
        subject: "Bienvenue chez Agentia",
        content: `Bonjour ${args.name},

Merci de votre intérêt pour Agentia. Notre équipe vous contactera très prochainement concernant votre demande: "${args.reason}"

Cordialement,
L'équipe Agentia`,
        history: []
      });

      return NextResponse.json({ 
        response: `Merci ${args.name}! J'ai transmis vos informations à notre équipe. Vous recevrez bientôt un email de confirmation.`,
        contactInfo: {
          name: args.name,
          email: args.email
        }
      });
    }

    return NextResponse.json({ 
      response: aiResponse.content
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ 
      response: 'Désolé, une erreur est survenue.' 
    }, { status: 500 });
  }
}
