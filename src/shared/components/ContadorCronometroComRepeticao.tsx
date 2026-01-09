import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import ComboBox from "./Combo_temp";

type Exercicio = {
    minuto?: number;
    dezenaDosSegundos?: number;
    unidadeDosSegundos?: number;
}

type Descanso = {
    minuto?: number;
    dezenaDosSegundos?: number;
    unidadeDosSegundos?: number;
}

enum TipoCronometro {
  EXEC = 'exec',
  DESC = 'desc',
}

export interface IContadorCronometroComRepeticaoProps {
    onAdicionar: (
        tempoCronometroComRepeticao?: {
           tempoExercicio?:{
            exercicioMinuto: number,
            exercicioDezenaDosSegundos: number,
            exercicioUnidadeDosSegundos: number;
           },
           tempoDescanso?:{
            descansoMinuto: number,
            descansoDezenaDosSegundos: number,
            descansoUnidadeDosSegundos: number
           } 
        },
        tempoCronometro?: {minuto: number, dezenaDosSegundos: number, unidadeDosSegundos: number},
        tempoRepeticao?: {quantidade: number},
    ) => void;
}
export const ContadorCronometroComRepeticao = ({ onAdicionar }: IContadorCronometroComRepeticaoProps) => {

    //Crônometro do exercício
    const [exercicioMinuto, setExercicioMinuto] = useState(0);
    const [exercicioDezenaDosSegundos, setExercicioDezenaDosSegundos] = useState(4);
    const [exercicioUnidadeDosSegundos, setExercicioUnidadeDosSegundos] = useState(5);
    
    //Crônometro do descanso
    const [descansoMinuto, setDescansoMinuto] = useState(0);
    const [descansoDezenaDosSegundos, setDescansoDezenaDosSegundos] = useState(1);
    const [descansoUnidadeDosSegundos, setDescansoUnidadeDosSegundos] = useState(5);

    const [quantidade, setQuantidade] = useState(0);
    const [tipo, setTipo] = useState<string | undefined>();

    useEffect(() => {
    if (
        exercicioMinuto === 0 &&
        exercicioDezenaDosSegundos === 0 &&
        exercicioUnidadeDosSegundos === 0
    ) {
        setExercicioDezenaDosSegundos(4);
        setExercicioUnidadeDosSegundos(5);
    }
    }, [exercicioMinuto, exercicioDezenaDosSegundos, exercicioUnidadeDosSegundos]);

    useEffect(() => {
    if (
        descansoMinuto === 0 &&
        descansoDezenaDosSegundos === 0 &&
        descansoUnidadeDosSegundos === 0
    ) {
        setDescansoDezenaDosSegundos(1);
        setDescansoUnidadeDosSegundos(5);
    }
    }, [descansoMinuto, descansoDezenaDosSegundos, descansoUnidadeDosSegundos]);

    
    function handleAdicionar() {
        onAdicionar(
        {
            tempoExercicio: {
                exercicioMinuto,
                exercicioDezenaDosSegundos ,
                exercicioUnidadeDosSegundos
           },
            tempoDescanso: {
                descansoMinuto,
                descansoDezenaDosSegundos,
                descansoUnidadeDosSegundos
           }
        },
        undefined,
        {
            quantidade
        }
        )
    }

    return (
        <>
            <View>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Vezes</Text>
                </View>

                <View style={styles.containerContagem}>
                    <View style={styles.containerContagemSeparator}>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setQuantidade((prev) => (prev < 50 ? prev + 1 : 0))}>
                            <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                        </TouchableOpacity>
                        <View style={styles.containerContagemTempo}>
                            <Text style={styles.tempoLabel}>{quantidade}</Text>
                        </View>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setQuantidade((prev) => (prev > 0 ? prev - 1 : 0))}>
                            <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ComboBox 
              value={tipo}
              onChange={setTipo}
              valores={[
                {label:'Exercício', valor:'exec'}, {label:'Descanso', valor:'desc'}
            ]}/>

            {tipo && (
                <View style={{width: '100%'}}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>Minutos</Text>
                        <Text style={{...styles.title, marginRight: 10}}>Segundos</Text>
                    </View>

                    <View style={styles.containerContagem}>
                        {/*Minutos*/}
                        <View style={styles.containerContagemSeparator}>
                            <TouchableOpacity style={styles.containerContagemBotao} onPress={() => {
                                if(tipo === TipoCronometro.EXEC){
                                    setExercicioMinuto((prev) => (prev < 50 ? prev + 1 : 0));
                                }
                                if(tipo === TipoCronometro.DESC){
                                    setDescansoMinuto((prev) => (prev < 50 ? prev + 1 : 0));
                                }
                            }}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                            </TouchableOpacity>
                            <View style={styles.containerContagemTempo}>
                                <Text style={styles.tempoLabel}>{tipo === TipoCronometro.EXEC ? exercicioMinuto : descansoMinuto}</Text>
                            </View>
                            <TouchableOpacity style={styles.containerContagemBotao} onPress={() => {
                                if(tipo === TipoCronometro.EXEC){
                                    setExercicioMinuto((prev) => (prev > 0 ? prev - 1 : 0));
                                }
                                if(tipo === TipoCronometro.DESC){
                                    setDescansoMinuto((prev) => (prev > 0 ? prev - 1 : 0));
                                }
   
                            }}>
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
                            <TouchableOpacity style={styles.containerContagemBotao} onPress={() => {
                                if(tipo === TipoCronometro.EXEC){
                                    setExercicioDezenaDosSegundos((prev) => (prev < 50 ? prev + 1 : 0));
                                }
                                if(tipo === TipoCronometro.DESC){
                                    setDescansoDezenaDosSegundos((prev) => (prev < 50 ? prev + 1 : 0));
                                }
                            }}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                            </TouchableOpacity>
                            <View style={styles.containerContagemTempo}>
                                <Text style={styles.tempoLabel}>{tipo === TipoCronometro.EXEC ? exercicioDezenaDosSegundos : descansoDezenaDosSegundos}</Text>
                            </View>
                            <TouchableOpacity style={styles.containerContagemBotao} onPress={() => {
                                if(tipo === TipoCronometro.EXEC){
                                    setExercicioDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0));
                                }
                                if(tipo === TipoCronometro.DESC){
                                    setDescansoDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0));
                                }
                            }}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                            </TouchableOpacity>  
                            </View>

                            <View style={styles.containerContagemSeparator}>
                            <TouchableOpacity style={styles.containerContagemBotao} onPress={() => {
                                if(tipo === TipoCronometro.EXEC){
                                    setExercicioUnidadeDosSegundos((prev) => (prev < 50 ? prev + 1 : 0));
                                }
                                if(tipo === TipoCronometro.DESC){
                                    setDescansoUnidadeDosSegundos((prev) => (prev < 50 ? prev + 1 : 0));
                                }
                            }}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                            </TouchableOpacity>
                            <View style={styles.containerContagemTempo}>
                                <Text style={styles.tempoLabel}>{tipo === TipoCronometro.EXEC ? exercicioUnidadeDosSegundos : descansoUnidadeDosSegundos}</Text>
                            </View>
                            <TouchableOpacity style={styles.containerContagemBotao} onPress={() => {
                                if(tipo === TipoCronometro.EXEC){
                                    setExercicioUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0));
                                }
                                if(tipo === TipoCronometro.DESC){
                                    setDescansoUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0));
                                }
                            }}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                            </TouchableOpacity>  
                            </View>
                        </View>
                    </View>
                </View>
            )}
           
           
            <TouchableOpacity style={styles.footer} onPress={handleAdicionar}>
                <Text style={styles.footerTitle}>Adicionar</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
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
    separatorText: {
        fontFamily: theme.fonts.family.regular,
        textAlign: 'center',
        fontSize: theme.fonts.sizes.medium
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