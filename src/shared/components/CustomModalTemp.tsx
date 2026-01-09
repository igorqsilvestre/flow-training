import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { theme } from "../themes/theme";
import ComboBox from "./Combo_temp";
import { ContadorCronometro } from "./ContadorCronometro";
import { ContadorCronometroComRepeticao } from "./ContadorCronometroComRepeticao";
import { ContadorRepeticao } from "./ContadorRepeticao";


export interface ICustomModalProps {
  title: string | undefined;
  chooseType?: boolean;
  tipoTempo: 'cronometro' | 'repeticao' | 'cronometroComrepeticao' | undefined;
  visible: boolean;
  onAdicionar: (
    tempoCronometro?: {minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number},
    tempoRepeticao?: {quantidade: number}
  ) => void;
}
export function CustomModalTemp({title, tipoTempo, chooseType, visible, onAdicionar}: ICustomModalProps) {
 
  const [tipo, setTipo] = useState<string | undefined>();

  const modo =
    chooseType
    ? tipo === 'rep'
      ? 'repeticao'
      : tipo === 'time'
      ? 'cronometro'
      : undefined
    : tipoTempo;

    function handleAdicionar(
      tempoCronometro?: {minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number},
      tempoRepeticao?: {quantidade: number}
    ){
      if(tempoCronometro){
        onAdicionar(
          {
            minuto: tempoCronometro?.minuto,
            dezenaDosSegundos: tempoCronometro?.dezenaDosSegundos,
            unidadeDosSegundos: tempoCronometro?.unidadeDosSegundos
          },
        )
        return; 
      }
       if(tempoRepeticao){
        onAdicionar(
         undefined,
         {
          quantidade: tempoRepeticao.quantidade
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

              {chooseType && (
                <ComboBox 
                value={tipo}
                onChange={setTipo}
                valores={[
                  {label:'Time', valor:'time'}, {label:'Repetição', valor:'rep'}
                ]}/>
              )}
   
              {modo === 'cronometro' && (
                <ContadorCronometro onAdicionar={handleAdicionar}/>
              )}

              {modo === 'repeticao' && (
                <ContadorRepeticao onAdicionar={handleAdicionar}/>
              )}

              {modo === 'cronometroComrepeticao' && (
                <ContadorCronometroComRepeticao onAdicionar={handleAdicionar}/>
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
    fontSize: 15
  },
});