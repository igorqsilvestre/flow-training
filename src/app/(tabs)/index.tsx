import { CardSmall } from '@/src/shared/components/CardSmall';
import { theme } from '@/src/shared/themes/theme';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View >
       <View style={{paddingVertical: 30 }}>
        <Text style={styles.title}>
          Vamos começar
        </Text>
       </View>
      <View style={{ gap: 8}}>
        <CardSmall backgroundColor={theme.colors.preparation} title='Preparação' tempoOuQuantidade={10} />
        <CardSmall backgroundColor={theme.colors.exercise} title='Quantidade de exercícios' tempoOuQuantidade={5} tipo='exercise'/>
        <CardSmall backgroundColor={theme.colors.cycles} title='Ciclos' tempoOuQuantidade={1} />

        <View>
          <Text style={styles.title}>Ações</Text>
        </View>
      </View>

      <View style={{ paddingBottom: insets.bottom }}>
        <Text style={styles.title}>Footer</Text>
      </View>
    </View>
   
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.family.boldItalic,
    color: theme.colors.secundary
  }
});
