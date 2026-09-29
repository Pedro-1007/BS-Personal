import { Client, ClientTrainingPlan, Exercise, PlanWeek, Workout } from './types';

export const workouts: Workout[] = [
  {
    id: 'upper-a', title: 'Superiores A', focus: 'Peito, ombro e tríceps', duration: 48, level: 'Intermediário',
    exercises: [
      { id: 'bench', name: 'Supino reto com barra', group: 'Peitoral', sets: 4, reps: '8–10', rest: '90s', previous: 45 },
      { id: 'fly', name: 'Crucifixo inclinado', group: 'Peitoral', sets: 3, reps: '10–12', rest: '60s', previous: 12 },
      { id: 'triceps', name: 'Tríceps na corda', group: 'Tríceps', sets: 3, reps: '12–15', rest: '60s', previous: 25 },
      { id: 'raise', name: 'Elevação lateral', group: 'Ombros', sets: 3, reps: '12–15', rest: '45s', previous: 8 },
    ],
  },
  {
    id: 'lower-a', title: 'Inferiores A', focus: 'Quadríceps e glúteos', duration: 52, level: 'Intermediário',
    exercises: [
      { id: 'squat', name: 'Agachamento livre', group: 'Quadríceps', sets: 4, reps: '8–10', rest: '120s', previous: 60 },
      { id: 'legpress', name: 'Leg press 45°', group: 'Quadríceps', sets: 4, reps: '10–12', rest: '90s', previous: 140 },
      { id: 'stiff', name: 'Stiff com halteres', group: 'Posterior', sets: 3, reps: '10–12', rest: '75s', previous: 24 },
    ],
  },
  {
    id: 'upper-b', title: 'Superiores B', focus: 'Costas e bíceps', duration: 45, level: 'Intermediário',
    exercises: [
      { id: 'pulldown', name: 'Puxada frontal', group: 'Costas', sets: 4, reps: '8–10', rest: '90s', previous: 50 },
      { id: 'row', name: 'Remada baixa', group: 'Costas', sets: 3, reps: '10–12', rest: '75s', previous: 45 },
      { id: 'curl', name: 'Rosca direta', group: 'Bíceps', sets: 3, reps: '10–12', rest: '60s', previous: 18 },
    ],
  },
];

export const exerciseLibrary: Exercise[] = workouts
  .flatMap((workout) => workout.exercises)
  .filter((exercise, index, list) => list.findIndex((item) => item.id === exercise.id) === index);

export const clients: Client[] = [
  { id: 'lucas', name: 'Lucas Martins', email: 'lucas@aluno.com', initials: 'LM', goal: 'Hipertrofia', lastActivity: 'Hoje, 07:42', status: 'Ativo', streak: 12, monthlyFee: 550, accessStatus: 'Ativo' },
  { id: 'ana', name: 'Ana Beatriz', email: 'ana@aluno.com', initials: 'AB', goal: 'Definição', lastActivity: 'Há 2 dias', status: 'Atenção', streak: 4, monthlyFee: 450, accessStatus: 'Ativo' },
  { id: 'rafael', name: 'Rafael Souza', email: 'rafael@aluno.com', initials: 'RS', goal: 'Ganho de força', lastActivity: 'Há 8 dias', status: 'Inativo', streak: 0, monthlyFee: 520, accessStatus: 'Ativo' },
  { id: 'camila', name: 'Camila Nunes', email: 'camila@aluno.com', initials: 'CN', goal: 'Condicionamento', lastActivity: 'Hoje, 06:18', status: 'Ativo', streak: 8, monthlyFee: 480, accessStatus: 'Ativo' },
];

export const initialPlanWeeks: PlanWeek[] = [
  { id: 'week-1', label: 'Semana 1', dateRange: '29 set – 5 out', phase: 'Adaptação', description: 'Ajustar técnica, ritmo e cargas de referência.', sessions: 3, intensity: 'Baixa' },
  { id: 'week-2', label: 'Semana 2', dateRange: '6 – 12 out', phase: 'Progressão de carga', description: 'Aumentar a carga gradualmente, preservando a execução.', sessions: 4, intensity: 'Moderada' },
  { id: 'week-3', label: 'Semana 3', dateRange: '13 – 19 out', phase: 'Consolidação', description: 'Sustentar os novos pesos e ampliar o volume de treino.', sessions: 4, intensity: 'Moderada' },
  { id: 'week-4', label: 'Semana 4', dateRange: '20 – 26 out', phase: 'Avaliação', description: 'Revisar evolução, medidas e a resposta ao ciclo.', sessions: 3, intensity: 'Baixa' },
];

const withClientWeekIds = (clientId: string, weeks: PlanWeek[]) => weeks.map((week) => ({ ...week, id: `${clientId}-${week.id}` }));
const withSheetValidity = (workout: Workout, planDurationWeeks: number, daysUntilExpiry: number): Workout => ({ ...workout, planDurationWeeks, expiresAt: new Date(Date.now() + daysUntilExpiry * 86400000).toISOString() });

export const initialClientPlans: Record<string, ClientTrainingPlan> = {
  lucas: { clientId: 'lucas', weeks: withClientWeekIds('lucas', initialPlanWeeks), workouts: [withSheetValidity(workouts[0], 4, 6), withSheetValidity(workouts[1], 4, 21), withSheetValidity(workouts[2], 4, 28)] },
  ana: {
    clientId: 'ana',
    weeks: withClientWeekIds('ana', initialPlanWeeks).map((week, index) => index === 0 ? { ...week, phase: 'Base metabólica', description: 'Criar consistência e ajustar o condicionamento para a rotina.', sessions: 3 } : index === 1 ? { ...week, phase: 'Densidade de treino', description: 'Reduzir descansos de forma gradual e manter a técnica.' } : week),
    workouts: [withSheetValidity(workouts[1], 4, 19), withSheetValidity(workouts[2], 4, 26)],
  },
  rafael: {
    clientId: 'rafael',
    weeks: withClientWeekIds('rafael', initialPlanWeeks).map((week, index) => index === 0 ? { ...week, phase: 'Retomada', description: 'Voltar à rotina com cargas controladas e movimentos estáveis.', sessions: 2, intensity: 'Baixa' } : index === 1 ? { ...week, phase: 'Força base', description: 'Aumentar as cargas nos exercícios fundamentais.', intensity: 'Moderada' } : week),
    workouts: [withSheetValidity(workouts[0], 4, 18)],
  },
  camila: {
    clientId: 'camila',
    weeks: withClientWeekIds('camila', initialPlanWeeks).map((week, index) => index === 0 ? { ...week, phase: 'Mobilidade e base', description: 'Construir capacidade de movimento e resistência geral.', sessions: 4 } : index === 1 ? { ...week, phase: 'Condicionamento', description: 'Elevar o ritmo sem perder qualidade nos movimentos.', intensity: 'Alta' } : week),
    workouts: [withSheetValidity(workouts[1], 4, 14), withSheetValidity(workouts[0], 4, 25)],
  },
};
