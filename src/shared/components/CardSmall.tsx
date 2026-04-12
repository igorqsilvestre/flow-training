import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { Exercicio } from "../types/exercicio";
import { TempoCronometro } from "../types/tempos";
import { criarListaDeExerciciosDeTempoCronometro, editarListaDeExercicios, formatarCronometro } from "../utils/auxiliarDeTreino";
import { ContadorCronometro } from "./ContadorCronometro";
import { ContadorExercicio } from "./ContadorExercicio";
import { ContadorRepeticao } from "./ContadorRepeticao";
import { ContadorRepeticaoComCronometro } from "./ContadorRepeticaoComCronometro";

const ITEM_HEIGHT = 35;
const MAX_ITEMS_VISIBLE = 2;

type TipoCard = 'preparacao' | 'treino' | 'ciclos';
type ConfiguracoesTempo = {
  tempoCronometro?: TempoCronometro | undefined;
    tempoRepeticaoComCronometro?: {
        tempoExercicio?: TempoCronometro;
        tempoDescanso?: TempoCronometro;
    };
    tempoRepeticao?: number;
}

interface IPropsCardSmall {
  tipo: TipoCard;
  tempoPreparacao?: TempoCronometro;
  tempoCiclos?: number;
  exercicios?: Exercicio[];
  adicionarTreino: (
    tempoPreparacao?: TempoCronometro,
    tempoCiclos?: number,
    listaDeExercicios?: Exercicio[]
  ) => void;
}
export const CardSmall = (
  {
    tempoPreparacao,
    tempoCiclos,
    exercicios, 
    tipo,
    adicionarTreino 
  }: IPropsCardSmall) => {

  const [openModalCard, setOpenModalCard] = useState<boolean>(false);  
  const [openModalTempoExercicio, setOpenModalTempoExercicio] = useState<boolean>(false);

  const [listaDeExercicios, setListaDeExercicios] = useState<Exercicio[]>([]);
  const [listaExerciciosExpandida, setListaExerciciosExpandida] = useState(false);

  const [configuracoesCard, setConfiguracoesCard] = useState<{
    tipo: TipoCard ;
    backgroundColor: string;
    title: string;
    configuracoesTempo: ConfiguracoesTempo
  }>();

  const [configuracoesExercicio, setConfiguracoesExercicio] = useState<{
    id:string;
    title: string;
    tempoExercicio?: TempoCronometro,
    tempoDescanso: TempoCronometro,
    tempoRepeticao?: number
  }>();

  useEffect(()=>{
   adicionandoValoresNoCard(tipo);
  },[])

  const adicionandoValoresNoCard = (
    tipo: string,
    resetar: boolean = false
  ) => {
   
    if(tipo === 'preparacao'){
      const tempo = {
        minuto: resetar == true ? 0 : tempoPreparacao?.minuto || 0,
        dezenaDosSegundos: resetar == true ? 1 : tempoPreparacao?.dezenaDosSegundos || 1,
        unidadeDosSegundos: resetar == true ? 0 : tempoPreparacao?.unidadeDosSegundos || 0
      }
      adicionarValorNoCardPreparacao(tempo);
      return;
    }

    if(tipo === 'treino'){
      const tempoRepeticao = resetar == true ? 4 :  exercicios?.length || 4;
      const tempoExercicio = { minuto: 0,dezenaDosSegundos: 4,unidadeDosSegundos: 5 };
      const tempoDescanso = { minuto: 0,dezenaDosSegundos: 1,unidadeDosSegundos: 5 };

      adicionarValorNoCardTreino(tempoRepeticao, tempoExercicio, tempoDescanso);
      return;
    }

    if(tipo === 'ciclos'){
      const tempoRepeticao = resetar == true ? 0 : tempoCiclos || 0;
      adicionarValorNoCardCiclos(tempoRepeticao);
      return;
    }
  }

  const adicionarValorNoCardPreparacao = (tempo: TempoCronometro) => {
    setConfiguracoesCard({
        tipo: 'preparacao',
        backgroundColor: theme.colors.preparation,
        title:'Preparação',
        configuracoesTempo:{
          tempoCronometro: tempo,
        }
    });
    adicionarTreino(tempo,undefined,undefined);
    setOpenModalCard(false);
  }

  const adicionarValorNoCardTreino = (
    tempoRepeticao: number,
    tempoExercicio: TempoCronometro, 
    tempoDescanso: TempoCronometro, 
  ) => {

    setConfiguracoesCard({
        tipo: 'treino',
        backgroundColor: theme.colors.exercise,
        title: 'Quantidade de exercícios',
        configuracoesTempo: {
          tempoRepeticaoComCronometro: {
            tempoExercicio,
            tempoDescanso
          },
          tempoRepeticao
        }
    });
    let lista = listaDeExercicios;

    if(exercicios === lista || !exercicios){
      lista = criarListaDeExerciciosDeTempoCronometro(
      tempoRepeticao,
      tempoExercicio,
      tempoDescanso
      );
    }else{
      lista = exercicios;
    }

    setListaDeExercicios(lista);
    adicionarTreino(undefined,undefined,lista);
    setOpenModalCard(false);
  }

  const adicionarValorNoCardCiclos = (tempoRepeticao: number) => {
    setConfiguracoesCard({
        tipo: 'ciclos',
        backgroundColor: theme.colors.cycles,
        title: 'Ciclos', 
        configuracoesTempo: {
          tempoRepeticao
        }
      });
      adicionarTreino(undefined,tempoRepeticao,undefined);
      setOpenModalCard(false);
  }

  const adicionarTempoExercicio = (
    sigla: 'Time' | 'Rep',
    id: string,
    tempoDescanso: TempoCronometro,
    tempoExercicio?: TempoCronometro,
    tempoRepeticao?: number
  ) => {
    const exerciciosAtualizados = editarListaDeExercicios(listaDeExercicios, {
      sigla,
      id,
      tempoDescanso,
      tempoCronometro: tempoExercicio,
      tempoRepeticao: tempoRepeticao
    });

    setListaDeExercicios(exerciciosAtualizados);
    adicionarTreino(undefined, undefined, exerciciosAtualizados);
    setOpenModalTempoExercicio(false);
  }

  return (
    <View style={ {backgroundColor: configuracoesCard?.backgroundColor, ...styles.card} }>
      <TouchableOpacity style={styles.cardIconRefresh} onPress={() => adicionandoValoresNoCard(tipo,true)}>
        <MaterialIcons size={30} name="restart-alt"  />
      </TouchableOpacity>
      <View>
        <View style={{gap:8, paddingBottom: tipo === 'treino' ? 0 : 20, alignItems: 'center' }}>
          <Text style={styles.cardTitle}>{ configuracoesCard?.title }</Text>
          <Text>
           {
            configuracoesCard?.configuracoesTempo.tempoRepeticao !== undefined
              ? configuracoesCard.configuracoesTempo.tempoRepeticao
              : configuracoesCard?.configuracoesTempo.tempoCronometro !== undefined
                ? formatarCronometro(configuracoesCard.configuracoesTempo.tempoCronometro)
                : ''
            }
          </Text>

          {configuracoesCard?.tipo === 'preparacao' &&  openModalCard && (
            <ContadorCronometro 
              title={configuracoesCard?.title} 
              visible={openModalCard}
              onClose={() => setOpenModalCard(false)}
              tempoCronometro={configuracoesCard?.configuracoesTempo.tempoCronometro} 
              onAdicionar={adicionarValorNoCardPreparacao}
            />
          )} 

          {configuracoesCard?.tipo === 'treino' &&  openModalCard && (
            <ContadorRepeticaoComCronometro 
              title={configuracoesCard?.title} 
              visible={openModalCard}
              onClose={() => setOpenModalCard(false)}
              onAdicionar={adicionarValorNoCardTreino}
            />
          )} 

          {configuracoesCard?.tipo === 'ciclos' &&  openModalCard && (
            <ContadorRepeticao 
              title={configuracoesCard?.title} 
              visible={openModalCard}
              onClose={() => setOpenModalCard(false)}
              tempoRepeticao={configuracoesCard.configuracoesTempo.tempoRepeticao}
              onAdicionar={adicionarValorNoCardCiclos}
            />
          )} 

          {openModalTempoExercicio && (
            <ContadorExercicio
              visible={openModalTempoExercicio}
              onClose={() => setOpenModalTempoExercicio(false)} 
              configuracoesExercicio={configuracoesExercicio}
              onAdicionarTempoExercicio={adicionarTempoExercicio} 
            />
          )}         

          <TouchableOpacity onPress={() => setOpenModalCard(true)}>
            <MaterialIcons size={25} name="edit"  />
          </TouchableOpacity>

          {tipo === 'treino'  && (
          <View
            style={styles.containerList}
          >

            <FlatList 
              data={listaDeExercicios}
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
              showsVerticalScrollIndicator={!listaExerciciosExpandida && (listaDeExercicios.length || 4) > MAX_ITEMS_VISIBLE}
              scrollEnabled={!listaExerciciosExpandida && (listaDeExercicios.length || 4) > MAX_ITEMS_VISIBLE}
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
                        setOpenModalTempoExercicio(true);
                      }}/>
                    </TouchableOpacity>
                  </View>
                
                  <View style={styles.contentExercicio}>
                      <Text style={styles.cardSubTitle}>{item.sigla}</Text>
                      <Text style={styles.cardSubTitle}>
                        {
                          item.tempoRepeticao 
                          ? item.tempoRepeticao + 'x' 
                          : item.tempoCronometro 
                            ? formatarCronometro(item.tempoCronometro)
                            : ''
                        }
                      </Text>
                      <Text> - </Text>
                      <Text style={styles.cardSubTitle}>Des</Text>
                      <Text style={styles.cardSubTitle}>{item.tempoDescanso ? formatarCronometro(item.tempoDescanso) : ''}</Text>
                      
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