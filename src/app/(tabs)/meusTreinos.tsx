import { BotoesMeuTreino } from '@/src/shared/components/BotoesMeuTreino';
import { StyleSheet, View } from 'react-native';

export default function MeusTreinos() {
  return (
    <View style={styles.container}>
      <BotoesMeuTreino label='Treino peito e ombro'/>
      <BotoesMeuTreino label='Treino costas e braços'/>
      <BotoesMeuTreino label='Treino abdomên'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 50,
    gap: 10
  },
});


