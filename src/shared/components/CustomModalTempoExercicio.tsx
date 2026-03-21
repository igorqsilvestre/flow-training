import { Modal, StyleSheet, Text, View } from "react-native";
import { theme } from "../themes/theme";

export interface ICustomModalTempoProps {
  title: string | undefined;
  visible: boolean;
   onAdicionarTempoExercicio: (
    tempoRepeticao?: {
      quantidade: number,
      tempoDescanso: {descansoMinuto: number, descansoDezenaDosSegundos: number, descansoUnidadeDosSegundos: number},
    },
    tempoCronometro?: {
      tempoExercicio: {exercicioMinuto: number, exercicioDezenaDosSegundos: number, exercicioUnidadeDosSegundos: number},
      tempoDescanso: {descansoMinuto: number, descansoDezenaDosSegundos: number, descansoUnidadeDosSegundos: number},
    }
  ) => void;
}
export function CustomModalTempoExercicio({
  title,  
  visible, 
  onAdicionarTempoExercicio
}: ICustomModalTempoProps) {

    function handleAdicionarTempoExercicio(
      tempoRepeticao?: {
        quantidade: number,
        tempoDescanso: {descansoMinuto: number, descansoDezenaDosSegundos: number, descansoUnidadeDosSegundos: number},
      },
      tempoCronometro?: {
        tempoExercicio: {exercicioMinuto: number, exercicioDezenaDosSegundos: number, exercicioUnidadeDosSegundos: number},
        tempoDescanso: {descansoMinuto: number, descansoDezenaDosSegundos: number, descansoUnidadeDosSegundos: number},
      }
    ){
      if(tempoRepeticao){
        onAdicionarTempoExercicio(
        {
          quantidade: tempoRepeticao.quantidade,
          tempoDescanso: {
            descansoMinuto: tempoRepeticao.tempoDescanso.descansoMinuto,
            descansoDezenaDosSegundos: tempoRepeticao.tempoDescanso.descansoDezenaDosSegundos,
            descansoUnidadeDosSegundos: tempoRepeticao.tempoDescanso.descansoUnidadeDosSegundos
          }
        },
        undefined
        )
        return;
      }
      if(tempoCronometro){
        onAdicionarTempoExercicio(
          undefined,
          {
            tempoExercicio: {
              exercicioMinuto: tempoCronometro?.tempoExercicio.exercicioMinuto,
              exercicioDezenaDosSegundos: tempoCronometro?.tempoExercicio.exercicioDezenaDosSegundos,
              exercicioUnidadeDosSegundos: tempoCronometro?.tempoExercicio.exercicioUnidadeDosSegundos
            },
            tempoDescanso: {
              descansoMinuto: tempoCronometro?.tempoDescanso.descansoMinuto,
              descansoDezenaDosSegundos: tempoCronometro?.tempoDescanso.descansoDezenaDosSegundos,
              descansoUnidadeDosSegundos: tempoCronometro?.tempoDescanso.descansoUnidadeDosSegundos
            }
          }
        )
        return;
      }
    }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
              
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    borderRadius: 10,
    width: '95%',
    backgroundColor: "#fff",
    alignItems: 'center',
    overflow: 'hidden',
    gap: 30
  },
  header: {
    backgroundColor: theme.colors.header,
    width: '100%',
    padding: 10
  },
  headerTitle: {
    textAlign: 'center',
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.sizes.medium
  },
});