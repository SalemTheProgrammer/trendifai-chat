import { useState, useEffect } from 'react';
import { Contact } from '@/lib/contactsService';
import { sendEmail } from '@/lib/email';
import { toast } from 'sonner';

interface EmailHistoryProps {
  contactId: string;
}

export function EmailHistory({ contactId }: EmailHistoryProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
    fetchContact();
  }, [contactId]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${contactId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load message history');
    }
  };

  const fetchContact = async () => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`);
      const data = await response.json();
      setContact(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
      toast.error('Failed to load contact information');
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact || !newMessage.trim()) return;

    setLoading(true);
    try {
      await sendEmail({
        to: contact.email,
        from: process.env.EMAIL_FROM || 'noreply@example.com',
        subject: 'New Message',
        text: newMessage,
        html: newMessage.replace(/\n/g, '<br/>')
      });

      // Save the message to the database
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_id: contactId,
          content: newMessage,
          type: 'sent'
        })
      });

      toast.success('Email sent successfully');
      setNewMessage('');
      fetchMessages(); // Refresh the message list
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-blue-500/20 rounded-xl p-4 bg-blue-950/20">
        <h3 className="text-lg font-semibold text-blue-200 mb-4">Message History</h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-600/20 ml-4' 
                  : 'bg-blue-950/40 mr-4'
              }`}
            >
              <p className="text-blue-200">{message.content}</p>
              <span className="text-xs text-blue-400">
                {new Date(message.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSendEmail} className="space-y-4">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full px-4 py-3 bg-blue-950/20 border border-blue-500/20 rounded-xl
            text-blue-200 placeholder-blue-400/50 focus:outline-none focus:border-blue-500/40"
          rows={4}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={loading || !newMessage.trim()}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  );
} 