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
    
    const systemPrompt = context ? 
      `Tu es l'assistant d'Agentia. L'utilisateur ${context.name} est déjà connu.
      - Aide avec les questions sur l'IA et la prise de contact
      - Pour les sujets hors IA/contact, suggère ChatGPT avec humour
      - Reste bref` 
      : 
      `Tu es l'assistant d'Agentia. IMPORTANT:
      - Si quelqu'un veut contacter Agentia, demande IMMÉDIATEMENT son nom et email
      - Dès que tu as l'email, vérifie-le: "Est-ce bien votre email: [email]?"
      - Si confirmé, utilise la fonction send_emails
      - Pour les sujets hors IA/contact, suggère ChatGPT
      - Sois direct et efficace`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      tools: [{
        type: "function",
        function: {
          name: "send_emails",
          description: "Send welcome email when contact info is collected",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" }
            },
            required: ["name", "email"]
          }
        }
      }]
    });

    const aiResponse = completion.choices[0].message;
    
    if (aiResponse.tool_calls?.[0]) {
      const args = JSON.parse(aiResponse.tool_calls[0].function.arguments);
      
      // Send welcome email
      await handleEmail({
        to: args.email,
        subject: "Bienvenue chez Agentia",
        content: `Bonjour ${args.name},\n\nMerci de votre intérêt pour nos solutions d'IA. Notre équipe vous contactera très prochainement.\n\nL'équipe Agentia`,
      });

      // Notify Agentia
      await handleEmail({
        to: AGENTIA_EMAIL,
        subject: "Nouveau Contact",
        content: `Nouveau prospect:\nNom: ${args.name}\nEmail: ${args.email}`,
      });

      return NextResponse.json({ 
        response: `Parfait ${args.name}! Notre équipe vous contactera bientôt.`,
        contactInfo: { name: args.name, email: args.email }
      });
    }

    return NextResponse.json({ response: aiResponse.content });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ 
      response: 'Désolé, une erreur est survenue.' 
    }, { status: 500 });
  }
}