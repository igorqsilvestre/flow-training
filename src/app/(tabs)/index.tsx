import { CardSmall } from '@/src/shared/components/CardSmall';
import { ModalGravarTreino } from '@/src/shared/components/ModalGravarTreino';
import { getTreino } from '@/src/shared/services/treinoStorage';
import { theme } from '@/src/shared/themes/theme';
import { Exercicio } from '@/src/shared/types/exercicio';
import { TempoCronometro } from '@/src/shared/types/tempos';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";


interface DataCard {
  id: string,
  type: 'preparacao' | 'treino' | 'ciclos'
}


export default function Index(id: string | undefined) {
  const insets = useSafeAreaInsets();
  const [openTempGravarTreino, setOpenTempGravarTreino] = useState<boolean>(false);

  const [tempoPreparacao, setTempoPrepacao] = useState<TempoCronometro>();
  const [tempoCiclos, setTempoCiclos] = useState<number>();
  const [listaDeExercicios, setListaExercicios] = useState<Exercicio[]>();

  const dataCard:DataCard[]  = [
    { id: '1', type: 'preparacao' },
    { id: '2', type: 'treino' },
    { id: '3', type: 'ciclos' },
  ]

    useFocusEffect(
      useCallback(() => {
       if(id){
        carregarTreino(id);
       }
      }, [])
    );

    async function carregarTreino(id: string){
        const treino = await getTreino(id);
        if(treino){
          setTempoPrepacao(treino.tempoPreparacao);
          setTempoCiclos(treino.tempoCiclos);
          setListaExercicios(listaDeExercicios);
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
            <Text style={styles.subtitle}>Salvar</Text>
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
