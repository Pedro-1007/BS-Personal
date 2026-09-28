import React, { useState } from 'react';
import { Modal, SafeAreaView, StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { BottomNav, Card, TopBar } from './src/components/UI';
import { LoginScreen, WelcomeScreen } from './src/screens/AuthScreens';
import { StudentHome, StudentPlan, StudentProfile, StudentProgress, StudentWorkouts, WorkoutPlayer } from './src/screens/StudentScreens';
import { ClientDetail, TrainerClients, TrainerDashboard, TrainerExercises, TrainerPlans, TrainerProfile } from './src/screens/TrainerScreens';
import { clients, exerciseLibrary, initialClientPlans } from './src/data';
import { colors } from './src/theme';
import { Client, ClientTrainingPlan, Exercise, PlanWeek, Role, StudentTab, TrainerTab, Workout } from './src/types';

export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  const mobileWidth = Math.min(windowWidth, 430);
  const [loginRole, setLoginRole] = useState<Role | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [studentTab, setStudentTab] = useState<StudentTab>('Início');
  const [trainerTab, setTrainerTab] = useState<TrainerTab>('Painel');
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [managedClients, setManagedClients] = useState<Client[]>(clients);
  const [managedExercises, setManagedExercises] = useState<Exercise[]>(exerciseLibrary);
  const [celebrating, setCelebrating] = useState(false);
  const [clientPlans, setClientPlans] = useState<Record<string, ClientTrainingPlan>>(initialClientPlans);

  const logout = () => {
    setRole(null);
    setLoginRole(null);
    setActiveWorkout(null);
    setSelectedClient(null);
    setStudentTab('Início');
    setTrainerTab('Painel');
  };

  if (!loginRole) return <WelcomeScreen onSelect={setLoginRole}/>;
  if (!role) return <LoginScreen role={loginRole} onBack={() => setLoginRole(null)} onLogin={() => setRole(loginRole)}/>;
  if (activeWorkout) return <SafeAreaView style={styles.safe}><View style={[styles.shell, { width: mobileWidth }]}><WorkoutPlayer workout={activeWorkout} onBack={() => setActiveWorkout(null)} onFinish={() => { setActiveWorkout(null); setCelebrating(true); }}/></View></SafeAreaView>;
  if (selectedClient) {
    const selectedPlan = clientPlans[selectedClient.id];
    return <SafeAreaView style={styles.safe}><View style={[styles.shell, { width: mobileWidth }]}><TopBar onLogout={logout} role="trainer"/><ClientDetail client={selectedClient} plan={selectedPlan} exerciseLibrary={managedExercises} onBack={() => setSelectedClient(null)} onSaveWeek={(week) => updatePlanWeek(selectedClient.id, week)} onCreateWorkout={(workout) => createWorkout(selectedClient.id, workout)} onUpdateStatus={(clientId, status) => { setManagedClients((current) => current.map((client) => client.id === clientId ? { ...client, status } : client)); setSelectedClient((current) => current?.id === clientId ? { ...current, status } : current); }} onUpdateMonthlyFee={(clientId, monthlyFee) => { setManagedClients((current) => current.map((client) => client.id === clientId ? { ...client, monthlyFee } : client)); setSelectedClient((current) => current?.id === clientId ? { ...current, monthlyFee } : current); }}/></View></SafeAreaView>;
  }

  const goToWorkouts = () => setStudentTab('Treinos');
  const updatePlanWeek = (clientId: string, updated: PlanWeek) => setClientPlans((current) => ({ ...current, [clientId]: { ...current[clientId], weeks: current[clientId].weeks.map((week) => week.id === updated.id ? updated : week) } }));
  const createWorkout = (clientId: string, workout: Workout) => setClientPlans((current) => ({ ...current, [clientId]: { ...current[clientId], workouts: [...current[clientId].workouts, workout] } }));
  const studentPlan = clientPlans.lucas;
  const studentScreen = studentTab === 'Início' ? <StudentHome workouts={studentPlan.workouts} onStart={setActiveWorkout} onWorkouts={goToWorkouts}/> : studentTab === 'Plano' ? <StudentPlan weeks={studentPlan.weeks}/> : studentTab === 'Treinos' ? <StudentWorkouts workouts={studentPlan.workouts} onStart={setActiveWorkout}/> : studentTab === 'Evolução' ? <StudentProgress/> : <StudentProfile onLogout={logout}/>;
  const trainerScreen = trainerTab === 'Painel' ? <TrainerDashboard clients={managedClients} plans={clientPlans} onClient={setSelectedClient}/> : trainerTab === 'Alunos' ? <TrainerClients clients={managedClients} onClient={setSelectedClient}/> : trainerTab === 'Exercícios' ? <TrainerExercises exercises={managedExercises} onCreate={(exercise) => setManagedExercises((current) => [...current, exercise])}/> : trainerTab === 'Relatórios' ? <TrainerPlans/> : <TrainerProfile onLogout={logout}/>;

  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content"/><ExpoStatusBar style="dark"/>
    <View style={[styles.shell, { width: mobileWidth }]}><TopBar onLogout={logout} role={role}/><View style={styles.content}>{role === 'student' ? studentScreen : trainerScreen}</View><BottomNav role={role} active={role === 'student' ? studentTab : trainerTab} onChange={(tab) => role === 'student' ? setStudentTab(tab as StudentTab) : setTrainerTab(tab as TrainerTab)}/></View>
    <Modal transparent visible={celebrating} animationType="fade"><View style={styles.overlay}><Card style={styles.successCard}><View style={styles.successIcon}><CheckCircle2 size={33} color={colors.white}/></View><Text style={styles.successTitle}>Treino concluído!</Text><Text style={styles.successText}>Mais um passo na sua sequência. Seu personal já pode acompanhar o resultado.</Text><Text style={styles.successAction} onPress={() => setCelebrating(false)}>Continuar</Text></Card></View></Modal>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, alignItems: 'center', backgroundColor: colors.background }, shell: { flex: 1, maxWidth: 430, alignSelf: 'center', backgroundColor: colors.background, borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.border }, content: { flex: 1 }, overlay: { flex: 1, backgroundColor: '#17202AA8', justifyContent: 'center', alignItems: 'center', padding: 25 }, successCard: { width: '100%', maxWidth: 390, alignItems: 'center', padding: 26 }, successIcon: { width: 60, height: 60, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, successTitle: { color: colors.text, fontSize: 23, fontWeight: '800', marginTop: 17 }, successText: { color: colors.muted, fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 8 }, successAction: { color: colors.white, backgroundColor: colors.primary, borderRadius: 14, overflow: 'hidden', paddingHorizontal: 55, paddingVertical: 14, fontSize: 13, fontWeight: '800', marginTop: 21 },
});
