import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { TempoCronometro } from "../utils/auxiliarDeTreino";
import ComboBox from "./Combo_temp";

enum TipoCronometro {
  Time = 'time',
  Rep = 'rep',
}

export type TemposExercicio = {
    tempoExercicio?: {
    exercicioMinuto: number,
    exercicioDezenaDosSegundos: number,
    exercicioUnidadeDosSegundos: number
  },
  tempoQuantidade?: {
    quantidade: number
  },
  tempoDescanso: {
    descansoMinuto: number,
    descansoDezenaDosSegundos: number,
    descansoUnidadeDosSegundos: number
  }
}

export interface ICustomModalTempoProps {
  visible: boolean;
  configuracoesExercicio?: {
     id: string;
     title: string;
     tempoExercicio?: TempoCronometro,
     tempoDescanso: TempoCronometro,
     tempoRepeticao?: number 
  }
  onAdicionarTempoExercicio: (
    sigla: 'Time' | 'Rep',
    id:string,
    tempoDescanso: TempoCronometro,
    tempoExercicio?: TempoCronometro,
    tempoRepeticao?: number
  ) => void;
}
export function CustomModalTempoExercicio(
    { 
        visible,
        configuracoesExercicio,
        onAdicionarTempoExercicio
    }: ICustomModalTempoProps) {

   //Crônometro do exercício
    const [exercicioMinuto, setExercicioMinuto] = useState(0);
    const [exercicioDezenaDosSegundos, setExercicioDezenaDosSegundos] = useState(0);
    const [exercicioUnidadeDosSegundos, setExercicioUnidadeDosSegundos] = useState(0);
      
    //Crônometro do descanso
    const [descansoMinuto, setDescansoMinuto] = useState(0);
    const [descansoDezenaDosSegundos, setDescansoDezenaDosSegundos] = useState(0);
    const [descansoUnidadeDosSegundos, setDescansoUnidadeDosSegundos] = useState(0);
  
    const [quantidade, setQuantidade] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [ id, setId] = useState('');
    const [tipo, setTipo] = useState('');

    useEffect(() => {
      if(configuracoesExercicio){
        setId(configuracoesExercicio.id);
        setTitulo(configuracoesExercicio?.title);
        setDescansoMinuto(configuracoesExercicio.tempoDescanso.minuto);
        setDescansoDezenaDosSegundos(configuracoesExercicio.tempoDescanso.dezenaDosSegundos);
        setDescansoUnidadeDosSegundos(configuracoesExercicio.tempoDescanso.unidadeDosSegundos);

        if(configuracoesExercicio.tempoExercicio){
            setExercicioMinuto(configuracoesExercicio.tempoExercicio.minuto);
            setExercicioDezenaDosSegundos(configuracoesExercicio.tempoExercicio.dezenaDosSegundos);
            setExercicioUnidadeDosSegundos(configuracoesExercicio.tempoExercicio.unidadeDosSegundos);
            return;
        }

        if(configuracoesExercicio.tempoRepeticao){
            setQuantidade(configuracoesExercicio.tempoRepeticao);
            return;
        }  
      }
     
    },[]);

    function handleAdicionar(tipo: string){
        if(tipo == TipoCronometro.Time){
            onAdicionarTempoExercicio(
                "Time",
                 id,
                 {
                    minuto: descansoMinuto,
                    dezenaDosSegundos: descansoDezenaDosSegundos,
                    unidadeDosSegundos: descansoUnidadeDosSegundos
                },
                {
                    minuto: exercicioMinuto,
                    dezenaDosSegundos: exercicioDezenaDosSegundos,
                    unidadeDosSegundos: exercicioUnidadeDosSegundos
                },     
            )
            return;
        }

        if(tipo == TipoCronometro.Rep){
            onAdicionarTempoExercicio(
                "Rep",
                id,
                {
                    minuto: descansoMinuto,
                    dezenaDosSegundos: descansoDezenaDosSegundos,
                    unidadeDosSegundos: descansoUnidadeDosSegundos
                },
                undefined,
                quantidade === 0 ? 10 : quantidade
            )
            return;
        }
    }


  return (
    <>

    <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{titulo}</Text>
                </View>
            
                <ComboBox 
                    value={tipo}
                    onChange={setTipo}
                    valores={[
                    {label:'Tempo crônometro', valor: TipoCronometro.Time}, 
                    {label:'Tempo repetição', valor: TipoCronometro.Rep},
                ]}/>
                    
            
                {tipo == TipoCronometro.Time && (
                    <>
                        <View style={{width: '100%'}}>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>Minutos</Text>
                            <Text style={{...styles.title, marginRight: 10}}>Segundos</Text>
                        </View>

                        <View style={styles.containerContagem}>
                            {/*Minutos*/}
                            <View style={styles.containerContagemSeparator}>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setExercicioMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{exercicioMinuto}</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setExercicioMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
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
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setExercicioDezenaDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{exercicioDezenaDosSegundos}</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setExercicioDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                </TouchableOpacity>  
                                </View>

                                <View style={styles.containerContagemSeparator}>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setExercicioUnidadeDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{exercicioUnidadeDosSegundos }</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setExercicioUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                </TouchableOpacity>  
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{width: '100%'}}>
                        <Text style={{...styles.title, textAlign: 'center', backgroundColor: theme.colors.header, marginBottom: 10}}>Descanso</Text>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>Minutos</Text>
                            <Text style={{...styles.title, marginRight: 10}}>Segundos</Text>
                        </View>

                        <View style={styles.containerContagem}>
                            {/*Minutos*/}
                            <View style={styles.containerContagemSeparator}>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{descansoMinuto}</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
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
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoDezenaDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{descansoDezenaDosSegundos}</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                </TouchableOpacity>  
                                </View>

                                <View style={styles.containerContagemSeparator}>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoUnidadeDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{descansoUnidadeDosSegundos }</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                </TouchableOpacity>  
                                </View>
                            </View>
                        </View>
                    </View>
                    </>
                    
                )}

                {tipo == TipoCronometro.Rep && (
                    <>
                        <View>
                            <View style={styles.containerContagem}>
                                <View style={styles.containerContagemSeparator}>
                                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setQuantidade(prev => prev < 50 ? prev + 1 : 0)}>
                                            <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                        </TouchableOpacity>
                                        <View style={styles.containerContagemTempo}>
                                            <Text style={styles.tempoLabel}>{quantidade}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setQuantidade( prev => prev > 0 ? prev - 1 : 0)}>
                                            <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                        </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    <View style={{width: '100%'}}>
                        <Text style={{...styles.title, textAlign: 'center', backgroundColor: theme.colors.header, marginBottom: 10}}>Descanso</Text>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>Minutos</Text>
                            <Text style={{...styles.title, marginRight: 10}}>Segundos</Text>
                        </View>

                        <View style={styles.containerContagem}>
                            {/*Minutos*/}
                            <View style={styles.containerContagemSeparator}>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{descansoMinuto}</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
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
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoDezenaDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{descansoDezenaDosSegundos}</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                </TouchableOpacity>  
                                </View>

                                <View style={styles.containerContagemSeparator}>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoUnidadeDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{descansoUnidadeDosSegundos }</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setDescansoUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                </TouchableOpacity>  
                                </View>
                            </View>
                        </View>
                    </View>
                    </>
                )}
                
                <TouchableOpacity style={styles.footer} onPress={() => handleAdicionar(tipo)}>
                        <Text style={styles.footerTitle}>Adicionar</Text>
                </TouchableOpacity>  
            </View>
           
        </View>
    </Modal>
    </>
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
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 60,
   
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
        alignItems: 'center'
    },
    separatorText: {
        fontFamily: theme.fonts.family.regular,
        textAlign: 'center',
        fontSize: theme.fonts.sizes.medium
    },
    containerContagemBotao: {
        width: 50,
        padding: 4,
        borderRadius: 5,
        backgroundColor: '#B8B8B8'
    },
    containerContagemTempo: {
        width: 50,
        padding: 4,
        borderRadius: 5,
        backgroundColor: theme.colors.header,
    },
    containerContagemMinutos: {
        flexDirection: 'row',
        gap: 4
    },
    tempoLabel: {
        fontFamily: theme.fonts.family.regular,
        textAlign: 'center',
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