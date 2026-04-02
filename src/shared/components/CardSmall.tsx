import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { Exercicio } from "../types/Exercicio";
import { TempoCronometro } from "../types/tempos";
import { criarListaDeExercicios, editarListaDeExercicios } from "../utils/auxiliarDeTreino";
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

  const [listaExerciciosExpandida, setListaExerciciosExpandida] = useState(false);
  const [listaExercicios, setListaExercicios] = useState<Exercicio[]>([]);
 

  const [configuracoesCard, setConfiguracoesCard] = useState<{
    backgroundColor: string;
    title: string;
    tipoTempo: 'cronometro' | 'repeticao' | 'repeticaoComCronometro' ;
    configuracoesTempo: {
      tempoRepeticaoComCronometro?: {
        tempoExercicio?: TempoCronometro,
        tempoDescanso?: TempoCronometro
      },
      tempoCronometro?: TempoCronometro,
      tempoRepeticao?: number;
      tempoCronometroFormatado?: TempoCronometroFormatado;
    }
  }>();

  const [configuracoesExercicio, setConfiguracoesExercicio] = useState<{
    id:string;
    title: string;
    tempoExercicio?: TempoCronometro,
    tempoDescanso: TempoCronometro,
    tempoRepeticao?: number
  }>();

  useEffect(()=>{
   adicionandoValoresPadraoNoCard(tipo);
  },[])

  const adicionandoValoresPadraoNoCard = (tipo: string) => {
     if(tipo === 'preparacao'){
      setConfiguracoesCard({
        backgroundColor: theme.colors.preparation,
        title:'Preparação',
        tipoTempo: 'cronometro',
        configuracoesTempo:{
          tempoCronometro: {
          minuto: 0,
          dezenaDosSegundos: 1,
          unidadeDosSegundos: 0
        },
        tempoCronometroFormatado: `${0}:${10}`,
        }
      });
      return;
    }

    if(tipo === 'treino'){
      const tempoRepeticao = 4;
      const tempoExercicio = { minuto: 0,dezenaDosSegundos: 4,unidadeDosSegundos: 5 };
      const tempoDescanso = { minuto: 0,dezenaDosSegundos: 1,unidadeDosSegundos: 5 };

      setConfiguracoesCard({
        backgroundColor: theme.colors.exercise,
        title: 'Quantidade de exercícios',
        tipoTempo: 'repeticaoComCronometro',
        configuracoesTempo: {
          tempoRepeticao,
          tempoRepeticaoComCronometro: {
            tempoExercicio,
            tempoDescanso
          }
        }
      });

      setListaExercicios(criarListaDeExercicios(
        tempoRepeticao,
        tempoExercicio,
        tempoDescanso
      ));
      return;
    }

    if(tipo === 'ciclos'){
      setConfiguracoesCard({
        backgroundColor: theme.colors.cycles,
        title: 'Ciclos', 
        tipoTempo: 'repeticao',
        configuracoesTempo: {
          tempoRepeticao: 0, 
        }
      });
      return;
    }
  }

  const adicionarTempoCronometroCard = (
    tempo: TempoCronometro, 
    ) => {

    if(configuracoesCard){   
        setConfiguracoesCard({
          ...configuracoesCard,
          configuracoesTempo: {
            tempoCronometro: {minuto: tempo.minuto, dezenaDosSegundos: tempo.dezenaDosSegundos, unidadeDosSegundos: tempo.unidadeDosSegundos},
            tempoCronometroFormatado: `${tempo.minuto}:${tempo.dezenaDosSegundos}${tempo.unidadeDosSegundos}` as TempoCronometroFormatado
          }
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
         configuracoesTempo: {
           tempoRepeticao: quantidade
         }
        })
        setOpenTempCard(false);
        return;
      }
      setOpenTempCard(false);
    }

  const adicionarTempoRepeticaoComCronometroCard = (
    tempoCronometro: {
      tempoExercicio: TempoCronometro,
      tempoDescanso: TempoCronometro,
    },tempoRepeticao: { quantidade: number }
    ) => {

    if(configuracoesCard){
      if(tempoRepeticao && tempoCronometro){
        setConfiguracoesCard({
          ...configuracoesCard,
          configuracoesTempo: {
            tempoRepeticaoComCronometro: {
              tempoExercicio: {
                minuto: tempoCronometro.tempoExercicio.minuto, 
                dezenaDosSegundos: tempoCronometro.tempoExercicio.dezenaDosSegundos, 
                unidadeDosSegundos: tempoCronometro.tempoExercicio.unidadeDosSegundos
              },
              tempoDescanso: {
                minuto: tempoCronometro.tempoDescanso.minuto,
                dezenaDosSegundos: tempoCronometro.tempoDescanso.dezenaDosSegundos,
                unidadeDosSegundos: tempoCronometro.tempoDescanso.unidadeDosSegundos
              },
            },
            tempoRepeticao: tempoRepeticao.quantidade
          }
         
        });

        setListaExercicios(criarListaDeExercicios(
          tempoRepeticao.quantidade,
          {
            minuto: tempoCronometro.tempoExercicio.minuto,
            dezenaDosSegundos: tempoCronometro.tempoExercicio.dezenaDosSegundos,
            unidadeDosSegundos:  tempoCronometro.tempoExercicio.unidadeDosSegundos,
          },
          {
            minuto: tempoCronometro.tempoDescanso.minuto,
            dezenaDosSegundos: tempoCronometro.tempoDescanso.dezenaDosSegundos,
            unidadeDosSegundos:  tempoCronometro.tempoDescanso.unidadeDosSegundos,
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
    editarListaDeExercicios(listaExercicios, {
      sigla,
      id,
      tempoDescanso,
      tempoCronometro: tempoExercicio,
      tempoRepeticao: tempoRepeticao
    });
    setOpenTempExercicio(false);
  }


  return (
    <View style={ {backgroundColor: configuracoesCard?.backgroundColor, ...styles.card} }>
      <TouchableOpacity style={styles.cardIconRefresh} onPress={() => adicionandoValoresPadraoNoCard(tipo)}>
        <MaterialIcons size={30} name="restart-alt"  />
      </TouchableOpacity>
      <View>
        <View style={{gap:8, paddingBottom: tipo === 'treino' ? 0 : 20, alignItems: 'center' }}>
          <Text style={styles.cardTitle}>{ configuracoesCard?.title }</Text>
          <Text>
            {configuracoesCard?.configuracoesTempo.tempoRepeticao != null
              ? configuracoesCard.configuracoesTempo.tempoRepeticao
              : configuracoesCard?.configuracoesTempo.tempoCronometroFormatado}
          </Text>

          {openTempCard && (
            <CustomModalTempoCard 
              title={configuracoesCard?.title} 
              tipoTempo={configuracoesCard?.tipoTempo} 
              visible={openTempCard}
              configuracoesTempo={configuracoesCard?.configuracoesTempo ?? {}} 
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

          {tipo === 'treino'  && (
          <View
            style={styles.containerList}
          >

            <FlatList 
              data={listaExercicios}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ }}
              
              style={{
                paddingHorizontal: 5,
                rowGap: 5,
                  ...(listaExerciciosExpandida
                    ? {}
                    : {
                        maxHeight: ITEM_HEIGHT * MAX_ITEMS_VISIBLE // mostra só 2 linhas
                      })
              }}
              showsVerticalScrollIndicator={!listaExerciciosExpandida && (listaExercicios.length || 4) > MAX_ITEMS_VISIBLE}
              scrollEnabled={!listaExerciciosExpandida && (listaExercicios.length || 4) > MAX_ITEMS_VISIBLE}
              renderItem={({ item }) => (
                <View style={{width: '50%', paddingHorizontal: 8}}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 2, marginVertical: 4 }}>
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
                      <Text style={styles.cardSubTitle}>{item.tempoRepeticaoFormatada ? item.tempoRepeticaoFormatada : item.tempoCronometroFormatado}</Text>
                      <Text> - </Text>
                      <Text style={styles.cardSubTitle}>Des</Text>
                      <Text style={styles.cardSubTitle}>{item.tempoDescansoFormatado}</Text>
                      
                  </View>
                </View>
              )}
            />

            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => setListaExerciciosExpandida(prev => !prev)}>
              <MaterialIcons 
                size={25} 
                name={listaExerciciosExpandida ? 'arrow-upward' : 'arrow-downward'}  
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
    overflow: 'hidden',
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
  },

   contentExercicio: {
    gap: 2,
    paddingHorizontal: 2,
    paddingVertical: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 4,
  },
});