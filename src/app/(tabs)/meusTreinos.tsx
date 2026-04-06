import { ModalDelete } from '@/src/shared/components/ModalDelete';
import { deleteTreino, getTreinos } from '@/src/shared/services/treinoStorage';
import { theme } from '@/src/shared/themes/theme';
import { Treino } from '@/src/shared/types/treino';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MeusTreinos() {

  const [listaTreinos, setListaTreinos] = useState<Treino[]>([]);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      carregarTreinos();
    }, [])
  );

  async function carregarTreinos(){
    const treinos = await getTreinos();
    setListaTreinos(treinos);
  }

  async function deletarTreino(id: string){
    await deleteTreino(id);
    setOpenModalDelete(false);
    carregarTreinos();
  }

  return (
  <FlatList
    data={listaTreinos}
    keyExtractor={(item) => item.id}
    contentContainerStyle={{
     paddingTop: 50,
     gap: 20
    }}
    renderItem={({item}) => {
      return ( 
        <View style={styles.container}>
          {openModalDelete && (
            <ModalDelete
            visible={openModalDelete}
            onClose={() => setOpenModalDelete(false)}
            onDelete={() => deletarTreino(item.id)}
            />
          )}
          <TouchableOpacity style={styles.buttonExercise}>
            <Text style={styles.labelButtonExercise}>{item.nome}</Text>
            <MaterialIcons size={20} name="arrow-forward"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={() => setOpenModalDelete(true)}>
            <MaterialIcons size={20} name="delete"/>
          </TouchableOpacity>
      </View>
      )
    }}
    >
  </FlatList>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 30,
  },
  buttonExercise: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    width: '80%'
  
  },
  labelButtonExercise: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.sizes.body,
    color: theme.colors.primary
  },
  buttonDelete: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: 6,
  }
});


