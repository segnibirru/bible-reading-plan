import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useNotificationListener } from '../hooks/useNotifications';

export default function RootLayout() {
  useNotificationListener();

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="reading/[ref]"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#1a1a2e' },
            headerTintColor: '#fff',
            headerTitle: 'Bible Text',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}
