import { Modal, StyleSheet, Text, View } from "react-native";
import { theme } from "../themes/theme";
import { ContadorCronometro } from "./ContadorCronometro";
import { ContadorRepeticao } from "./ContadorRepeticao";
import { ContadorRepeticaoComCronometro } from "./ContadorRepeticaoComCronometro";


export interface ICustomModalTempoCardProps {
  title: string | undefined;
  chooseType?: boolean;
  tipoTempo: 'cronometro' | 'repeticao' | 'repeticaoComCronometro' | undefined;
  visible: boolean;
  onAdicionarCronometro: (
    minuto: number, 
    dezenaDosSegundos: number, 
    unidadeDosSegundos: number,
  ) => void;
  onAdicionarRepeticao: (quantidade: number) => void;
  onAdicionarRepeticaoComCronometro: (
     tempoCronometro: {
        tempoExercicio: {
            exercicioMinuto: number,
            exercicioDezenaDosSegundos: number ,
            exercicioUnidadeDosSegundos: number
        },
        tempoDescanso: {
            descansoMinuto: number,
            descansoDezenaDosSegundos: number,
            descansoUnidadeDosSegundos: number
        },
       }, tempoRepeticao: { quantidade: number }
  ) => void;
}
export function CustomModalTempoCard({
  title, 
  tipoTempo, 
  visible,
  onAdicionarCronometro,
  onAdicionarRepeticao,
  onAdicionarRepeticaoComCronometro 
}: ICustomModalTempoCardProps) {

   const handleAdicionarCronometro = (
    minuto: number,
    dezenaDosSegundos: number,
    unidadeDosSegundos: number
   ) => {
    onAdicionarCronometro(
      minuto,
      dezenaDosSegundos,
      unidadeDosSegundos
    );
   };
   

   const handleAdicionarRepeticao = (quantidade: number) => {
    onAdicionarRepeticao(quantidade);
   };

   const handleAdicionarRepeticaoComCronometro = (
      tempoCronometro: {
        tempoExercicio: {
            exercicioMinuto: number,
            exercicioDezenaDosSegundos: number ,
            exercicioUnidadeDosSegundos: number
        },
        tempoDescanso: {
            descansoMinuto: number,
            descansoDezenaDosSegundos: number,
            descansoUnidadeDosSegundos: number
        },
      }, tempoRepeticao: { quantidade: number }
   ) => {
    onAdicionarRepeticaoComCronometro(
     {
        tempoExercicio: {
          exercicioMinuto: tempoCronometro.tempoExercicio.exercicioMinuto,
          exercicioDezenaDosSegundos: tempoCronometro.tempoExercicio.exercicioDezenaDosSegundos,
          exercicioUnidadeDosSegundos: tempoCronometro.tempoExercicio.exercicioUnidadeDosSegundos
        },
        tempoDescanso: {
          descansoMinuto: tempoCronometro.tempoDescanso.descansoMinuto,
          descansoDezenaDosSegundos: tempoCronometro.tempoDescanso.descansoDezenaDosSegundos,
          descansoUnidadeDosSegundos: tempoCronometro.tempoDescanso.descansoUnidadeDosSegundos
        },
     },{ quantidade: tempoRepeticao.quantidade }
    );
   };


  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
   
              {tipoTempo === 'cronometro' && (
                <ContadorCronometro 
                  onAdicionar={handleAdicionarCronometro}
                />
              )}

              {tipoTempo === 'repeticao' && (
                <ContadorRepeticao 
                   onAdicionar={handleAdicionarRepeticao}
                />
              )}

               {tipoTempo === 'repeticaoComCronometro' && (
                <ContadorRepeticaoComCronometro
                   onAdicionar={handleAdicionarRepeticaoComCronometro}
                />
              )}
             
           
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