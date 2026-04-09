import { theme } from "@/src/shared/themes/theme";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Layout() {
    const insets = useSafeAreaInsets();
    return (
     <Stack
        screenOptions={{
            contentStyle: {
                backgroundColor: theme.colors.primary,
                paddingTop: insets.top,
            },
             headerStyle: {
                backgroundColor: theme.colors.header, 
            },
            headerTitleStyle: {
                fontFamily: theme.fonts.family.bold,
                fontSize: theme.fonts.sizes.medium
            },
      }}
     >
      <Stack.Screen name="[id]" options={{title: 'Treinar e editar'}}/>
     </Stack>
    )
}