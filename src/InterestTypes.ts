export interface Question {
  id: number;
  question: string;
  category: string;
  follow_up_for: number | null;
  created_at: string;
}

export interface UserAnswer {
  id: number;
  user_id: string;
  question_id: number;
  answer: string;
  score: number;
  created_at: string;
}