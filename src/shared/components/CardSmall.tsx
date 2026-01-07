import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { CustomModal } from "./CustomModal";

const ITEM_HEIGHT = 32;
const MAX_ITEMS_VISIBLE = 2;

type PropsCard = {
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
    tempoFormatado?: string
}

export interface IPropsCardSmall {
  tipo: 'preparacao' | 'exercicio' | 'ciclos'
}
export const CardSmall = ({tipo}: IPropsCardSmall) => {
  const [open, setOpen] = useState<boolean>(false);
  const [listaExpandida, setListaExpandida] = useState(false);

  const [configuracoes, setConfiguracoes] = useState<PropsCard>();

  useEffect(()=>{
    if(tipo === 'preparacao'){
      return (
        setConfiguracoes({
          backgroundColor: theme.colors.preparation,
          title:'Preparação',
          tempo: {
            minuto: 0,
            dezenaDosSegundos: 1,
            unidadeDosSegundos: 0
          },
          tempoFormatado: '0 : 10',
          tipoTempo:'cronometro'
        })
      )
    }

    if(tipo === 'exercicio'){
      return (
        setConfiguracoes({
          backgroundColor: theme.colors.exercise,
          title: 'Quantidade de exercícios',
          quantidade: 4,
          modoExercicio: true,
          tipoTempo:'repeticao',
        })
      )
    }

    if(tipo === 'ciclos'){
      return (
        setConfiguracoes({
           backgroundColor: theme.colors.cycles,
          title: 'Ciclos', 
          quantidade: 1, 
          tipoTempo:'repeticao'
        })  
      )
    }
     
  },[tipo])

  const tempoOuQuantidaderRecebidos = (
    cronometro?: {minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number}, 
    repeticao?: {quantidade: number})=> {

    if(configuracoes){
      if(repeticao && repeticao.quantidade){
        setConfiguracoes({
          ...configuracoes,
          quantidade: repeticao.quantidade
        })
        setOpen(false);
        return;
      }

      if(cronometro && (cronometro.minuto || cronometro.dezenaDosSegundos || cronometro.unidadeDosSegundos)){
        setConfiguracoes({
          ...configuracoes,
          tempoFormatado: `${cronometro.minuto} : ${cronometro.dezenaDosSegundos}${cronometro.unidadeDosSegundos}`
        })
        setOpen(false);
        return;
      }
    }
    setOpen(false);
  }


  return (
        <View style={ {backgroundColor: configuracoes?.backgroundColor, ...styles.card} }>
          <TouchableOpacity style={styles.cardIconRefresh}>
            <MaterialIcons size={28} name="restart-alt"  />
          </TouchableOpacity>
          <View>
            <View style={{gap:8, paddingBottom: configuracoes?.modoExercicio ? 0 : 20, alignItems: 'center' }}>
              <Text style={styles.cardTitle}>{ configuracoes?.title }</Text>
              <Text>{configuracoes?.tipoTempo === 'repeticao' ? configuracoes.quantidade : configuracoes?.tempoFormatado}</Text>

              {open && (
                <CustomModal title={configuracoes?.title} tipoTempo={configuracoes?.tipoTempo} visible={open} onClose={tempoOuQuantidaderRecebidos}/>
              )}              

              <TouchableOpacity onPress={() => setOpen(true)}>
                <MaterialIcons size={23} name="edit"  />
              </TouchableOpacity>

             {configuracoes?.modoExercicio  && (
              <View
                style={styles.containerList}
              >
                <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                  <MaterialIcons size={23} name="edit"  />
                </TouchableOpacity>

                <FlatList 
                data={Array.from(
                  { length: configuracoes?.quantidade || 3 },
                  (_, index) => ({ id: index + 1 })
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between', }}
               
                style={{
                  paddingHorizontal: 20,
                  rowGap: 4,
                   maxHeight: listaExpandida
                   ? ITEM_HEIGHT * (configuracoes?.quantidade || 3) //mostra tudo
                   : ITEM_HEIGHT * MAX_ITEMS_VISIBLE // mostra só 2
                   
                }}
                showsVerticalScrollIndicator={!listaExpandida && (configuracoes?.quantidade || 3) > MAX_ITEMS_VISIBLE}
                scrollEnabled={!listaExpandida && (configuracoes?.quantidade || 3) > MAX_ITEMS_VISIBLE}
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

                 <TouchableOpacity style={{alignSelf: 'center', marginTop: 4}} onPress={() => setListaExpandida(prev => !prev)}>
                  <MaterialIcons 
                    size={23} 
                    name={listaExpandida ? 'arrow-upward' : 'arrow-downward'}  
                    />
                </TouchableOpacity>
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
    paddingBottom: 4,
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