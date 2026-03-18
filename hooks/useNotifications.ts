import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const NOTIF_HOUR_KEY = 'notif_hour';
const NOTIF_MIN_KEY = 'notif_min';
const NOTIF_ENABLED_KEY = 'notif_enabled';

export async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('bible-reading', {
      name: 'Bibellesing',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
}

export async function scheduleDailyNotification(hour: number, minute: number) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time for Bible Reading',
      body: 'Your daily Bible reading is waiting for you.',
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
  await AsyncStorage.setItem(NOTIF_HOUR_KEY, String(hour));
  await AsyncStorage.setItem(NOTIF_MIN_KEY, String(minute));
  await AsyncStorage.setItem(NOTIF_ENABLED_KEY, 'true');
}

export async function cancelNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await AsyncStorage.setItem(NOTIF_ENABLED_KEY, 'false');
}

export async function getNotificationSettings() {
  const hour = await AsyncStorage.getItem(NOTIF_HOUR_KEY);
  const min = await AsyncStorage.getItem(NOTIF_MIN_KEY);
  const enabled = await AsyncStorage.getItem(NOTIF_ENABLED_KEY);
  return {
    hour: hour ? parseInt(hour) : 8,
    minute: min ? parseInt(min) : 0,
    enabled: enabled === 'true',
  };
}

export function useNotificationListener() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(() => {});
    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {});
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
}
