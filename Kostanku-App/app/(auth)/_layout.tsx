import { Stack } from "expo-router";
import { colors } from "@/constants/theme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.neutral900 },
        animation: 'fade',
        
      }}
    />
  );
}
