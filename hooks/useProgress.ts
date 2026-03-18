import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'bible_reading_progress';

export function useProgress() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setCompleted(JSON.parse(data));
      setLoaded(true);
    });
  }, []);

  const toggleCompleted = async (key: string) => {
    const next = { ...completed, [key]: !completed[key] };
    setCompleted(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const isCompleted = (key: string) => !!completed[key];

  return { completed, toggleCompleted, isCompleted, loaded };
}
