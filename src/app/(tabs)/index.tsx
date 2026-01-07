import { CardSmall } from '@/src/shared/components/CardSmall';
import { theme } from '@/src/shared/themes/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Index() {
  const insets = useSafeAreaInsets();

  const data = [
    { id: '1', type: 'preparacao' },
    { id: '2', type: 'exercicio' },
    { id: '3', type: 'ciclos' },
  ]

  return (

    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingBottom: insets.bottom,
        gap: 8
      }}

      ListHeaderComponent={() => (
        <View style={{paddingVertical: 30 }}>
          <Text style={styles.title}>
            Vamos começar
          </Text>
        </View>
      )}

      renderItem={({item}) => {
        if(item.type === 'preparacao'){
          return (
            <CardSmall 
              backgroundColor={theme.colors.preparation} 
              title='Preparação' 
              tempo= {{
                minuto: 0,
                dezenaDosSegundos: 1,
                unidadeDosSegundos: 0
              }}
              tipoTempo='cronometro'
            />
          );
        }

        if(item.type === 'exercicio'){
          return (
            <CardSmall 
              backgroundColor={theme.colors.exercise} 
              title='Quantidade de exercícios'
              quantidade={4}
              modoExercicio
              tipoTempo='repeticao'
            />
          );
        }

        return (
          <CardSmall 
            backgroundColor={theme.colors.cycles} 
            title='Ciclos' 
            quantidade={1} 
            tipoTempo='repeticao'
          />
        );

      }}

      ListFooterComponent={() => (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => router.push('/training')} >
              <MaterialIcons size={28} name="play-circle" color='#FFF'/>
              <Text style={styles.subtitle}>Iniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems: 'center'}}>
              <MaterialIcons size={28} name="save" color='#FFF'/>
              <Text style={styles.subtitle}>Salvar</Text>
            </TouchableOpacity>
          </View>

            <View style={styles.contentFooter}>
              <Text style={styles.titleFooter}>Siglas</Text>
              <Text style={styles.textBody}>Rep: Repetição - Time: Tempo - Des: Descanso</Text>
            </View>
      </View>
      )}
    >
    
    </FlatList>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.family.boldItalic,
    color: theme.colors.secundary
  },
  subtitle: {
    fontFamily: theme.fonts.family.bold,
    fontSize: 12,
    color: theme.colors.white
  },
  contentFooter: {
    flexDirection: 'column', 
    alignItems: 'center' ,
    backgroundColor: theme.colors.footer
  },
  titleFooter: {
    fontSize: 12,
    fontFamily: theme.fonts.family.bold,
    color: theme.colors.primary
  },
  textBody: {
    fontFamily: theme.fonts.family.regular,
    fontSize: 12,
    color: theme.colors.primary
  }
});
