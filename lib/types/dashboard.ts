export interface UserInteraction {
  id: string;
  name: string | null;
  email: string;
  phone?: string;
  projectType?: string;
  lastInteraction: string;
  messageCount: number;
  status: 'new' | 'contacted' | 'converted';
  created_at: string;
}

export interface DashboardStats {
  totalInteractions: number;
  emailsSent: number;
  activeProspects: number;
  conversionRate: number;
} 