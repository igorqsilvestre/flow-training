import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { formatarTempo } from "../utils/formatarTempo";
import { CustomModalTemp } from "./CustomModalTemp";

const ITEM_HEIGHT = 32;
const MAX_ITEMS_VISIBLE = 2;

type TempoCronometroFormatado = `${number}:${number}${number}`;

type PropsCard = {
    backgroundColor: string;
    title: string;
    tipoTempo: 'cronometro' | 'repeticao' | 'cronometroComrepeticao';
    tempoRepeticao?: number;
    tempoCronometro?: TempoCronometroFormatado;
}
type Treino = {
  id: string;
  tipo : {
    sigla: 'Rep' | 'Time',
    valor: 'Repetição' | 'Time'
  };
  tempoCronometro?: TempoCronometroFormatado;
  tempoDescanso?: TempoCronometroFormatado;
  tempoRepeticao?: number;
}

type TempoCronometro = {
  minuto: number, 
  dezenaDosSegundos: number, 
  unidadeDosSegundos: number
}

export interface IPropsCardSmall {
  tipo: 'preparacao' | 'exercicio' | 'ciclos'
}
export const CardSmall = ({tipo}: IPropsCardSmall) => {
  const [open, setOpen] = useState<boolean>(false);
  const [listaTreinoExpandida, setListaTreinoExpandida] = useState(false);
  const [listaTreino, setListaTreino] = useState<Treino[]>([]);
  const [type, setType] = useState< 'preparacao' | 'exercicio' | 'ciclos'>();

  const [configuracoes, setConfiguracoes] = useState<PropsCard>();

  useEffect(()=>{
    if(tipo === 'preparacao'){
      setConfiguracoes({
        backgroundColor: theme.colors.preparation,
        title:'Preparação',
        tipoTempo: 'cronometro',
        tempoCronometro: `${0}:${10}`,
      });
      setType(tipo);
      return;
    }

    if(tipo === 'exercicio'){
      setConfiguracoes({
        backgroundColor: theme.colors.exercise,
        title: 'Quantidade de exercícios',
        tipoTempo: 'cronometroComrepeticao',
        tempoRepeticao: 4
      });
      setListaTreino(criarListaDeTreinoPadrao(4));
      setType(tipo);
      return;
    }

    if(tipo === 'ciclos'){
      setConfiguracoes({
        backgroundColor: theme.colors.cycles,
        title: 'Ciclos', 
        tipoTempo: 'repeticao',
        tempoRepeticao: 1, 
      });  
      setType(tipo);
      return;
    }
     
  },[tipo])

  const adicionarTempo = (
    tempoCronometroComRepeticao?: {
        tempoExercicio?:{
          exercicioMinuto: number,
          exercicioDezenaDosSegundos: number,
          exercicioUnidadeDosSegundos: number;
        },
        tempoDescanso?:{
          descansoMinuto: number,
          descansoDezenaDosSegundos: number,
          descansoUnidadeDosSegundos: number
        } 
      },
    tempoCronometro?: {minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number}, 
    tempoRepeticao?: {quantidade: number}
    ) => {

    if(configuracoes){

      if(tempoRepeticao?.quantidade && tempoCronometroComRepeticao?.tempoExercicio && tempoCronometroComRepeticao?.tempoDescanso){
        setConfiguracoes({
          ...configuracoes,
          tempoRepeticao: tempoRepeticao.quantidade
        });
        setListaTreino(criarListaDeTreinoPadrao(
          tempoRepeticao.quantidade, 
          {
            minuto: tempoCronometroComRepeticao.tempoExercicio.exercicioMinuto,
            dezenaDosSegundos: tempoCronometroComRepeticao.tempoExercicio.exercicioDezenaDosSegundos,
            unidadeDosSegundos:  tempoCronometroComRepeticao.tempoExercicio.exercicioUnidadeDosSegundos,
          },
          {
            minuto: tempoCronometroComRepeticao.tempoDescanso.descansoMinuto,
            dezenaDosSegundos: tempoCronometroComRepeticao.tempoDescanso.descansoDezenaDosSegundos,
            unidadeDosSegundos:  tempoCronometroComRepeticao.tempoDescanso.descansoUnidadeDosSegundos,
          }
        ));
        setOpen(false);
        return;
      }

      if(tempoRepeticao?.quantidade){
        setConfiguracoes({
          ...configuracoes,
          tempoRepeticao: tempoRepeticao.quantidade
        })
        setOpen(false);
        return;
      }

      if(tempoCronometro?.minuto || tempoCronometro?.dezenaDosSegundos || tempoCronometro?.unidadeDosSegundos){
        setConfiguracoes({
          ...configuracoes,
          tempoCronometro: `${tempoCronometro.minuto}:${tempoCronometro.dezenaDosSegundos}${tempoCronometro.unidadeDosSegundos}` as TempoCronometroFormatado
        })
        setOpen(false);
        return;
      }

    }
    setOpen(false);
  }

  const restart = () => {
    if(configuracoes){
      if(type === 'preparacao'){
        setConfiguracoes({
          ...configuracoes,
          tempoCronometro:`${0}:${10}`,
         
        });
        return;
      }

      if(type === 'exercicio'){
        setConfiguracoes({
          ...configuracoes,
          tempoRepeticao: 4
        });
        setListaTreino(criarListaDeTreinoPadrao(4));
        return;
      }

      if(type === 'ciclos'){
          setConfiguracoes({
            ...configuracoes,
            tempoRepeticao: 1
          });
          return;
      }
    }
  }


  return (
    <View style={ {backgroundColor: configuracoes?.backgroundColor, ...styles.card} }>
      <TouchableOpacity style={styles.cardIconRefresh} onPress={restart}>
        <MaterialIcons size={30} name="restart-alt"  />
      </TouchableOpacity>
      <View>
        <View style={{gap:8, paddingBottom: type === 'exercicio' ? 0 : 20, alignItems: 'center' }}>
          <Text style={styles.cardTitle}>{ configuracoes?.title }</Text>
          <Text>{configuracoes?.tempoRepeticao ? configuracoes.tempoRepeticao : configuracoes?.tempoCronometro}</Text>

          {open && (
            <CustomModalTemp 
              title={configuracoes?.title} 
              tipoTempo={configuracoes?.tipoTempo} 
              visible={open} 
              onAdicionar={adicionarTempo}
            />
          )}              

          <TouchableOpacity onPress={() => setOpen(true)}>
            <MaterialIcons size={25} name="edit"  />
          </TouchableOpacity>

          {type === 'exercicio'  && (
          <View
            style={styles.containerList}
          >

            <FlatList 
              data={listaTreino}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between', }}
              
              style={{
                paddingHorizontal: 4,
                rowGap: 4,
                  maxHeight: listaTreinoExpandida
                  ? ITEM_HEIGHT * (configuracoes?.tempoRepeticao || 4) //mostra tudo
                  : ITEM_HEIGHT * MAX_ITEMS_VISIBLE // mostra só 2
                  
              }}
              showsVerticalScrollIndicator={!listaTreinoExpandida && (listaTreino.length || 4) > MAX_ITEMS_VISIBLE}
              scrollEnabled={!listaTreinoExpandida && (listaTreino.length || 4) > MAX_ITEMS_VISIBLE}
              renderItem={({ item }) => (
                <View>
                  <Text style={{textAlign: 'center', ...styles.cardSubTitle}}>Exercício {item.id}º</Text>
                
                  <View style={styles.contentExercicio}>
                      <Text style={styles.cardSubTitle}>{item.tipo.sigla}</Text>
                      <Text style={styles.cardSubTitle}>{item.tempoRepeticao ? item.tempoRepeticao : item.tempoCronometro}</Text>
                      <TouchableOpacity>
                        <MaterialIcons size={23} name="edit"  />
                      </TouchableOpacity>
                      <Text style={styles.cardSubTitle}>Des</Text>
                      <Text style={styles.cardSubTitle}>{item.tempoDescanso}</Text>
                      <TouchableOpacity>
                        <MaterialIcons size={23} name="edit"  />
                      </TouchableOpacity>
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

export function criarListaDeTreinoPadrao(
  quantidade:number, 
  tempoExercicio?:TempoCronometro,
  tempoDescanso?:TempoCronometro
): Treino[]{

  //Criando uma lista padrão de treinos
  const lista: Treino[] = [];
  for (let index = 0; index < quantidade; index++) {
    lista.push( 
      {
        id: (index + 1).toString(), 
        tipo: {sigla: 'Time', valor: 'Time'}, 
        tempoCronometro: formatarTempo(
          tempoExercicio?.minuto,
          tempoExercicio?.dezenaDosSegundos,
          tempoExercicio?.unidadeDosSegundos,
          { minuto: 0, dezena: 4, unidade: 5 } // padrão 00:45
        ),
        tempoDescanso: formatarTempo(
          tempoDescanso?.minuto,
          tempoDescanso?.dezenaDosSegundos,
          tempoDescanso?.unidadeDosSegundos,
          { minuto: 0, dezena: 1, unidade: 5 } // padrão 00:15
        ),
      }
    )
  }

  return lista;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
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