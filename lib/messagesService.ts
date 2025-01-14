import { supabase } from './supabase';



export async function saveMessage({ role, content, user_id }: any) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          role,
          content,
          user_id,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in saveMessage:', error);
    return null;
  }
}

export async function getMessages(userId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getMessages:', error);
    return [];
  }
} 