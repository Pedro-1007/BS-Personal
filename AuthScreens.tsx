import React, { useState } from 'react';
import { ChevronRight, Dumbbell, Eye, EyeOff, LockKeyhole, Mail, Users } from 'lucide-react-native';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { Brand, Card } from '../components/UI';
import { colors } from '../theme';
import { Role } from '../types';

export function WelcomeScreen({ onSelect }: { onSelect: (role: Role) => void }) {
  const { width } = useWindowDimensions();
  const mobileWidth = Math.min(width, 430);
  return <SafeAreaView style={styles.safe}><ScrollView style={[styles.mobileFrame, { width: mobileWidth }]} contentContainerStyle={styles.welcomePage}>
    <View style={styles.brandHero}><Brand inverse/><Text style={styles.heroEyebrow}>TREINO COM ACOMPANHAMENTO</Text><Text style={styles.heroTitle}>Mais clareza no treino.{`\n`}Mais constância no resultado.</Text><Text style={styles.heroText}>A rotina dos alunos e a gestão do personal no mesmo aplicativo.</Text></View>
    <View style={styles.accessArea}><Text style={styles.accessQuestion}>Como você deseja acessar?</Text><Text style={styles.accessHelper}>Escolha sua área para continuar.</Text>
      <Pressable style={styles.accessCard} onPress={() => onSelect('student')}><View style={styles.accessIcon}><Dumbbell size={23} color={colors.primary}/></View><View style={styles.accessCopy}><Text style={styles.accessTitle}>Área do aluno</Text><Text style={styles.accessText}>Treinos, cargas e evolução pessoal.</Text></View><ChevronRight size={20} color={colors.muted}/></Pressable>
      <Pressable style={styles.accessCard} onPress={() => onSelect('trainer')}><View style={styles.accessIcon}><Users size={23} color={colors.primary}/></View><View style={styles.accessCopy}><Text style={styles.accessTitle}>Área do personal</Text><Text style={styles.accessText}>Alunos, fichas e acompanhamento.</Text></View><ChevronRight size={20} color={colors.muted}/></Pressable>
      <Text style={styles.exclusive}>ACESSO EXCLUSIVO · BS PERSONAL</Text>
    </View>
  </ScrollView></SafeAreaView>;
}

export function LoginScreen({ role, onBack, onLogin }: { role: Role; onBack: () => void; onLogin: () => void }) {
  const { width } = useWindowDimensions();
  const mobileWidth = Math.min(width, 430);
  const [email, setEmail] = useState(role === 'student' ? 'lucas@aluno.com' : 'bruno@bspersonal.com');
  const [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [professionalCode, setProfessionalCode] = useState('123456-G/SP');
  const [error, setError] = useState('');
  const isStudent = role === 'student';
  const submit = () => { if (!email.trim() || password.length < 4) { setError('Preencha o e-mail e uma senha com pelo menos 4 caracteres.'); return; } setError(''); onLogin(); };
  return <SafeAreaView style={styles.safe}><ScrollView style={[styles.mobileFrame, { width: mobileWidth }]} contentContainerStyle={styles.loginPage} keyboardShouldPersistTaps="handled">
    <View style={styles.loginBrand}><Brand/></View><Text style={styles.loginTitle}>{isStudent ? 'Acessar sua conta' : 'Portal do personal'}</Text><Text style={styles.loginText}>{isStudent ? 'Entre para abrir seus treinos e acompanhar sua evolução.' : 'Entre para visualizar a operação, seus alunos e os resultados do negócio.'}</Text>
    <Card style={styles.formCard}><View style={styles.roleHeader}><View style={styles.smallIcon}>{isStudent ? <Dumbbell size={20} color={colors.primary}/> : <Users size={20} color={colors.primary}/>}</View><View><Text style={styles.roleLabel}>{isStudent ? 'ÁREA DO ALUNO' : 'ÁREA DO PERSONAL'}</Text><Pressable onPress={onBack}><Text style={styles.switchRole}>Trocar tipo de acesso</Text></Pressable></View></View>
      {!isStudent && <><Text style={styles.fieldLabel}>CREF ou código profissional</Text><View style={styles.field}><Users size={18} color={colors.muted}/><TextInput value={professionalCode} onChangeText={setProfessionalCode} autoCapitalize="characters" style={styles.input}/></View></>}
      <Text style={styles.fieldLabel}>{isStudent ? 'E-mail' : 'E-mail profissional'}</Text><View style={styles.field}><Mail size={18} color={colors.muted}/><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input}/></View>
      <Text style={styles.fieldLabel}>Senha</Text><View style={styles.field}><LockKeyhole size={18} color={colors.muted}/><TextInput value={password} onChangeText={setPassword} secureTextEntry={!showPassword} style={styles.input}/><Pressable onPress={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} color={colors.muted}/> : <Eye size={18} color={colors.muted}/>}</Pressable></View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.primaryButton} onPress={submit}><Text style={styles.primaryButtonText}>{isStudent ? 'Entrar' : 'Acessar painel profissional'}</Text><ChevronRight size={19} color={colors.white}/></Pressable><Pressable><Text style={styles.forgot}>{isStudent ? 'Esqueci minha senha' : 'Precisa de suporte de acesso?'}</Text></Pressable>
    </Card><Text style={styles.prototype}>Ambiente de demonstração · dados simulados</Text>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, alignItems: 'center', backgroundColor: colors.background }, mobileFrame: { flex: 1, maxWidth: 430, borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.border, backgroundColor: colors.background }, welcomePage: { flexGrow: 1 }, brandHero: { backgroundColor: colors.primary, paddingHorizontal: 26, paddingTop: 25, paddingBottom: 34, minHeight: 330, justifyContent: 'flex-end' }, heroEyebrow: { color: '#FFE2D0', fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginTop: 58 }, heroTitle: { color: colors.white, fontSize: 30, lineHeight: 37, fontWeight: '800', letterSpacing: -1, marginTop: 9 }, heroText: { color: '#FFF0E8', fontSize: 14, lineHeight: 21, marginTop: 11, maxWidth: 330 }, accessArea: { padding: 22, flex: 1 }, accessQuestion: { color: colors.text, fontSize: 21, fontWeight: '800', letterSpacing: -0.4 }, accessHelper: { color: colors.muted, fontSize: 13, marginTop: 3, marginBottom: 17 }, accessCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 11 }, accessIcon: { width: 46, height: 46, borderRadius: 15, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, accessCopy: { flex: 1, paddingHorizontal: 12 }, accessTitle: { color: colors.text, fontSize: 14, fontWeight: '800' }, accessText: { color: colors.muted, fontSize: 12, marginTop: 3 }, exclusive: { color: colors.subtle, fontSize: 9, fontWeight: '700', letterSpacing: 0.8, textAlign: 'center', marginTop: 'auto', paddingTop: 30 },
  loginPage: { flexGrow: 1, justifyContent: 'center', padding: 22 }, loginBrand: { alignItems: 'center', marginBottom: 25 }, loginTitle: { color: colors.text, fontSize: 27, fontWeight: '800', textAlign: 'center', letterSpacing: -0.8 }, loginText: { color: colors.muted, fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 7, marginHorizontal: 20 }, formCard: { marginTop: 25, padding: 19 }, roleHeader: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: colors.border }, smallIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, roleLabel: { color: colors.text, fontSize: 12, fontWeight: '800', letterSpacing: .5 }, switchRole: { color: colors.primaryDark, fontSize: 11, fontWeight: '700', marginTop: 3 }, fieldLabel: { color: colors.text, fontSize: 12, fontWeight: '700', marginTop: 17, marginBottom: 7 }, field: { height: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, gap: 10 }, input: { flex: 1, color: colors.text, fontSize: 14, height: '100%', outlineStyle: 'none' } as any, error: { backgroundColor: colors.redSoft, color: colors.red, padding: 10, borderRadius: 10, fontSize: 11, lineHeight: 16, marginTop: 12 }, primaryButton: { height: 50, backgroundColor: colors.primary, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 21 }, primaryButtonText: { color: colors.white, fontSize: 14, fontWeight: '800' }, forgot: { color: colors.muted, fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 17 }, prototype: { color: colors.subtle, fontSize: 10, textAlign: 'center', marginTop: 21 },
});
