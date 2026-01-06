import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { CustomModal } from "./CustomModal";

const ITEM_HEIGHT = 30;
const MAX_ITEMS_VISIBLE = 2;

interface IPropsCardSmall {
    backgroundColor: string,
    title: string,
    tipoTempo: 'cronometro' | 'repeticao';
    modoExercicio?: boolean,
    quantidade?: number,
    tempo?: {
      minuto: number,
      dezenaDosSegundos: number,
      unidadeDosSegundos: number
    },
}
export const CardSmall = (dados: IPropsCardSmall) => {
  const [open, setOpen] = useState<boolean>(false);
  const [tempoFormatado, setTempoFormatado] = useState('');
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    if(dados.tempo){
      setTempoFormatado(`${dados.tempo.minuto} : ${dados.tempo.dezenaDosSegundos}${dados.tempo.unidadeDosSegundos}`);
    }
  },[dados.tempo]);

   useEffect(() => {
    if(dados.quantidade){
     setQuantidade(dados.quantidade);
    }
  },[dados.quantidade]);

  const tempoOuQuantidaderRecebidos = (minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number, quantidade: number) => {
    if(quantidade){
      setQuantidade(quantidade);
    }
    setTempoFormatado(`${minuto} : ${dezenaDosSegundos}${unidadeDosSegundos}`);
    setOpen(false);
  }


  return (
        <View style={ {backgroundColor: dados.backgroundColor, ...styles.card} }>
          <TouchableOpacity style={styles.cardIconRefresh}>
            <MaterialIcons size={28} name="restart-alt"  />
          </TouchableOpacity>
          <View>
            <View style={{gap:8, paddingBottom: dados.modoExercicio ? 0 : 20, alignItems: 'center' }}>
              <Text style={styles.cardTitle}>{ dados.title }</Text>
              <Text>{dados.tipoTempo === 'repeticao' ? quantidade : tempoFormatado}</Text>

              {open && (
                <CustomModal title={dados.title} tipoTempo={dados.tipoTempo} visible={open} onClose={tempoOuQuantidaderRecebidos}/>
              )}              

              <TouchableOpacity onPress={() => setOpen(true)}>
                <MaterialIcons size={23} name="edit"  />
              </TouchableOpacity>

             {dados.modoExercicio  && (
              <View
                style={styles.containerList}
              >
                <TouchableOpacity>
                  <MaterialIcons style={{position: 'absolute', right: 2,alignSelf: 'flex-end'}} size={23} name="edit"  />
                </TouchableOpacity>
                <FlatList 
                data={Array.from(
                  { length: quantidade },
                  (_, index) => ({ id: index + 1 })
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ columnGap: 20, justifyContent: 'center' }}
                contentContainerStyle={{
                  rowGap: 10,
                  paddingVertical: 8,
                }}
                style={{
                   maxHeight: ITEM_HEIGHT * MAX_ITEMS_VISIBLE
                }}
                showsVerticalScrollIndicator={quantidade > MAX_ITEMS_VISIBLE}
                scrollEnabled={quantidade > MAX_ITEMS_VISIBLE}
                renderItem={({ item }) => (
                   <View>
                      <Text style={{textAlign: 'center', ...styles.cardSubTitle}}>Exercício {item.id}º</Text>
                    
                      <View style={styles.contentExercicio}>
                          <Text style={styles.cardSubTitle}>Time</Text>
                          <Text style={styles.cardSubTitle}>45</Text>
                          <TouchableOpacity>
                            <MaterialIcons size={23} name="edit"  />
                          </TouchableOpacity>
                          <Text style={styles.cardSubTitle}>Des</Text>
                          <Text style={styles.cardSubTitle}>15</Text>
                          <TouchableOpacity>
                            <MaterialIcons size={23} name="edit"  />
                          </TouchableOpacity>
                      </View>
                    </View>
                )}
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
  containerList: {
    width: '100%',
    borderTopColor: '#537896',
    borderTopWidth: 1,
    paddingTop: 4,
    paddingBottom: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1
  },

   contentExercicio: {
    gap: 2,
    paddingHorizontal: 2,
    paddingVertical: 1,
    flexDirection: 'row',
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
  },
});