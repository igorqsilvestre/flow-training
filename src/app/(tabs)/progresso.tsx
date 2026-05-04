import { Calendario } from '@/src/shared/components/Calendario';
import { DiasDaSemanaRadio } from '@/src/shared/components/DiasDaSemanaRadio';
import { buscarDatas } from '@/src/shared/services/treinoDataStorage';
import { DatasTreino } from '@/src/shared/types/datasTreino';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';



export default function Progresso() {

  const [datas, setDatas] = useState<DatasTreino>({});

   useEffect(() => {
    buscarDatas().then(setDatas);
  },[])

 return (
  <View style={styles.container}>
    <DiasDaSemanaRadio datasTreino={datas}/>
    <Calendario datasTreino={datas}/>
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

