import { theme } from '@/src/shared/themes/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const IconPlaceholder = () => (
  <View style={{  height: 4 }} />
);

export default function TabLayout () {
    const insets = useSafeAreaInsets();

    return (
        <TopTabs 
        screenOptions={{
            sceneStyle: {
                backgroundColor: theme.colors.primary,
            },
            tabBarScrollEnabled: false,
            tabBarInactiveTintColor: theme.colors.primary,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarIndicatorStyle: {
                backgroundColor: theme.colors.primary,
                marginBottom: 4,
            },
            tabBarStyle: {
                paddingTop: insets.top,
                backgroundColor: theme.colors.header,
            },
            tabBarLabelStyle: {
                fontFamily: theme.fonts.family.bold,
            }
        }}
        >
        <TopTabs.Screen
            name="index"
            options={{ 
                tabBarShowLabel: false,
                tabBarIcon: () => <MaterialIcons size={23} name="house"  />
            }}
        />
        <TopTabs.Screen
            name="meusTreinos"
            options={{ 
                tabBarLabel: 'Meus Treinos',
                tabBarIcon: IconPlaceholder,
            }}
        />
         <TopTabs.Screen
            name="progresso"
            options={{ 
                tabBarLabel: 'Progresso',
                tabBarIcon: IconPlaceholder,
            }}
        />

     </TopTabs>
    )
}