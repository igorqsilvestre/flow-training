import { Calendario } from '@/src/shared/components/Calendario';
import { DiasDaSemanaRadio } from '@/src/shared/components/DiasDaSemanaRadio';
import { StyleSheet, View } from 'react-native';



export default function Progresso() {

 return (
  <View style={styles.container}>
    <DiasDaSemanaRadio datasTreino = {['2025-12-27', '2025-12-28']}/>
    <Calendario datasTreino = {['2025-12-27', '2025-12-28']}/>
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 100,
    paddingTop: 50
  }
})

