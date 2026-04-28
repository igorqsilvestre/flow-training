import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { Exercicio } from "../types/exercicio";
import { TempoCronometro, TemposExercicio } from "../types/tempos";
import { criarListaDeExerciciosDeTempoCronometro, editarListaDeExercicios, formatarCronometro } from "../utils/auxiliarDeTreino";
import { ContadorCronometro } from "./ContadorCronometro";
import { ContadorRepeticao } from "./ContadorRepeticao";
import { ContadorRepeticaoComCronometro } from "./ContadorRepeticaoComCronometro";
import { TipoCard } from "./Treino";

const ITEM_HEIGHT = 35;
const MAX_ITEMS_VISIBLE = 2;

interface IPropsCardSmall {
  tempoPreparacao: TempoCronometro;
  tempoCiclos: number;
  exercicios: Exercicio[];
  tipo: TipoCard;
  titulo: string;
  backgroundColor: string;
  adicionarTempoPreparacao: ( tempoPreparacao: TempoCronometro) => void;
  adicionarListaDeExercicios: ( listaDeExercicios: Exercicio[]) => void;
  adicionarTempoCiclos: ( tempoCiclos: number) => void;
}
export const CardSmall = (props: IPropsCardSmall) => {

  const [openModalCard, setOpenModalCard] = useState<boolean>(false);  
  const [listaExerciciosExpandida, setListaExerciciosExpandida] = useState(false);
  const [modoExercicio, setModoExercicio] = useState(false);

  const [configuracoesExercicio, setConfiguracoesExercicio] = useState<{
    id:string;
    title: string;
    tempos: {
      tempoExercicio?: TempoCronometro,
      tempoDescanso: TempoCronometro,
      tempoRepeticao?: number
    }
  }>();


  const adicionarValorNoCardPreparacao = (tempo: TempoCronometro) => {
    props.adicionarTempoPreparacao(tempo);
    setOpenModalCard(false);
  }

  const adicionarValorNoCardTreino = (
    sigla: 'Time' | 'Rep',
    tempoQuantidade: number,
    tempos: TemposExercicio 
  ) => {;

    const lista = criarListaDeExerciciosDeTempoCronometro(
      tempoQuantidade <= 0 ? 4 : tempoQuantidade,
      sigla,
      tempos.tempoDescanso,
      tempos.tempoExercicio,
      tempos.tempoRepeticao,
      
    )
    props.adicionarListaDeExercicios(lista);
    setOpenModalCard(false);
  }

  const adicionarValorNoCardCiclos = (tempo: number) => {
    props.adicionarTempoCiclos(tempo);
    setOpenModalCard(false);
  }

  const editarTempoNoExercicio = (
    sigla: 'Time' | 'Rep',
    id: string,
    tempos: TemposExercicio
  ) => {
    if(props.exercicios){
      const exerciciosAtualizados = editarListaDeExercicios(props.exercicios, {
        sigla,
        id,
        tempos: {
          tempoDescanso: tempos.tempoDescanso,
          tempoExercicio: tempos.tempoExercicio,
          tempoRepeticao: tempos.tempoRepeticao
        }
      });
      props.adicionarListaDeExercicios(exerciciosAtualizados) ;
    }
    setModoExercicio(false);
    setOpenModalCard(false);
  }

  function mostrarOTempoNoCard(tipo: TipoCard): string{
    if(tipo === 'preparacao'){
      return formatarCronometro(props.tempoPreparacao);
    }else if(tipo === 'treino'){
      return props.exercicios.length.toString();
    }else{
      return props.tempoCiclos.toString();
    }
  }

  function restaurarValoresNoCard(tipo: TipoCard){
    if(tipo === 'preparacao'){
      props.adicionarTempoPreparacao({minuto: 0, dezenaDosSegundos: 1, unidadeDosSegundos: 0});
    }else if(tipo === 'treino'){
     const lista = criarListaDeExerciciosDeTempoCronometro(
      4,
      "Time",
      { minuto: 0,dezenaDosSegundos: 4,unidadeDosSegundos: 5 },
      { minuto: 0,dezenaDosSegundos: 1,unidadeDosSegundos: 5 }
     );
     props.adicionarListaDeExercicios(lista);
    }else{
     props.adicionarTempoCiclos(0);
    }
  }

  return (
    <View style={ {backgroundColor: props?.backgroundColor, ...styles.card} }>
      <TouchableOpacity style={styles.cardIconRefresh} onPress={() => restaurarValoresNoCard(props?.tipo)}>
        <MaterialIcons size={30} name="restart-alt"  />
      </TouchableOpacity>
      <View>
        <View style={{gap:8, paddingBottom: props.tipo === 'treino' ? 0 : 20, alignItems: 'center' }}>
          <Text style={styles.cardTitle}>{ props.titulo }</Text>
          <Text>{ mostrarOTempoNoCard(props?.tipo) }</Text>

          {props?.tipo === 'preparacao' && openModalCard && (
            <ContadorCronometro 
              title={props?.titulo} 
              visible={openModalCard}
              onClose={() => setOpenModalCard(false)}
              tempoCronometro={props?.tempoPreparacao} 
              onAdicionar={adicionarValorNoCardPreparacao}
            />
          )} 

          {props?.tipo === 'treino' &&  openModalCard && (
            <ContadorRepeticaoComCronometro 
              title={props?.titulo} 
              visible={openModalCard}
              onClose={() => setOpenModalCard(false)}
              onAdicionar={adicionarValorNoCardTreino}
            />
          )} 

          {props?.tipo === 'ciclos' &&  openModalCard && (
            <ContadorRepeticao 
              title={props?.titulo} 
              visible={openModalCard}
              onClose={() => setOpenModalCard(false)}
              tempoRepeticao={props?.tempoCiclos}
              onAdicionar={adicionarValorNoCardCiclos}
            />
          )} 

           {modoExercicio && configuracoesExercicio && openModalCard && (
            <ContadorRepeticaoComCronometro 
              title={configuracoesExercicio?.title}
              exercicioRecebido={configuracoesExercicio} 
              visible={modoExercicio}
              onClose={() => setModoExercicio(false)}
              onEditar={editarTempoNoExercicio}
            />
          )} 
        

          <TouchableOpacity onPress={() => setOpenModalCard(true)}>
            <MaterialIcons size={25} name="edit"  />
          </TouchableOpacity>

          {props?.tipo === 'treino'  && (
          <View
            style={styles.containerList}
          >

            <FlatList 
              data={props?.exercicios}
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
              showsVerticalScrollIndicator={!listaExerciciosExpandida && (props?.exercicios.length || 4) > MAX_ITEMS_VISIBLE}
              scrollEnabled={!listaExerciciosExpandida && (props?.exercicios.length || 4) > MAX_ITEMS_VISIBLE}
              renderItem={({ item }) => (
                <View style={{width: '50%', paddingHorizontal: 8}}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 2, marginVertical: 4 }}>
                    <Text style={styles.cardSubTitle}>Exercício {item.id}º</Text>
                    <TouchableOpacity>
                      <MaterialIcons size={23} name="edit"  onPress={() => {
                        setConfiguracoesExercicio({
                          id: item.id,
                          title:`Exercício ${item.id}º`,
                          tempos: {
                            tempoExercicio: item?.tempos.tempoExercicio,
                            tempoRepeticao: item?.tempos.tempoRepeticao,
                            tempoDescanso: item.tempos.tempoDescanso
                          }
                        })
                        setModoExercicio(true);
                      }}/>
                    </TouchableOpacity>
                  </View>
                
                  <View style={styles.contentExercicio}>
                      <Text style={styles.cardSubTitle}>{item.sigla}</Text>
                      <Text style={styles.cardSubTitle}>
                        {
                          item.tempos.tempoRepeticao 
                          ? item.tempos.tempoRepeticao  + 'x' 
                          : item.tempos.tempoExercicio 
                            ? formatarCronometro(item.tempos.tempoExercicio)
                            : ''
                        }
                      </Text>
                      <Text> - </Text>
                      <Text style={styles.cardSubTitle}>Des</Text>
                      <Text style={styles.cardSubTitle}>{item.tempos.tempoDescanso ? formatarCronometro(item.tempos.tempoDescanso) : ''}</Text>
                      
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