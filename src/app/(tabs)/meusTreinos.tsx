import { getTreinos } from '@/src/shared/services/treinoStorage';
import { theme } from '@/src/shared/themes/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MeusTreinos() {


  async function carregarTreinos(){
    const treinos = await getTreinos();
    console.log(treinos);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonExercise}>
          <Text style={styles.labelButtonExercise}>Treino peito e biceps</Text>
          <MaterialIcons size={20} name="arrow-forward"/>
        </TouchableOpacity>

        

        <TouchableOpacity style={styles.buttonDelete}>
          <MaterialIcons size={20} name="delete"/>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonExercise: {
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 6
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


