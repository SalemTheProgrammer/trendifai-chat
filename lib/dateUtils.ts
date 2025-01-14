import { format, isValid, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatMessageDate(dateString: string): string {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    
    if (!isValid(date)) {
      return 'Date invalide';
    }

    return format(date, "d MMM, HH:mm", { locale: fr });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Date invalide';
  }
} 