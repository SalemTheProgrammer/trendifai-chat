import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, from, subject, text, html }: EmailParams) {
  try {
    await transporter.sendMail({
      from: `"Agentia Contact" <${process.env.EMAIL_USER}>`,
      replyTo: from,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send email');
  }
} 