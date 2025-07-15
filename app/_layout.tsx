import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "管理系統" }} />
    </Stack>
  );
}
