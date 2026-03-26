import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { criarListaDeTreino, editarListaDeTreino, TempoCronometro, Treino } from "../utils/auxiliarDeTreino";
import { CustomModalTempoCard } from "./CustomModalTempoCard";
import { CustomModalTempoExercicio } from "./CustomModalTempoExercicio";

const ITEM_HEIGHT = 35;
const MAX_ITEMS_VISIBLE = 2;

type TempoCronometroFormatado = `${number}:${number}${number}`;

export interface IPropsCardSmall {
  tipo: 'preparacao' | 'treino' | 'ciclos'
}
export const CardSmall = ({tipo}: IPropsCardSmall) => {
  const [openTempCard, setOpenTempCard] = useState<boolean>(false);
  const [openTempExercicio, setOpenTempExercicio] = useState<boolean>(false);

  const [listaTreinoExpandida, setListaTreinoExpandida] = useState(false);
  const [listaTreino, setListaTreino] = useState<Treino[]>([]);
  const [tipoCard, setTipoCard] = useState< 'preparacao' | 'treino' | 'ciclos'>();

  const [configuracoesCard, setConfiguracoesCard] = useState<{
    backgroundColor: string;
    title: string;
    tipoTempo: 'cronometro' | 'repeticao' | 'repeticaoComCronometro' ;
    tempoRepeticao?: number;
    tempoCronometro?: TempoCronometroFormatado;
  }>();

  const [configuracoesExercicio, setConfiguracoesExercicio] = useState<{
    id:string;
    title: string;
    tempoExercicio?: TempoCronometro,
    tempoDescanso: TempoCronometro,
    tempoRepeticao?: number
  }>();


  useEffect(()=>{
    if(tipo === 'preparacao'){
      setConfiguracoesCard({
        backgroundColor: theme.colors.preparation,
        title:'Preparação',
        tipoTempo: 'cronometro',
        tempoCronometro: `${0}:${10}`,
      });
      setTipoCard(tipo);
      return;
    }

    if(tipo === 'treino'){
      setConfiguracoesCard({
        backgroundColor: theme.colors.exercise,
        title: 'Quantidade de exercícios',
        tipoTempo: 'repeticaoComCronometro',
        tempoRepeticao: 4
      });
      setListaTreino(criarListaDeTreino(
        4,
        {
          minuto: 0,
          dezenaDosSegundos: 4,
          unidadeDosSegundos: 5
        },{
          minuto: 0,
          dezenaDosSegundos: 1,
          unidadeDosSegundos: 5
        }
      ));
      setTipoCard(tipo);
      return;
    }

    if(tipo === 'ciclos'){
      setConfiguracoesCard({
        backgroundColor: theme.colors.cycles,
        title: 'Ciclos', 
        tipoTempo: 'repeticao',
        tempoRepeticao: 0, 
      });  
      setTipoCard(tipo);
      return;
    }
     
  },[tipo])

  const adicionarTempoCronometroCard = (
    minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number, 
    ) => {

    if(configuracoesCard){   
        setConfiguracoesCard({
          ...configuracoesCard,
          tempoCronometro: `${minuto}:${dezenaDosSegundos}${unidadeDosSegundos}` as TempoCronometroFormatado
        })
        setOpenTempCard(false);
        return;
      }
      setOpenTempCard(false);
    }



  const adicionarTempoRepeticaoCard = (
    quantidade: number
    ) => {
    if(configuracoesCard){
        setConfiguracoesCard({
          ...configuracoesCard,
          tempoRepeticao: quantidade
        })
        setOpenTempCard(false);
        return;
      }
      setOpenTempCard(false);
    }

  const adicionarTempoRepeticaoComCronometroCard = (
    tempoCronometro: {
       tempoExercicio: {
            exercicioMinuto: number,
            exercicioDezenaDosSegundos: number ,
            exercicioUnidadeDosSegundos: number
        },
        tempoDescanso: {
            descansoMinuto: number,
            descansoDezenaDosSegundos: number,
            descansoUnidadeDosSegundos: number
        },
    },tempoRepeticao: { quantidade: number }
    ) => {

    if(configuracoesCard){
      if(tempoRepeticao && tempoCronometro){
        setConfiguracoesCard({
          ...configuracoesCard,
          tempoRepeticao: tempoRepeticao.quantidade
        });

        setListaTreino(criarListaDeTreino(
          tempoRepeticao.quantidade,
          {
            minuto: tempoCronometro.tempoExercicio.exercicioMinuto,
            dezenaDosSegundos: tempoCronometro.tempoExercicio.exercicioDezenaDosSegundos,
            unidadeDosSegundos:  tempoCronometro.tempoExercicio.exercicioUnidadeDosSegundos,
          },
          {
            minuto: tempoCronometro.tempoDescanso.descansoMinuto,
            dezenaDosSegundos: tempoCronometro.tempoDescanso.descansoDezenaDosSegundos,
            unidadeDosSegundos:  tempoCronometro.tempoDescanso.descansoUnidadeDosSegundos,
          }
        ))
          setOpenTempCard(false);
          return;
        }
      }
       setOpenTempCard(false);
    }
  

  const adicionarTempoExercicio = (
    sigla: 'Time' | 'Rep',
    id: string,
    tempoDescanso: TempoCronometro,
    tempoExercicio?: TempoCronometro,
    tempoRepeticao?: number
  ) => {
    editarListaDeTreino(listaTreino, {
      sigla,
      id,
      tempoDescanso,
      tempoCronometro: tempoExercicio,
      tempoRepeticao: tempoRepeticao
    });
    setOpenTempExercicio(false);
  }

  const restart = () => {
    if(configuracoesCard){
      if(tipoCard === 'preparacao'){
        setConfiguracoesCard({
          ...configuracoesCard,
          tempoCronometro:`${0}:${10}`,
         
        });
        return;
      }

      if(tipoCard === 'treino'){
        setConfiguracoesCard({
          ...configuracoesCard,
          tempoRepeticao: 4
        });
        setListaTreino(criarListaDeTreino(
           4,
        {
          minuto: 0,
          dezenaDosSegundos: 4,
          unidadeDosSegundos: 5
        },{
          minuto: 0,
          dezenaDosSegundos: 1,
          unidadeDosSegundos: 5
        }
        ));
        return;
      }

      if(tipoCard === 'ciclos'){
          setConfiguracoesCard({
            ...configuracoesCard,
            tempoRepeticao: 1
          });
          return;
      }
    }
  }


  return (
    <View style={ {backgroundColor: configuracoesCard?.backgroundColor, ...styles.card} }>
      <TouchableOpacity style={styles.cardIconRefresh} onPress={restart}>
        <MaterialIcons size={30} name="restart-alt"  />
      </TouchableOpacity>
      <View>
        <View style={{gap:8, paddingBottom: tipoCard === 'treino' ? 0 : 20, alignItems: 'center' }}>
          <Text style={styles.cardTitle}>{ configuracoesCard?.title }</Text>
          <Text>
            {configuracoesCard?.tempoRepeticao != null
              ? configuracoesCard.tempoRepeticao
              : configuracoesCard?.tempoCronometro}
          </Text>

          {openTempCard && (
            <CustomModalTempoCard 
              title={configuracoesCard?.title} 
              tipoTempo={configuracoesCard?.tipoTempo} 
              visible={openTempCard} 
              onAdicionarCronometro={adicionarTempoCronometroCard}
              onAdicionarRepeticao={adicionarTempoRepeticaoCard}
              onAdicionarRepeticaoComCronometro={adicionarTempoRepeticaoComCronometroCard}
            />
          )} 

          {openTempExercicio && (
            <CustomModalTempoExercicio
              visible={openTempExercicio} 
              configuracoesExercicio={configuracoesExercicio}
              onAdicionarTempoExercicio={adicionarTempoExercicio} 
            />
          )}             

          <TouchableOpacity onPress={() => setOpenTempCard(true)}>
            <MaterialIcons size={25} name="edit"  />
          </TouchableOpacity>

          {tipoCard === 'treino'  && (
          <View
            style={styles.containerList}
          >

            <FlatList 
              data={listaTreino}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between', }}
              
              style={{
                paddingHorizontal: 5,
                rowGap: 5,
                  maxHeight: listaTreinoExpandida
                  ? ITEM_HEIGHT * (configuracoesCard?.tempoRepeticao || 4) //mostra tudo
                  : ITEM_HEIGHT * MAX_ITEMS_VISIBLE // mostra só 2
                  
              }}
              showsVerticalScrollIndicator={!listaTreinoExpandida && (listaTreino.length || 4) > MAX_ITEMS_VISIBLE}
              scrollEnabled={!listaTreinoExpandida && (listaTreino.length || 4) > MAX_ITEMS_VISIBLE}
              renderItem={({ item }) => (
                <View>
                  <View style={{flexDirection: 'row', justifyContent: 'center', gap: 2, marginVertical: 4}}>
                    <Text style={styles.cardSubTitle}>Exercício {item.id}º</Text>
                    <TouchableOpacity>
                      <MaterialIcons size={23} name="edit"  onPress={() => {
                        setConfiguracoesExercicio({
                          id: item.id,
                          title:`Exercício ${item.id}º`,
                          tempoExercicio: item?.tempoCronometro,
                          tempoRepeticao: item?.tempoRepeticao,
                          tempoDescanso: item.tempoDescanso
                        })
                        setOpenTempExercicio(true);
                      }}/>
                    </TouchableOpacity>
                  </View>
                
                  <View style={styles.contentExercicio}>
                      <Text style={styles.cardSubTitle}>{item.sigla}</Text>
                      <Text style={styles.cardSubTitle}>{item.tempoRepeticao ? item.tempoRepeticao : item.tempoCronometroFormatado}</Text>
                      <Text> - </Text>
                      <Text style={styles.cardSubTitle}>Des</Text>
                      <Text style={styles.cardSubTitle}>{item.tempoDescansoFormatado}</Text>
                      
                  </View>
                </View>
              )}
            />

            <TouchableOpacity style={{alignSelf: 'center', marginTop: 4}} onPress={() => setListaTreinoExpandida(prev => !prev)}>
              <MaterialIcons 
                size={25} 
                name={listaTreinoExpandida ? 'arrow-upward' : 'arrow-downward'}  
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
    borderRadius: 15,
  },

  cardTitle: {
    fontFamily:  theme.fonts.family.bold,
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.primary
  },
  cardSubTitle: {
    fontFamily:  theme.fonts.family.regular,
    fontSize: theme.fonts.sizes.body,
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