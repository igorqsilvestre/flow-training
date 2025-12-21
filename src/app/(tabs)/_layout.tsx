import { theme } from '@/src/shared/themes/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function TabLayout () {
    const insets = useSafeAreaInsets();

    return (
        <TopTabs 
        screenOptions={{
            sceneStyle: {
                backgroundColor: theme.colors.primary
            },
            tabBarScrollEnabled: false,
            tabBarItemStyle: {
               flex: 1,
            },
            tabBarIndicatorStyle: {
                backgroundColor: theme.colors.primary,
                marginBottom: 4,
            },
            tabBarStyle: {
                paddingTop: insets.top,
                backgroundColor: theme.colors.header
            },
            tabBarLabelStyle: {
                fontWeight: 'bold'
            }
        }}
        >
        <TopTabs.Screen
            name="index"
            options={{ 
                tabBarShowLabel: false,
                tabBarIcon: () => <MaterialIcons size={28} name="house"  />
            }}
        />
        <TopTabs.Screen
            name="meusTreinos"
            options={{ 
                tabBarLabel: 'Meus Treinos'
            }}
        />
         <TopTabs.Screen
            name="progresso"
            options={{ 
                tabBarLabel: 'Progresso'
            }}
        />

     </TopTabs>
    )
}