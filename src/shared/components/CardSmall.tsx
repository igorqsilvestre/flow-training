import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";

interface IPropsCardSmall {
    backgroundColor: string,
    title: string,
    tempoOuQuantidade: number,
    tipo?: 'default' | 'exercise';
}

export const CardSmall = ({backgroundColor, title, tempoOuQuantidade, tipo = 'default'}: IPropsCardSmall) => {
    return (
        <View style={{ backgroundColor, ...styles.card}}>
          <TouchableOpacity style={styles.cardIconRefresh}>
            <MaterialIcons size={28} name="restart-alt"  />
          </TouchableOpacity>
          <View>
            <View style={{ paddingBottom: 20, gap: 10, alignItems: 'center' }}>
               <Text style={styles.cardTitle}>{ title }</Text>
              <Text style={styles.cardSubTitle}>{ tempoOuQuantidade }</Text>
              <TouchableOpacity>
                <MaterialIcons size={23} name="edit"  />
              </TouchableOpacity>

             {tipo === 'exercise' && (
              <View style={{ flexDirection: 'row'}}>
                {Array.from({ length: tempoOuQuantidade }).map((_, index) => (
                  <View key={index}>
                    <View style={{flexDirection: 'row' }}>
                      <Text>Exercício {index + 1}º</Text>
                       <TouchableOpacity>
                        <MaterialIcons size={23} name="edit"  />
                      </TouchableOpacity>
                    </View>
                   
                  </View>
                ))}
              </View>
             )}
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardTitle: {
    fontFamily:  theme.fonts.family.bold,
    fontSize: 12,
    color: theme.colors.primary
  },
  cardSubTitle: {
    fontFamily:  theme.fonts.family.regular,
    fontSize: 12,
    color: theme.colors.primary
  },
  cardIconRefresh: {
   alignSelf: 'flex-end'
  }
});