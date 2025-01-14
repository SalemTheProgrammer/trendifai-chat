import { ChatOpenAI } from "@langchain/openai";
import nodemailer from 'nodemailer';

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface EmailRequest {
  to: string;
  subject: string;
  content: string;
  history?: string[];
}

export async function handleEmail({ to, subject, content, history = [] }: EmailRequest) {
  try {
    const formattedContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        ${content.replace(/\n/g, '<br>')}
        <br/><br/>
        <hr/>
        <p style="color: #666; font-size: 12px;">
          Sent via Agentia AI Assistant
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html: formattedContent,
      text: content,
    };

    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: result.messageId,
      response: 'Email sent successfully',
      emailContent: formattedContent
    };
  } catch (error: any) {
    console.error('Error in email handling:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

