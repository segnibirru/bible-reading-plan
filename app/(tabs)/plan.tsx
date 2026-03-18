import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { READING_PLAN, getCurrentWeek, DAY_COLORS, WeekPlan } from '../../constants/readingPlan';
import { useProgress } from '../../hooks/useProgress';
import { SafeAreaView } from 'react-native-safe-area-context';

const DAYS: { key: keyof WeekPlan; short: string }[] = [
  { key: 'sunday', short: 'Sun' },
  { key: 'monday', short: 'Mon' },
  { key: 'tuesday', short: 'Tue' },
  { key: 'wednesday', short: 'Wed' },
  { key: 'thursday', short: 'Thu' },
  { key: 'friday', short: 'Fri' },
  { key: 'saturday', short: 'Sat' },
];


export default function PlanScreen() {
  const router = useRouter();
  const currentWeek = getCurrentWeek();
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const weekPlan = READING_PLAN[selectedWeek - 1];
  const { isCompleted, toggleCompleted } = useProgress();

  const totalCompleted = READING_PLAN.reduce((acc, wp) =>
    acc + DAYS.filter(d => isCompleted(`${wp.week}-${d.key}`)).length, 0
  );
  const totalPercent = Math.round((totalCompleted / (52 * 7)) * 100);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reading Plan</Text>
        <View style={styles.overallProgress}>
          <Text style={styles.overallLabel}>Total completed: {totalPercent}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${totalPercent}%` as any }]} />
          </View>
        </View>
      </View>

      {/* Week selector */}
      <View style={styles.weekSelectorContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={READING_PLAN}
          keyExtractor={item => String(item.week)}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          getItemLayout={(_, index) => ({ length: 44, offset: 52 * index, index })}
          initialScrollIndex={Math.max(0, currentWeek - 3)}
          renderItem={({ item }) => {
            const weekDone = DAYS.filter(d => isCompleted(`${item.week}-${d.key}`)).length;
            const isSelected = item.week === selectedWeek;
            const isCurrent = item.week === currentWeek;
            return (
              <TouchableOpacity
                style={[
                  styles.weekBtn,
                  isSelected && styles.weekBtnSelected,
                  isCurrent && !isSelected && styles.weekBtnCurrent,
                ]}
                onPress={() => setSelectedWeek(item.week)}
              >
                <Text style={[styles.weekBtnText, isSelected && styles.weekBtnTextSelected]}>
                  {item.week}
                </Text>
                {weekDone === 7 && <View style={styles.weekDot} />}
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Week details */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.weekHeader}>
          <Text style={styles.weekTitle}>Week {selectedWeek}</Text>
          {selectedWeek === currentWeek && (
            <View style={styles.currentBadge}><Text style={styles.currentBadgeText}>This week</Text></View>
          )}
        </View>

        {DAYS.map(({ key, short }) => {
          const reading = weekPlan?.[key] as any;
          if (!reading || typeof reading !== 'object') return null;
          const progressKey = `${selectedWeek}-${key}`;
          const done = isCompleted(progressKey);
          const color = DAY_COLORS[key];

          return (
            <View key={key} style={[styles.readingRow, done && styles.readingRowDone]}>
              <View style={[styles.dayDot, { backgroundColor: color }]} />
              <TouchableOpacity
                style={styles.readingInfo}
                onPress={() => router.push(`/reading/${encodeURIComponent(reading.apiRef)}`)}
                activeOpacity={0.7}
              >
                <Text style={styles.dayLabel}>{short}  ·  {reading.label}</Text>
                <Text style={styles.readingRef}>{reading.reference}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.checkBtn, done && { backgroundColor: color, borderColor: color }, { borderColor: color }]}
                onPress={() => toggleCompleted(progressKey)}
              >
                <Text style={styles.checkText}>{done ? '✓' : ''}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1e' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 12 },
  overallProgress: {},
  overallLabel: { color: '#888', fontSize: 13, marginBottom: 6 },
  progressBar: { height: 6, backgroundColor: '#2d2d4e', borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#6B4EFF', borderRadius: 3 },
  weekSelectorContainer: { paddingVertical: 12 },
  weekBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#1a1a2e',
    alignItems: 'center', justifyContent: 'center',
  },
  weekBtnSelected: { backgroundColor: '#6B4EFF' },
  weekBtnCurrent: { borderWidth: 2, borderColor: '#6B4EFF' },
  weekBtnText: { color: '#aaa', fontSize: 13, fontWeight: '600' },
  weekBtnTextSelected: { color: '#fff' },
  weekDot: {
    width: 5, height: 5, borderRadius: 3, backgroundColor: '#4ECDC4',
    position: 'absolute', bottom: 4,
  },
  scroll: { flex: 1, paddingHorizontal: 20 },
  weekHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 8 },
  weekTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginRight: 10 },
  currentBadge: { backgroundColor: '#6B4EFF22', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  currentBadgeText: { color: '#6B4EFF', fontSize: 12, fontWeight: '700' },
  readingRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a2e',
    borderRadius: 14, marginBottom: 10, padding: 14,
  },
  readingRowDone: { opacity: 0.55 },
  dayDot: { width: 4, height: 40, borderRadius: 2, marginRight: 14 },
  readingInfo: { flex: 1 },
  dayLabel: { color: '#888', fontSize: 12, marginBottom: 4 },
  readingRef: { color: '#fff', fontSize: 16, fontWeight: '600' },
  checkBtn: {
    width: 36, height: 36, borderRadius: 18, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', marginLeft: 10,
  },
  checkText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});
