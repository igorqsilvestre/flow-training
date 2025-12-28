import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";

export interface IpropsBotoesMeuTreino {
  label: string
}

export const BotoesMeuTreino = ({label}: IpropsBotoesMeuTreino) => {
    return (
       <View style={styles.container}>
        <TouchableOpacity style={styles.buttonExercise}>
          <Text style={styles.labelButtonExercise}>{label}</Text>
          <MaterialIcons size={20} name="arrow-forward"/>
        </TouchableOpacity>

      

        <TouchableOpacity style={styles.buttonDelete}>
          <MaterialIcons size={20} name="delete"/>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonExercise: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 4
  },
  labelButtonExercise: {
    fontFamily: theme.fonts.family.bold,
    fontSize: 12,
    color: theme.colors.primary
  },
  buttonDelete: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: 4,
  }
});