import React from 'react';
import { Bell, CalendarDays, ChartNoAxesColumnIncreasing, Dumbbell, FileChartColumn, Home, LogOut, UserRound, Users } from 'lucide-react-native';
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, shadows } from '../theme';
import { Role } from '../types';

type IconComponent = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

export function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return <View style={styles.brandRow}>
    <View style={[styles.logo, inverse && styles.logoInverse]}><Text style={[styles.logoText, inverse && styles.logoTextInverse]}>BS</Text></View>
    {!compact && <Text style={[styles.brandName, inverse && { color: colors.white }]}>BS <Text style={styles.brandLight}>Personal</Text></Text>}
  </View>;
}

const clientPhoto = require('../../assets/lucas-profile.png');

export function ProfilePhoto({ size = 46 }: { size?: number }) {
  return <Image source={clientPhoto} style={[styles.profilePhoto, { width: size, height: size, borderRadius: Math.round(size / 3) }]}/>;
}

export function TopBar({ onLogout, role }: { onLogout: () => void; role: Role }) {
  return <View style={styles.topBar}><View style={styles.brandRow}>{role === 'student' ? <ProfilePhoto size={38}/> : <View style={styles.logo}><Text style={styles.logoText}>BS</Text></View>}<Text style={styles.brandName}>BS <Text style={styles.brandLight}>Personal</Text></Text></View><View style={styles.topActions}>{role === 'student' ? <Pressable style={styles.iconButton}><Bell size={20} color={colors.text}/><View style={styles.notificationDot}/></Pressable> : null}<Pressable style={styles.iconButton} onPress={onLogout}><LogOut size={20} color={colors.muted}/></Pressable></View></View>;
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle | ViewStyle[] }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionHeader({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return <View style={styles.sectionRow}><View>{eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}<Text style={styles.sectionTitle}>{title}</Text></View>{action && <Pressable onPress={onAction}><Text style={styles.sectionAction}>{action}</Text></Pressable>}</View>;
}

export function Badge({ label, tone = 'orange' }: { label: string; tone?: 'orange' | 'green' | 'red' | 'gray' }) {
  const palette = tone === 'green' ? [colors.greenSoft, colors.green] : tone === 'red' ? [colors.redSoft, colors.red] : tone === 'gray' ? ['#F2F4F7', colors.muted] : [colors.primarySoft, colors.primaryDark];
  return <View style={[styles.badge, { backgroundColor: palette[0] }]}><Text style={[styles.badgeText, { color: palette[1] }]}>{label}</Text></View>;
}

export function StatCard({ icon: Icon, value, label, tone = 'orange', onPress }: { icon: IconComponent; value: string; label: string; tone?: 'orange' | 'amber' | 'dark'; onPress?: () => void }) {
  const color = tone === 'amber' ? colors.amber : tone === 'dark' ? colors.dark : colors.primary;
  return <Pressable disabled={!onPress} onPress={onPress} style={styles.statPressable}><Card style={styles.statCard}><Icon size={19} color={color}/><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></Card></Pressable>;
}

export function Avatar({ initials, size = 46 }: { initials: string; size?: number }) {
  return <View style={[styles.avatar, { width: size, height: size, borderRadius: 16 }]}><Text style={styles.avatarText}>{initials}</Text></View>;
}

const studentItems = [
  { label: 'Início', icon: Home }, { label: 'Plano', icon: CalendarDays }, { label: 'Treinos', icon: Dumbbell }, { label: 'Evolução', icon: ChartNoAxesColumnIncreasing }, { label: 'Perfil', icon: UserRound },
];
const trainerItems = [
  { label: 'Painel', icon: Home }, { label: 'Alunos', icon: Users }, { label: 'Exercícios', icon: Dumbbell }, { label: 'Relatórios', icon: FileChartColumn }, { label: 'Perfil', icon: UserRound },
];

export function BottomNav({ role, active, onChange }: { role: Role; active: string; onChange: (tab: string) => void }) {
  const items = role === 'student' ? studentItems : trainerItems;
  return <View style={styles.bottomNav}>{items.map(({ label, icon: Icon }) => { const selected = label === active; return <Pressable key={label} style={styles.navItem} onPress={() => onChange(label)}><View style={[styles.navIconWrap, selected && styles.navIconSelected]}><Icon size={20} color={selected ? colors.primary : colors.muted} strokeWidth={selected ? 2.5 : 2}/></View><Text style={[styles.navLabel, selected && styles.navLabelSelected]}>{label}</Text></Pressable>; })}</View>;
}

const styles = StyleSheet.create({
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 }, logo: { width: 38, height: 38, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, logoInverse: { backgroundColor: colors.white }, logoText: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: -0.7 }, logoTextInverse: { color: colors.primary }, brandName: { fontSize: 18, fontWeight: '800', color: colors.text, letterSpacing: -0.5 }, brandLight: { fontWeight: '400' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }, topActions: { flexDirection: 'row', gap: 2 }, iconButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }, notificationDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, right: 8, top: 7, borderWidth: 1.5, borderColor: colors.background }, profilePhoto: { resizeMode: 'cover', borderWidth: 2, borderColor: colors.white, backgroundColor: colors.primarySoft },
  card: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 16, ...shadows.card }, sectionRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 25, marginBottom: 12 }, eyebrow: { color: colors.primaryDark, fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: 3 }, sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '800' }, sectionAction: { color: colors.primaryDark, fontSize: 13, fontWeight: '700', paddingBottom: 1 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 999 }, badgeText: { fontSize: 10, fontWeight: '800' }, statPressable: { flex: 1 }, statCard: { flex: 1, minHeight: 105, padding: 13 }, statValue: { color: colors.text, fontSize: 23, lineHeight: 28, fontWeight: '800', marginTop: 10 }, statLabel: { color: colors.muted, fontSize: 11, lineHeight: 15, marginTop: 2 }, avatar: { backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: colors.primaryDark, fontSize: 13, fontWeight: '800' },
  bottomNav: { flexDirection: 'row', backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 7, paddingBottom: 13, paddingHorizontal: 5 }, navItem: { flex: 1, alignItems: 'center', gap: 1 }, navIconWrap: { width: 38, height: 30, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, navIconSelected: { backgroundColor: colors.primarySoft }, navLabel: { color: colors.muted, fontSize: 10, fontWeight: '500' }, navLabelSelected: { color: colors.primaryDark, fontWeight: '700' },
});
