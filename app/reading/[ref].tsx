import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BibleVerse {
  verse: number;
  text: string;
}

interface BibleResponse {
  reference: string;
  verses: BibleVerse[];
  text: string;
  translation_name: string;
}

export default function ReadingScreen() {
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const router = useRouter();
  const [data, setData] = useState<BibleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fontSize, setFontSize] = useState(17);

  useEffect(() => {
    if (!ref) return;
    const url = `https://bible-api.com/${ref}?translation=web`;
    fetch(url)
      .then(r => r.json())
      .then(json => {
        if (json.error) setError(json.error);
        else setData(json);
      })
      .catch(() => setError('Kunne ikke hente bibelteksten. Sjekk internettforbindelsen.'))
      .finally(() => setLoading(false));
  }, [ref]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6B4EFF" />
          <Text style={styles.loadingText}>Henter bibeltekst...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorIcon}>📵</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => router.back()}>
            <Text style={styles.retryText}>← Tilbake</Text>
          </TouchableOpacity>
        </View>
      ) : data ? (
        <>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.reference}>{data.reference}</Text>
              <Text style={styles.translation}>{data.translation_name}</Text>
            </View>
            <View style={styles.fontControls}>
              <TouchableOpacity style={styles.fontBtn} onPress={() => setFontSize(f => Math.max(12, f - 2))}>
                <Text style={styles.fontBtnText}>A−</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.fontBtn} onPress={() => setFontSize(f => Math.min(28, f + 2))}>
                <Text style={styles.fontBtnText}>A+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <View style={styles.versesContainer}>
              {data.verses.map(verse => (
                <View key={verse.verse} style={styles.verseRow}>
                  <Text style={styles.verseNum}>{verse.verse}</Text>
                  <Text style={[styles.verseText, { fontSize }]}>{verse.text.trim()}</Text>
                </View>
              ))}
            </View>
            <View style={{ height: 40 }} />
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1e' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  loadingText: { color: '#888', marginTop: 16, fontSize: 15 },
  errorIcon: { fontSize: 48, marginBottom: 16 },
  errorText: { color: '#ff6b6b', textAlign: 'center', fontSize: 15, lineHeight: 22 },
  retryBtn: { marginTop: 20, backgroundColor: '#6B4EFF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
  retryText: { color: '#fff', fontWeight: '700' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#1a1a2e',
    borderBottomWidth: 1, borderBottomColor: '#2d2d4e',
  },
  reference: { color: '#fff', fontSize: 18, fontWeight: '700' },
  translation: { color: '#6B4EFF', fontSize: 12, marginTop: 2 },
  fontControls: { flexDirection: 'row', gap: 8 },
  fontBtn: {
    backgroundColor: '#2d2d4e', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8,
  },
  fontBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  scroll: { flex: 1 },
  versesContainer: { padding: 20, gap: 14 },
  verseRow: { flexDirection: 'row' },
  verseNum: {
    color: '#6B4EFF', fontSize: 12, fontWeight: '700', marginRight: 10,
    marginTop: 3, minWidth: 20,
  },
  verseText: { flex: 1, color: '#e8e8e8', lineHeight: 28, fontWeight: '400' },
});
