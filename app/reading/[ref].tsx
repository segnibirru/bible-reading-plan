import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BibleVerse {
  verse: number;
  text: string;
  chapter?: number;
}

// Parse "romans+1-2" into ["romans+1", "romans+2"]
function expandChapterRefs(ref: string): string[] {
  // Match pattern like "romans+1-2" or "genesis+1-3"
  const match = ref.match(/^(.+)\+(\d+)-(\d+)$/);
  if (!match) return [ref];

  const book = match[1];
  const from = parseInt(match[2]);
  const to = parseInt(match[3]);

  const refs: string[] = [];
  for (let ch = from; ch <= to; ch++) {
    refs.push(`${book}+${ch}`);
  }
  return refs;
}

async function fetchChapter(chapterRef: string): Promise<BibleVerse[]> {
  const url = `https://bible-api.com/${chapterRef}?translation=web`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.error) throw new Error(json.error);

  // Extract chapter number from reference like "Romans 1"
  const chMatch = chapterRef.match(/\+(\d+)$/);
  const chapterNum = chMatch ? parseInt(chMatch[1]) : undefined;

  return (json.verses as BibleVerse[]).map(v => ({ ...v, chapter: chapterNum }));
}

export default function ReadingScreen() {
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const router = useRouter();
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fontSize, setFontSize] = useState(17);

  useEffect(() => {
    if (!ref) return;

    const decoded = decodeURIComponent(ref);
    const chapters = expandChapterRefs(decoded);

    // Build a readable title like "Romans 1–2"
    const bookPart = decoded.split('+')[0].replace(/\+/g, ' ');
    const chapterPart = decoded.includes('-')
      ? decoded.split('+').slice(1).join(' ').replace('-', '–')
      : decoded.split('+').slice(1).join(' ');
    setTitle(`${bookPart.charAt(0).toUpperCase() + bookPart.slice(1)} ${chapterPart}`);

    Promise.all(chapters.map(fetchChapter))
      .then(results => {
        const combined = results.flat();
        setVerses(combined);
      })
      .catch(e => setError(e.message || 'Kunne ikke hente bibelteksten.'))
      .finally(() => setLoading(false));
  }, [ref]);

  // Group verses by chapter for headers
  const showChapterHeaders = verses.length > 0 &&
    verses.some(v => v.chapter !== verses[0].chapter);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6B4EFF" />
          <Text style={styles.loadingText}>Loading Bible text...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => router.back()}>
            <Text style={styles.retryText}>Go back</Text>
          </TouchableOpacity>
        </View>
      ) : verses.length > 0 ? (
        <>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.reference}>{title}</Text>
              <Text style={styles.translation}>World English Bible</Text>
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
              {verses.map((verse, index) => {
                const isNewChapter = showChapterHeaders &&
                  (index === 0 || verse.chapter !== verses[index - 1].chapter);
                return (
                  <View key={`${verse.chapter}-${verse.verse}`}>
                    {isNewChapter && (
                      <Text style={styles.chapterHeader}>Chapter {verse.chapter}</Text>
                    )}
                    <View style={styles.verseRow}>
                      <Text style={styles.verseNum}>{verse.verse}</Text>
                      <Text style={[styles.verseText, { fontSize }]}>{verse.text.trim()}</Text>
                    </View>
                  </View>
                );
              })}
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
  errorText: { color: '#ff6b6b', textAlign: 'center', fontSize: 15, lineHeight: 22, marginBottom: 20 },
  retryBtn: { backgroundColor: '#6B4EFF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20 },
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
  versesContainer: { padding: 20, gap: 10 },
  chapterHeader: {
    color: '#6B4EFF', fontSize: 14, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1,
    marginTop: 20, marginBottom: 8,
  },
  verseRow: { flexDirection: 'row', marginBottom: 4 },
  verseNum: {
    color: '#6B4EFF', fontSize: 11, fontWeight: '700', marginRight: 10,
    marginTop: 4, minWidth: 20,
  },
  verseText: { flex: 1, color: '#e8e8e8', lineHeight: 28 },
});
