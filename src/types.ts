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
  trainingName?: string;
  title: string;
  focus: string;
  duration: number;
  level: string;
  planDurationWeeks?: number;
  expiresAt?: string;
  status?: 'current' | 'archived';
  archivedAt?: string;
  exercises: Exercise[];
};

export type ClientProfile = {
  birthDate: string;
  phone: string;
  height: string;
  weight: string;
  bodyFat: string;
  availability: string;
  note: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  initials: string;
  goal: string;
  lastActivity: string;
  status: 'Ativo' | 'Atenção' | 'Inativo';
  streak: number;
  monthlyFee: number;
  accessStatus: 'Ativo' | 'Convite enviado';
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
