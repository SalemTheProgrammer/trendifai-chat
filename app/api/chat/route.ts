import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { handleEmail } from '@/lib/emailAgent';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const AGENTIA_EMAIL = "trendifai@gmail.com";

export async function POST(request: Request) {
  try {
    const { message, context, history } = await request.json();
    console.log('Current context:', context);
    console.log('Message:', message);

    // If we have a pending email verification, check confirmation with AI
    if (context?.email && !context.confirmed) {
      const confirmationCheck = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Tu es un assistant qui analyse si un message confirme une information.
            - Réponds UNIQUEMENT par "true" ou "false"
            - "true" si le message confirme ou valide
            - "false" si le message refuse ou est hors sujet
            - Comprends le français et l'anglais
            - Détecte les confirmations indirectes`
          },
          {
            role: "user",
            content: `Le message "${message}" confirme-t-il l'email ${context.email}?`
          }
        ],
        temperature: 0.1,
      });

      const isConfirming = confirmationCheck.choices[0]?.message?.content?.toLowerCase() === 'true';

      if (isConfirming) {
        try {
          console.log('Sending welcome email to:', context.email);
          // Send welcome email to user
          await handleEmail({
            to: context.email,
            subject: "Bienvenue chez Agentia",
            content: `Bonjour ${context.name},\n\nMerci de votre intérêt pour nos solutions d'IA. Notre équipe vous contactera très prochainement.\n\nL'équipe Agentia`,
          }).catch(error => {
            console.error('Error sending welcome email:', error);
            throw new Error('Failed to send welcome email');
          });

          console.log('Sending notification email to:', AGENTIA_EMAIL);
          // Send notification email to Agentia
          await handleEmail({
            to: AGENTIA_EMAIL,
            subject: "Nouveau Contact",
            content: `Nouveau prospect:\nNom: ${context.name}\nEmail: ${context.email}`,
          }).catch(error => {
            console.error('Error sending notification email:', error);
            throw new Error('Failed to send notification email');
          });

          console.log('Emails sent successfully');
          return NextResponse.json({
            response: `Parfait ${context.name}! Les emails ont été envoyés avec succès. Notre équipe vous contactera bientôt. Comment puis-je vous aider maintenant?`,
            contactInfo: { ...context, confirmed: true }
          });
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          return NextResponse.json({
            response: `Désolé ${context.name}, il y a eu un problème avec l'envoi des emails. Pouvez-vous réessayer?`,
            contactInfo: { ...context, confirmed: false }
          });
        }
      }
    }

    const systemPrompt = context?.confirmed ? 
      `Tu es l'assistant d'Agentia. IMPORTANT:
      - L'utilisateur s'appelle ${context.name} (email: ${context.email})
      - Tu as accès à l'historique complet de la conversation
      - NE JAMAIS redemander le nom ou email
      - Si on te demande le nom, réponds "Je sais que vous êtes ${context.name}"
      - Pour les sujets hors IA/contact, suggère ChatGPT avec humour
      - Reste bref` 
      : 
      `Tu es l'assistant d'Agentia. IMPORTANT:
      - votre premier message est "Bonjour, comment puis-je vous aider aujourd'hui?"
      - tu ne dois jamais répondre à un message qui ne concerne pas l'IA ou agentia 
      -agentia une entreprise de conseil en IA et qui cree les agents ai vous etes un de ses produit
      - after the user send you a message, you should ask for the name and email
      - after the user send you the name and email, you should ask for the email confirmation
      -after that send the email directly 
      - Demande UNIQUEMENT le nom et email
      - Dès que tu as l'email, vérifie-le: "Est-ce bien votre email: [email]?"
      - Si confirmé, utilise la fonction send_emails
      - Pour les sujets hors IA/contact, suggère ChatGPT
      - Sois direct et efficace`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...(history || []).map((msg: any) => ({
          role: msg.role,
          content: msg.content
        })),
        { role: "user", content: message }
      ]
    });

    const aiResponse = completion.choices[0].message;

    // If this is a new email collection, save it in context
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    const emailMatch = message.match(emailRegex);
    
    if (!context && emailMatch) {
      const email = emailMatch[0];
      const possibleName = message.split(email)[0].trim();
      const name = possibleName.split(/[,\s]+/).slice(-2).join(' '); // Take last two words as name

      return NextResponse.json({
        response: `Est-ce bien votre email: ${email}?`,
        contactInfo: { name, email, confirmed: false }
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