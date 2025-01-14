import { supabase } from './supabase';

export interface Contact {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export async function getContacts(): Promise<Contact[]> {
  try {
    console.log('Fetching contacts from database...');
    
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('name');

    if (error) {
      console.error('Supabase error fetching contacts:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('No contacts found in database');
    } else {
      console.log(`Found ${data.length} contacts:`, data);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getContacts:', error);
    throw error; // Propagate error for better handling
  }
}

export async function getContactByName(name: string): Promise<Contact | null> {
  try {
    console.log(`Searching for contact with name: ${name}`);
    
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .ilike('name', `%${name}%`)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore not found error
      console.error('Error fetching contact by name:', error);
      throw error;
    }

    if (data) {
      console.log('Found contact:', data);
    } else {
      console.log('No contact found with that name');
    }

    return data;
  } catch (error) {
    console.error('Error in getContactByName:', error);
    throw error;
  }
}

export async function createContact(contact: Omit<Contact, 'id' | 'created_at'>): Promise<Contact> {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
      .select()
      .single();

    if (error) {
      console.error('Error creating contact:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createContact:', error);
    throw error;
  }
}

export async function updateContact(id: string, contact: Partial<Contact>): Promise<Contact> {
  const { data, error } = await supabase
    .from('contacts')
    .update(contact)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating contact: ${error.message}`);
  }

  return data;
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error deleting contact: ${error.message}`);
  }
} 