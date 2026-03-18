import { View, Text, TouchableOpacity, StyleSheet, Switch, Platform, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  registerForPushNotifications,
  scheduleDailyNotification,
  cancelNotifications,
  getNotificationSettings,
} from '../../hooks/useNotifications';
import { useProgress } from '../../hooks/useProgress';
import { getProgressPercentage } from '../../constants/readingPlan';

export default function SettingsScreen() {
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);
  const { completed } = useProgress();
  const totalPercent = getProgressPercentage(completed);

  useEffect(() => {
    getNotificationSettings().then(s => {
      setNotifEnabled(s.enabled);
      setHour(s.hour);
      setMinute(s.minute);
    });
  }, []);

  const handleToggleNotif = async (val: boolean) => {
    if (val) {
      const granted = await registerForPushNotifications();
      if (!granted) {
        Alert.alert('Tillatelse nektet', 'Vennligst aktiver varslinger i telefoninnstillingene.');
        return;
      }
      await scheduleDailyNotification(hour, minute);
      setNotifEnabled(true);
    } else {
      await cancelNotifications();
      setNotifEnabled(false);
    }
  };

  const changeHour = async (delta: number) => {
    const next = (hour + delta + 24) % 24;
    setHour(next);
    if (notifEnabled) await scheduleDailyNotification(next, minute);
  };

  const changeMinute = async (delta: number) => {
    const next = (minute + delta + 60) % 60;
    setMinute(next);
    if (notifEnabled) await scheduleDailyNotification(hour, next);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Innstillinger</Text>
        </View>

        {/* Progress card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Din fremgang</Text>
          <View style={styles.progressCircleRow}>
            <View style={styles.progressCircleWrap}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressCircleNum}>{totalPercent}%</Text>
                <Text style={styles.progressCircleSub}>fullført</Text>
              </View>
            </View>
            <View style={styles.progressStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Dager lest</Text>
                <Text style={styles.statValue}>{Object.values(completed).filter(Boolean).length}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Gjenstår</Text>
                <Text style={styles.statValue}>{364 - Object.values(completed).filter(Boolean).length}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Totalt</Text>
                <Text style={styles.statValue}>364 dager</Text>
              </View>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${totalPercent}%` as any }]} />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daglig påminnelse</Text>
          <Text style={styles.cardSub}>Få en varsling når det er tid for bibellesing</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Aktiver varsling</Text>
            <Switch
              value={notifEnabled}
              onValueChange={handleToggleNotif}
              trackColor={{ false: '#2d2d4e', true: '#6B4EFF' }}
              thumbColor={notifEnabled ? '#fff' : '#666'}
            />
          </View>

          {notifEnabled && (
            <View style={styles.timePickerRow}>
              <Text style={styles.timeLabel}>Tid:</Text>
              <View style={styles.timePicker}>
                <TouchableOpacity style={styles.timeBtn} onPress={() => changeHour(-1)}>
                  <Text style={styles.timeBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.timeValue}>{pad(hour)}</Text>
                <TouchableOpacity style={styles.timeBtn} onPress={() => changeHour(1)}>
                  <Text style={styles.timeBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.timeSep}>:</Text>
              <View style={styles.timePicker}>
                <TouchableOpacity style={styles.timeBtn} onPress={() => changeMinute(-5)}>
                  <Text style={styles.timeBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.timeValue}>{pad(minute)}</Text>
                <TouchableOpacity style={styles.timeBtn} onPress={() => changeMinute(5)}>
                  <Text style={styles.timeBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Om appen</Text>
          <Text style={styles.aboutText}>52 ukers bibelleseplan basert på planen av Michael Coley.</Text>
          <Text style={styles.aboutText}>Bibeltekst hentes fra bible-api.com (World English Bible).</Text>
          <Text style={styles.version}>Versjon 1.0.0</Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1e' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 4 },
  card: {
    marginHorizontal: 20, marginTop: 16, backgroundColor: '#1a1a2e',
    borderRadius: 16, padding: 18,
  },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardSub: { color: '#888', fontSize: 13, marginBottom: 16 },
  progressCircleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  progressCircleWrap: { marginRight: 20 },
  progressCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#6B4EFF22',
    borderWidth: 3, borderColor: '#6B4EFF', alignItems: 'center', justifyContent: 'center',
  },
  progressCircleNum: { color: '#6B4EFF', fontSize: 18, fontWeight: '800' },
  progressCircleSub: { color: '#888', fontSize: 10 },
  progressStats: { flex: 1 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  statLabel: { color: '#888', fontSize: 13 },
  statValue: { color: '#fff', fontSize: 13, fontWeight: '600' },
  progressBar: { height: 6, backgroundColor: '#2d2d4e', borderRadius: 3, marginTop: 4 },
  progressFill: { height: 6, backgroundColor: '#6B4EFF', borderRadius: 3 },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  switchLabel: { color: '#ddd', fontSize: 15 },
  timePickerRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 12,
    backgroundColor: '#0f0f1e', borderRadius: 12, padding: 12,
  },
  timeLabel: { color: '#888', fontSize: 14, marginRight: 12 },
  timePicker: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  timeBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#2d2d4e',
    alignItems: 'center', justifyContent: 'center',
  },
  timeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  timeValue: { color: '#fff', fontSize: 22, fontWeight: '700', minWidth: 32, textAlign: 'center' },
  timeSep: { color: '#fff', fontSize: 22, fontWeight: '700', marginHorizontal: 6 },
  aboutText: { color: '#888', fontSize: 13, lineHeight: 20, marginBottom: 6 },
  version: { color: '#444', fontSize: 12, marginTop: 8 },
});
