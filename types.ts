export type Role = 'student' | 'trainer';
export type StudentTab = 'Início' | 'Plano' | 'Treinos' | 'Evolução' | 'Perfil';
export type TrainerTab = 'Painel' | 'Alunos' | 'Exercícios' | 'Relatórios' | 'Perfil';

export type Exercise = {
  id: string;
  name: string;
  group: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  sets: number;
  reps: string;
  rest: string;
  previous: number;
};

export type Workout = {
  id: string;
  title: string;
  focus: string;
  duration: number;
  level: string;
  planDurationWeeks?: number;
  expiresAt?: string;
  exercises: Exercise[];
};

export type Client = {
  id: string;
  name: string;
  initials: string;
  goal: string;
  lastActivity: string;
  status: 'Ativo' | 'Atenção' | 'Inativo';
  streak: number;
  monthlyFee: number;
};

export type PlanWeek = {
  id: string;
  label: string;
  dateRange: string;
  phase: string;
  description: string;
  sessions: number;
  intensity: 'Baixa' | 'Moderada' | 'Alta';
};

export type ClientTrainingPlan = {
  clientId: string;
  weeks: PlanWeek[];
  workouts: Workout[];
};
