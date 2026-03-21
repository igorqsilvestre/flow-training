import { Modal, StyleSheet, Text, View } from "react-native";
import { theme } from "../themes/theme";
import { ContadorCronometro } from "./ContadorCronometro";
import { ContadorRepeticao } from "./ContadorRepeticao";


export interface ICustomModalTempoCardProps {
  title: string | undefined;
  chooseType?: boolean;
  tipoTempo: 'cronometro' | 'repeticao' | 'repeticaoComCronometro' | undefined;
  visible: boolean;
  onAdicionarCronometro: (
    tempoCronometro: {minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number},
  ) => void;
  onAdicionarRepeticao: (
    tempoRepeticao: {quantidade: number}
  ) => void;
}
export function CustomModalTempoCard({
  title, 
  tipoTempo, 
  visible, 
  onAdicionarCronometro,
  onAdicionarRepeticao,
}: ICustomModalTempoCardProps) {

    function handleAdicionarCronometro(
      tempoCronometro: {minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number},
    ){
        onAdicionarCronometro(
          {
            minuto: tempoCronometro.minuto,
            dezenaDosSegundos: tempoCronometro.dezenaDosSegundos,
            unidadeDosSegundos: tempoCronometro.unidadeDosSegundos
          },
        )
        return; 
    }

    function handleAdicionarRepeticao(
      tempoRepeticao: {quantidade: number},
    ){
        onAdicionarRepeticao(
          {
           quantidade: tempoRepeticao.quantidade
          },
        )
        return; 
    }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>

              {/*
                {chooseType && (
                <ComboBox 
                value={tipo}
                onChange={setTipo}
                valores={[
                  {label:'Time', valor:'time'}, {label:'Repetição', valor:'rep'}
                ]}/>
              )}
              */}
              
   
              {tipoTempo === 'cronometro' && (
                <ContadorCronometro onAdicionar={handleAdicionarCronometro}/>
              )}

              {tipoTempo === 'repeticao' && (
                <ContadorRepeticao onAdicionar={handleAdicionarRepeticao}/>
              )}

              {tipoTempo === 'repeticaoComCronometro' && (
                <View>
                  <ContadorRepeticao onAdicionar={handleAdicionarRepeticao}/>
                  <ContadorCronometro onAdicionar={handleAdicionarCronometro}/>
                </View>
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