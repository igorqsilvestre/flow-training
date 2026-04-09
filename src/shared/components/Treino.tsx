import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTreino } from "../services/treinoStorage";
import { theme } from "../themes/theme";
import { Exercicio } from "../types/exercicio";
import { TempoCronometro } from "../types/tempos";
import { CardSmall } from "./CardSmall";
import { ModalGravarTreino } from "./ModalGravarTreino";

type DataCard = {
  id: string,
  type: 'preparacao' | 'treino' | 'ciclos'
}

type Props = {
  id?:string;
};

export default function Treino({ id }: Props) {
 const insets = useSafeAreaInsets();
  
    const [openTempGravarTreino, setOpenTempGravarTreino] = useState<boolean>(false);
  
    const [tempoPreparacao, setTempoPrepacao] = useState<TempoCronometro>();
    const [tempoCiclos, setTempoCiclos] = useState<number>();
    const [listaDeExercicios, setListaExercicios] = useState<Exercicio[]>();
    const [nome, setNome] = useState('');
  
    const dataCard: DataCard []  = [
      { id: '1', type: 'preparacao' },
      { id: '2', type: 'treino' },
      { id: '3', type: 'ciclos' },
    ]
  
      useEffect(() => {
        if(id){
          carregarTreino(id);
        }
      },[id]);

      async function carregarTreino(id: string){
        const treino = await getTreino(id);
        if(treino){
          setTempoPrepacao(treino.tempoPreparacao);
          setTempoCiclos(treino.tempoCiclos);
          setListaExercicios(listaDeExercicios);
          setNome(treino.nome);
        } 
    }

    function onAdicionarTreino(
      tempoPreparacao?: TempoCronometro,
      tempoCiclos?: number,
      listaDeExercicios?: Exercicio[]
    ) {
      if(tempoPreparacao){
        setTempoPrepacao(tempoPreparacao);
      }

      if(tempoCiclos !== undefined && tempoCiclos !== null){
        setTempoCiclos(tempoCiclos);
      }

      if(listaDeExercicios){
        setListaExercicios(listaDeExercicios);
      }
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
        if(item.type === 'preparacao'){
          return (
            <CardSmall 
              tempoPreparacao={tempoPreparacao}
              adicionarTreino={onAdicionarTreino} 
              tipo='preparacao'
            />
          );
        }

        if(item.type === 'treino'){
          return (
            <CardSmall 
              exercicios={listaDeExercicios}
              adicionarTreino={onAdicionarTreino} 
              tipo='treino'
            />
          );
        }

        return (
           <CardSmall 
            tempoCiclos={tempoCiclos}
            adicionarTreino={onAdicionarTreino} 
            tipo='ciclos'
           />
        );

      }}

      ListFooterComponent={() => (
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => router.push('/training')} >
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