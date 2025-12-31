import { CardSmall } from '@/src/shared/components/CardSmall';
import { CustomModal } from '@/src/shared/components/CustomModal';
import { theme } from '@/src/shared/themes/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Index() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<boolean>();

  return (
    <View style={{flex: 1}}>
       <View style={{paddingVertical: 30 }}>
        <Text style={styles.title}>
          Vamos começar
        </Text>
       </View>

      <View style={{ flex: 1, gap: 8, marginBottom: 8}}>
        <CustomModal></CustomModal>
        <CardSmall backgroundColor={theme.colors.preparation} title='Preparação' tempoOuQuantidade={10} />
        <CardSmall backgroundColor={theme.colors.exercise} title='Quantidade de exercícios' tempoOuQuantidade={4} tipo='exercise'/>
        <CardSmall backgroundColor={theme.colors.cycles} title='Ciclos' tempoOuQuantidade={1} />

        <View style={{flexDirection: 'row', gap: 20, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => router.push('/training')} style={{alignItems: 'center'}}>
            <MaterialIcons size={28} name="play-circle" color='#FFFFFF'/>
            <Text style={styles.subtitle}>Iniciar</Text>
          </TouchableOpacity>
        


          <TouchableOpacity style={{alignItems: 'center'}}>
            <MaterialIcons size={28} name="save" color='#FFFFFF'/>
            <Text style={styles.subtitle}>Salvar</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={{  paddingBottom: insets.bottom, ...styles.contentFooter}}>
        <Text style={styles.titleFooter}>Siglas</Text>
        <Text style={styles.textBody}>Rep: Repetição - Time: Tempo - Des: Descanso</Text>
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
