import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";

const ITEM_HEIGHT = 30;
const MAX_ITEMS_VISIBLE = 2;

interface IPropsCardSmall {
    backgroundColor: string,
    title: string,
    tempoOuQuantidade: number,
    tipo?: 'default' | 'exercise';
}
export const CardSmall = ({backgroundColor, title, tempoOuQuantidade, tipo = 'default'}: IPropsCardSmall) => {

  const listHeight =
    tipo === 'exercise'
      ? Math.min(tempoOuQuantidade, MAX_ITEMS_VISIBLE) * ITEM_HEIGHT
      : undefined;

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
              <View
                style={{
                  height: listHeight,
                  width: '100%'
                }}
              >
                <FlatList 
                data={Array.from(
                  { length: tempoOuQuantidade },
                  (_, index) => ({ id: index + 1 })
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{  
                  rowGap: 6,
                  paddingHorizontal: 10
                }}
                renderItem={({ item }) => (
                   <View style={{ width: '48%' }}>
                      <Text style={{textAlign: 'center', ...styles.cardSubTitle}}>Exercício {item.id}º</Text>
                    
                      <View style={styles.contentExercicio}>
                        <View style={{flexDirection: 'row', gap: 4}}>
                          <Text style={styles.cardSubTitle}>Time</Text>
                          <Text style={styles.cardSubTitle}>45</Text>
                          <TouchableOpacity>
                            <MaterialIcons size={23} name="edit"  />
                          </TouchableOpacity>
                        </View>
                          
                        <View style={{flexDirection: 'row', gap: 4}}>
                          <Text style={styles.cardSubTitle}>Des</Text>
                          <Text style={styles.cardSubTitle}>15</Text>
                          <TouchableOpacity>
                            <MaterialIcons size={23} name="edit"  />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                )}
                showsVerticalScrollIndicator={tempoOuQuantidade > MAX_ITEMS_VISIBLE}
                scrollEnabled={tempoOuQuantidade > MAX_ITEMS_VISIBLE}
                >
                </FlatList>
              </View>
              
             )}
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
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
  },
  contentExercicio: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
 
  }
});