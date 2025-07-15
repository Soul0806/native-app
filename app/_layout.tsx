import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <SafeAreaView>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </SafeAreaView>
    </Stack>
  );
}
