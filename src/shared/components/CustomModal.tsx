import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import ComboBox from "./Combo_temp";


export interface ICustomModalProps {
  title: string;
  chooseType?: boolean;
  type: 'cronometro' | 'repeticao';
  visible: boolean;
  onClose: () => void;
}
export function CustomModal({title, type,chooseType, visible, onClose}: ICustomModalProps) {
  const [minuto, setMinuto] = useState(0);
  const [dezenaDosSegundos, setDezenaDosSegundos] = useState(0);
  const [unidadeDosSegundos, setUnidadeDosSegundos] = useState(0);


  const [tipo, setTipo] = useState<string | undefined>();

  const modo =
  chooseType
    ? tipo === 'rep'
      ? 'repeticao'
      : tipo === 'time'
      ? 'cronometro'
      : undefined
    : type;

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
              <View style={{width: '100%'}}>
                  <View style={styles.containerTitle}>
                    <Text style={styles.title}>Minutos</Text>
                    <Text style={{...styles.title, marginRight: 10}}>Segundos</Text>
                  </View>

                  <View style={styles.containerContagem}>
                    {/*Minutos*/}
                    <View style={styles.containerContagemSeparator}>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                          <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                        </TouchableOpacity>
                        <View style={styles.containerContagemTempo}>
                          <Text style={styles.tempoLabel}>{minuto}</Text>
                        </View>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
                          <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                        </TouchableOpacity>
                    </View>

                    {/*Separador*/}
                    <View style={styles.containerContagemSeparator}>
                      <Text style={styles.separatorText}>:</Text>
                    </View>
                    
                    {/*Segundos*/}
                    <View style={styles.containerContagemMinutos}>
                      <View style={styles.containerContagemSeparator}>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDezenaDosSegundos((prev) => (prev < 50 ? prev + 1 : 0))}>
                          <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                        </TouchableOpacity>
                        <View style={styles.containerContagemTempo}>
                          <Text style={styles.tempoLabel}>{dezenaDosSegundos}</Text>
                        </View>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                          <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                        </TouchableOpacity>  
                      </View>

                      <View style={styles.containerContagemSeparator}>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setUnidadeDosSegundos((prev) => (prev < 50 ? prev + 1 : 0))}>
                          <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                        </TouchableOpacity>
                        <View style={styles.containerContagemTempo}>
                          <Text style={styles.tempoLabel}>{unidadeDosSegundos}</Text>
                        </View>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                          <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                        </TouchableOpacity>  
                      </View>
                    </View>
                  </View>
              </View>
              )}

              {modo === 'repeticao' && (
                <View>
                   <View style={styles.containerTitle}>
                    <Text style={styles.title}>Vezes</Text>
                  </View>

                  <View style={styles.containerContagem}>
                    <View style={styles.containerContagemSeparator}>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                          <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                        </TouchableOpacity>
                        <View style={styles.containerContagemTempo}>
                          <Text style={styles.tempoLabel}>{minuto}</Text>
                        </View>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
                          <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                        </TouchableOpacity>
                    </View>
                  </View>

                </View>
              )}  
             

            <TouchableOpacity style={styles.footer} onPress={onClose}>
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
    fontSize: 15
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60
    
  },
  title: {
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.sizes.medium
  },
  containerContagem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60
  
  },
  containerContagemSeparator: {
    gap: 2,
    alignItems: 'center',
  },
  containerContagemMinutos: {
    flexDirection: 'row',
    gap: 4
  },
  containerContagemBotao: {
    width: 50,
    borderRadius: 5,
    backgroundColor: '#B8B8B8'
  },
  containerContagemTempo: {
    width: 50,
    borderRadius: 5,
    backgroundColor: theme.colors.header,
  },
  separatorText: {
    fontFamily: theme.fonts.family.regular,
    textAlign: 'center',
    fontSize: theme.fonts.sizes.medium
  },
  tempoLabel: {
    fontFamily: theme.fonts.family.regular,
    textAlign: 'center',
    fontSize: theme.fonts.sizes.medium
  },
  footer: {
    paddingVertical: 4,
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