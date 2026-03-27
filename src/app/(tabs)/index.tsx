import { CardSmall } from '@/src/shared/components/CardSmall';
import { theme } from '@/src/shared/themes/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";


export interface Data {
  id: string,
  type: 'preparacao' | 'treino' | 'ciclos'
}

export default function Index() {
  const insets = useSafeAreaInsets();

  const data:Data[]  = [
    { id: '1', type: 'preparacao' },
    { id: '2', type: 'treino' },
    { id: '3', type: 'ciclos' },
  ]

  return (

    <FlatList
      data={data}
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
            <CardSmall tipo='preparacao'/>
          );
        }

        if(item.type === 'treino'){
          return (
            <CardSmall tipo='treino'/>
          );
        }

        return (
           <CardSmall tipo='ciclos'/>
        );

      }}

      ListFooterComponent={() => (
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
      )}
    >
    
    </FlatList>
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
