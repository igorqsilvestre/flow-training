import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

   const [quantidade, setQuantidade] = useState(0);

   const handleAdicionar = () => {
      if(tipoTempo === 'repeticao'){
        onAdicionarRepeticao({
          quantidade
        });
      }
      if(tipoTempo === 'cronometro'){

      }
   }


  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
   
              {tipoTempo === 'cronometro' && (
                <ContadorCronometro />
              )}

              {tipoTempo === 'repeticao' && (
                <ContadorRepeticao 
                    quantidade={quantidade}
                    onChangeQuantidade={setQuantidade}
                />
              )}

              <TouchableOpacity style={styles.footer} onPress={handleAdicionar}>
                <Text style={styles.footerTitle}>Adicionar</Text>
              </TouchableOpacity>
           
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
  footer: {
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginBottom: 4,
        borderRadius: 10,
        backgroundColor: theme.colors.header
    },
  footerTitle: {
        textAlign: 'center',
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.medium
  }
});