import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { READING_PLAN, getCurrentWeek, getTodayDayKey, DAY_COLORS, WeekPlan } from '../../constants/readingPlan';
import { useProgress } from '../../hooks/useProgress';
import { SafeAreaView } from 'react-native-safe-area-context';

const DAYS: { key: keyof WeekPlan; name: string }[] = [
  { key: 'sunday', name: 'Søndag' },
  { key: 'monday', name: 'Mandag' },
  { key: 'tuesday', name: 'Tirsdag' },
  { key: 'wednesday', name: 'Onsdag' },
  { key: 'thursday', name: 'Torsdag' },
  { key: 'friday', name: 'Fredag' },
  { key: 'saturday', name: 'Lørdag' },
];


export default function TodayScreen() {
  const router = useRouter();
  const week = getCurrentWeek();
  const todayKey = getTodayDayKey();
  const weekPlan = READING_PLAN[week - 1];
  const { isCompleted, toggleCompleted } = useProgress();

  const todayReading = weekPlan ? weekPlan[todayKey] : null;
  const todayName = DAYS.find(d => d.key === todayKey)?.name || '';

  const daysCompleted = DAYS.filter(d => isCompleted(`${week}-${d.key}`)).length;
  const progressPercent = Math.round((daysCompleted / 7) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>Uke {week} av 52</Text>
          <Text style={styles.headerTitle}>Bibellesing</Text>
          <Text style={styles.headerDate}>
            {new Date().toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
        </View>

        {/* Weekly progress bar */}
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Ukentlig fremgang</Text>
            <Text style={styles.progressPercent}>{daysCompleted}/7 dager</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` as any }]} />
          </View>
        </View>

        {/* Today's featured reading */}
        {todayReading && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dagens lesing — {todayName}</Text>
            <TouchableOpacity
              style={[styles.featuredCard, { borderLeftColor: DAY_COLORS[todayKey] }]}
              onPress={() => router.push(`/reading/${encodeURIComponent(todayReading.apiRef)}`)}
              activeOpacity={0.8}
            >
              <View style={styles.featuredTop}>
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredCategory}>{todayReading.label}</Text>
                  <Text style={styles.featuredRef}>{todayReading.reference}</Text>
                </View>
                <View style={[styles.readBadge, { backgroundColor: DAY_COLORS[todayKey] + '22' }]}>
                  <Text style={[styles.readBadgeText, { color: DAY_COLORS[todayKey] }]}>Les nå →</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* All days this week */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hele uken</Text>
          {DAYS.map(({ key, name }) => {
            const reading = weekPlan?.[key] as any;
            if (!reading || typeof reading !== 'object' || !reading.reference) return null;
            const key2 = `${week}-${key}`;
            const done = isCompleted(key2);
            const isToday = key === todayKey;

            return (
              <View key={key} style={[styles.dayCard, isToday && styles.dayCardToday, done && styles.dayCardDone]}>
                <TouchableOpacity
                  style={styles.dayCardInner}
                  onPress={() => router.push(`/reading/${encodeURIComponent(reading.apiRef)}`)}
                  activeOpacity={0.7}
                >
                  <View style={styles.dayInfo}>
                    <Text style={[styles.dayName, isToday && styles.dayNameToday]}>{name}</Text>
                    <Text style={styles.dayCategory}>{reading.label}</Text>
                    <Text style={styles.dayRef}>{reading.reference}</Text>
                  </View>
                  {isToday && <View style={styles.todayBadge}><Text style={styles.todayBadgeText}>I dag</Text></View>}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.checkBtn, done && styles.checkBtnDone, { borderColor: DAY_COLORS[key] }]}
                  onPress={() => toggleCompleted(key2)}
                >
                  <Text style={styles.checkBtnText}>{done ? '✓' : ''}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1e' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  headerSub: { color: '#6B4EFF', fontSize: 13, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '800', marginTop: 4 },
  headerDate: { color: '#888', fontSize: 14, marginTop: 4 },
  progressCard: {
    marginHorizontal: 20, marginTop: 16, backgroundColor: '#1a1a2e',
    borderRadius: 16, padding: 16,
  },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel: { color: '#aaa', fontSize: 13 },
  progressPercent: { color: '#6B4EFF', fontSize: 13, fontWeight: '700' },
  progressBar: { height: 6, backgroundColor: '#2d2d4e', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#6B4EFF', borderRadius: 3 },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 12 },
  featuredCard: {
    backgroundColor: '#1a1a2e', borderRadius: 16, padding: 18,
    borderLeftWidth: 4,
  },
  featuredTop: { flexDirection: 'row', alignItems: 'center' },
  featuredInfo: { flex: 1 },
  featuredCategory: { color: '#aaa', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  featuredRef: { color: '#fff', fontSize: 20, fontWeight: '700', marginTop: 2 },
  readBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  readBadgeText: { fontSize: 13, fontWeight: '700' },
  dayCard: {
    backgroundColor: '#1a1a2e', borderRadius: 14, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', overflow: 'hidden',
  },
  dayCardToday: { backgroundColor: '#22224e', borderWidth: 1, borderColor: '#6B4EFF44' },
  dayCardDone: { opacity: 0.6 },
  dayCardInner: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 14 },
  dayInfo: { flex: 1 },
  dayName: { color: '#aaa', fontSize: 12, fontWeight: '600' },
  dayNameToday: { color: '#6B4EFF' },
  dayCategory: { color: '#666', fontSize: 11, marginTop: 1 },
  dayRef: { color: '#fff', fontSize: 15, fontWeight: '600', marginTop: 2 },
  todayBadge: { backgroundColor: '#6B4EFF22', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginRight: 8 },
  todayBadgeText: { color: '#6B4EFF', fontSize: 11, fontWeight: '700' },
  checkBtn: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 2,
    marginRight: 14, alignItems: 'center', justifyContent: 'center',
  },
  checkBtnDone: { backgroundColor: '#6B4EFF', borderColor: '#6B4EFF' },
  checkBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
