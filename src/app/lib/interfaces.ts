export type UUID = string;

export interface Task {
  id: UUID;
  description: string;
  completed: boolean;
  created_at?: string;
}

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at'>;
        Update: Partial<Omit<Task, 'id' | 'created_at'>>;
      };
    };
  };
}
