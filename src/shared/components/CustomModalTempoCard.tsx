import { Modal, StyleSheet, Text, View } from "react-native";
import { theme } from "../themes/theme";
import { TempoCronometro } from "../types/tempos";
import { ContadorCronometro } from "./ContadorCronometro";
import { ContadorRepeticao } from "./ContadorRepeticao";
import { ContadorRepeticaoComCronometro } from "./ContadorRepeticaoComCronometro";

interface ICustomModalTempoCardProps {
  title: string | undefined;
  chooseType?: boolean;
  tipoTempo: 'cronometro' | 'repeticao' | 'repeticaoComCronometro' | undefined;
  visible: boolean;
   configuracoesTempo:{
    tempoCronometro?: TempoCronometro | undefined;
    tempoRepeticaoComCronometro?: {
        tempoExercicio?: TempoCronometro;
        tempoDescanso?: TempoCronometro;
    };
    tempoRepeticao?: number;
  }
  onAdicionarCronometro: (tempo: TempoCronometro) => void;
  onAdicionarRepeticao: (quantidade: number) => void;
  onAdicionarRepeticaoComCronometro: (
     tempoCronometro: {
        tempoExercicio: TempoCronometro
        tempoDescanso: TempoCronometro,
       }, 
     tempoRepeticao: { quantidade: number }
  ) => void;
}
export function CustomModalTempoCard({
  title, 
  tipoTempo, 
  visible,
  configuracoesTempo,
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
      {
        minuto,
        dezenaDosSegundos,
        unidadeDosSegundos
      }
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
          minuto: tempoCronometro.tempoExercicio.exercicioMinuto,
          dezenaDosSegundos: tempoCronometro.tempoExercicio.exercicioDezenaDosSegundos,
          unidadeDosSegundos: tempoCronometro.tempoExercicio.exercicioUnidadeDosSegundos
        },
        tempoDescanso: {
          minuto: tempoCronometro.tempoDescanso.descansoMinuto,
          dezenaDosSegundos: tempoCronometro.tempoDescanso.descansoDezenaDosSegundos,
          unidadeDosSegundos: tempoCronometro.tempoDescanso.descansoUnidadeDosSegundos
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
                  tempoCronometro={configuracoesTempo?.tempoCronometro ?? {minuto: 0, dezenaDosSegundos: 0, unidadeDosSegundos: 0}}
                  onAdicionar={handleAdicionarCronometro}
                />
              )}

              {tipoTempo === 'repeticao' && (
                <ContadorRepeticao 
                  tempoRepeticao={configuracoesTempo.tempoRepeticao ?? 0} 
                  onAdicionar={handleAdicionarRepeticao}
                />
              )}

               {tipoTempo === 'repeticaoComCronometro' && (
                <ContadorRepeticaoComCronometro
                   tempoRepeticaoComCronometro={
                    {
                      tempoRepeticao: configuracoesTempo.tempoRepeticao ?? 0,
                      tempoRepeticaoExercicio: configuracoesTempo.tempoRepeticaoComCronometro?.tempoExercicio ?? {minuto: 0, dezenaDosSegundos: 0, unidadeDosSegundos: 0},
                      tempoRepeticaoDescanso: configuracoesTempo.tempoRepeticaoComCronometro?.tempoDescanso ?? {minuto: 0, dezenaDosSegundos: 0, unidadeDosSegundos: 0}
                    }
                   }
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