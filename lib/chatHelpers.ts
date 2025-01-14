import { Contact } from './contactsService';
import { handleEmail } from './emailAgent';

export function detectIntent(message: string) {
  const messageNormalized = message.toLowerCase();
  
  // Enhanced email intent detection
  const sendPatterns = [
    /envoyer|send|envoi/i,
    /confirmer|confirm|valider/i,
    /d'accord|ok|yes|oui/i,
    /c'est bon|good|perfect/i
  ];
  
  if (sendPatterns.some(pattern => pattern.test(messageNormalized))) {
    return {
      type: 'email',
      action: 'send',
      confidence: 0.9
    };
  }

  return {
    type: 'conversation',
    action: 'chat',
    confidence: 0.5
  };
}

export async function handleEmailSending(emailDraft: string, selectedContact: Contact, history: any[]) {
  if (!emailDraft || !selectedContact) return null;

  // Extract subject from draft or generate one
  const subjectMatch = emailDraft.match(/Subject: (.*?)\n/i);
  const subject = subjectMatch ? subjectMatch[1] : 'New Message';
  
  // Clean up email content
  const content = emailDraft.replace(/Subject: .*?\n/i, '').trim();

  const result = await handleEmail({
    to: selectedContact.email,
    subject,
    content,
    history: history.map(m => m.content)
  });

  return result;
}

export function findSelectedContact(history: any[], contacts: Contact[]) {
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.content.includes('[[CONTACT_SELECTED]]')) {
      const email = msg.content.split('[[CONTACT_SELECTED]]')[1].trim();
      return contacts.find(c => c.email === email) || null;
    }
  }
  return null;
}

export function findEmailDraft(history: any[]) {
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.content.includes('[[EMAIL_DRAFT]]')) {
      return msg.content.split('[[EMAIL_DRAFT]]')[1].trim();
    }
  }
  return null;
}

export function determineStage(selectedContact: Contact | null, emailDraft: string | null) {
  if (!selectedContact) return 'contact_selection';
  if (!emailDraft) return 'composing_email';
  return 'reviewing_email';
}

export function detectLanguage(message: string): string {
  const frenchPatterns = /[éèêëàâäôöûüçîï]/i;
  return frenchPatterns.test(message) ? 'french' : 'english';
} 