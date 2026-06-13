import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProgressProvider } from "../context/ProgressContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ProgressProvider>
    </SafeAreaProvider>
  );
}
