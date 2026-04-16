import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTreino } from "../services/treinoStorage";
import { useTreinoExecucaoStore } from "../store/useTreinoExecucaoStore";
import { theme } from "../themes/theme";
import { Exercicio } from "../types/exercicio";
import { TempoCronometro } from "../types/tempos";
import { criarListaDeExerciciosDeTempoCronometro } from "../utils/auxiliarDeTreino";
import { CardSmall } from "./CardSmall";
import { ModalGravarTreino } from "./ModalGravarTreino";


export type TipoCard = 'preparacao' | 'treino' | 'ciclos';

type DataCard = {
  id: string,
  tipo: TipoCard
  titulo: string;
  backgroundColor: string;
}

type Props = {
  id?:string;
};

export default function Treino({ id }: Props) {
    const insets = useSafeAreaInsets();
    
    const iniciarTreino = useTreinoExecucaoStore(s => s.iniciarTreino);
  
    const [openTempGravarTreino, setOpenTempGravarTreino] = useState<boolean>(false);
    const [tempoPreparacao, setTempoPrepacao] = useState<TempoCronometro>({minuto: 0, dezenaDosSegundos: 1, unidadeDosSegundos: 0});
    const [tempoCiclos, setTempoCiclos] = useState<number>(0);
    const [listaDeExercicios, setListaExercicios] = useState<Exercicio[]>([]);
    const [nome, setNome] = useState('');
  
    const dataCard: DataCard []  = [
      { id: '1', tipo: 'preparacao',  titulo:'Preparação', backgroundColor: theme.colors.preparation },
      { id: '2', tipo: 'treino',  titulo:'Quantidade de exercícios', backgroundColor: theme.colors.exercise },
      { id: '3', tipo: 'ciclos',  titulo:'Ciclos', backgroundColor:  theme.colors.cycles },
    ]
  
      useEffect(() => {
        if(!id){
          setarValoresIniciais();
          return
        };
        carregarTreino(id);
      },[id]);

      function setarValoresIniciais(){
        setTempoPrepacao({minuto: 0, dezenaDosSegundos: 1, unidadeDosSegundos: 0})
        const lista = criarListaDeExerciciosDeTempoCronometro(
            4,
            { minuto: 0,dezenaDosSegundos: 4,unidadeDosSegundos: 5 },
            { minuto: 0,dezenaDosSegundos: 1,unidadeDosSegundos: 5 }
        );
        setListaExercicios(lista);
        setTempoCiclos(0);
      }

      async function carregarTreino(id: string){
        const treino = await getTreino(id);
        if(treino){
          setTempoPrepacao(treino.tempoPreparacao);
          setTempoCiclos(treino.tempoCiclos);
          setListaExercicios(treino.listaDeExercicios);
          setNome(treino.nome);
        } 
    }

    function onAdicionarTempoPreparacao(
      tempoPreparacao: TempoCronometro,
    ){
      setTempoPrepacao(tempoPreparacao);
    }

    function onAdicionarListaDeExercicios(
      listaDeExercicios: Exercicio[]
    ){
      setListaExercicios(listaDeExercicios);
    }

     function onAdicionarTempoCiclos(
      tempoCiclos: number,
    ){
      setTempoCiclos(tempoCiclos);
    }

    function handleIniciarTreino() {
      const treino = {
        id: id ?? Date.now().toString() + Math.random().toString(36).slice(2, 8),
        nome,
        tempoPreparacao,
        tempoCiclos,
        listaDeExercicios
      };

      iniciarTreino(treino);
      router.push('/training');
    }

    return (
    <>
     {openTempGravarTreino && (<ModalGravarTreino
      treino={{
        tempoPreparacao,
        tempoCiclos,
        listaDeExercicios,
        nome,
        id
      }}
      visible={openTempGravarTreino}
      onClose={() => setOpenTempGravarTreino(false)}
     />)}
     <FlatList
      data={dataCard}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        gap: 10
      }}

      ListHeaderComponent={() => (
        <View style={{paddingVertical: 20 }}>
          <Text style={styles.title}>
            Vamos começar
          </Text>
        </View>
      )}


      renderItem={({item}) => {
          return (
            <CardSmall 
              tempoPreparacao={tempoPreparacao}
              exercicios={listaDeExercicios}
              tempoCiclos={tempoCiclos}
              tipo={item.tipo}
              titulo={item.titulo}
              backgroundColor={item.backgroundColor}
              adicionarTempoPreparacao={onAdicionarTempoPreparacao}
              adicionarListaDeExercicios={onAdicionarListaDeExercicios}
              adicionarTempoCiclos={onAdicionarTempoCiclos}
             
            />
          )
      }}

      ListFooterComponent={() => (
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={handleIniciarTreino} >
            <MaterialIcons size={28} name="play-circle" color='#FFF'/>
            <Text style={styles.subtitle}>Iniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => setOpenTempGravarTreino(true)}>
            <MaterialIcons size={28} name="save" color='#FFF'/>
            <Text style={styles.subtitle}>{id ? 'Editar' : 'Salvar'}</Text>
          </TouchableOpacity>
        </View>
      )}
    >
    
    </FlatList>
    </>
   
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: theme.fonts.sizes.large,
    fontFamily: theme.fonts.family.boldItalic,
    color: theme.colors.secundary
  },
  subtitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.white
  },
  contentFooter: {
    flexDirection: 'column', 
    alignItems: 'center' ,
    backgroundColor: theme.colors.footer
  },
  titleFooter: {
    fontSize: theme.fonts.sizes.body,
    fontFamily: theme.fonts.family.bold,
    color: theme.colors.primary
  },
  textBody: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.primary
  }
});