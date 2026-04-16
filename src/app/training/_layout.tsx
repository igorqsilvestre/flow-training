import { theme } from "@/src/shared/themes/theme";
import { Stack } from "expo-router";

export default function Layout() {
    return (
     <Stack
        screenOptions={{
            headerShown: false,
            contentStyle: {
                 backgroundColor: theme.colors.primary,
            }
        }}
     >
      <Stack.Screen name="index" />
     </Stack>
    )
}