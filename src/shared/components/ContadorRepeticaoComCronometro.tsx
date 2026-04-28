import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { TemposExercicio } from "../types/tempos";
import ComboBox from "./Combo_temp";

enum TipoCronometro {
  Time = 'time',
  Rep = 'rep',
}

interface IContadorRepeticaoComCronometroProps {
    title: string | undefined;
    visible: boolean;
     exercicioRecebido?: {
        id: string;
        tempos: TemposExercicio
    },
     onAdicionar?: ( 
        sigla: 'Time' | 'Rep',
        tempoQuantidade: number,
        tempos: TemposExercicio 
    ) => void;
     onEditar?: (
        sigla: 'Time' | 'Rep',
        id:string,
        tempos: TemposExercicio
    ) => void;
    onClose: () => void;
}
export const ContadorRepeticaoComCronometro = ({
    title,
    visible,
    exercicioRecebido,
    onAdicionar,
    onEditar,
    onClose
}: IContadorRepeticaoComCronometroProps) => {

    const [tipo, setTipo] = useState('');

    //Crônometro do exercício
    const [exercicioMinuto, setExercicioMinuto] = useState(0);
    const [exercicioDezenaDosSegundos, setExercicioDezenaDosSegundos] = useState(4);
    const [exercicioUnidadeDosSegundos, setExercicioUnidadeDosSegundos] = useState(5);
    
    //Crônometro do descanso
    const [descansoMinuto, setDescansoMinuto] = useState(0);
    const [descansoDezenaDosSegundos, setDescansoDezenaDosSegundos] = useState(1);
    const [descansoUnidadeDosSegundos, setDescansoUnidadeDosSegundos] = useState(5);

    //Tempo de repetição
    const [repeticao, setRepeticao] = useState(0);

    //Quantidade de exercícios
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        if(!exercicioRecebido)return;

        setDescansoMinuto(exercicioRecebido.tempos.tempoDescanso.minuto);
        setDescansoDezenaDosSegundos(exercicioRecebido.tempos.tempoDescanso.dezenaDosSegundos);
        setDescansoUnidadeDosSegundos(exercicioRecebido.tempos.tempoDescanso.unidadeDosSegundos);

        if(exercicioRecebido.tempos.tempoExercicio){ 
            setExercicioMinuto(exercicioRecebido?.tempos.tempoExercicio?.minuto);
            setExercicioDezenaDosSegundos(exercicioRecebido?.tempos.tempoExercicio?.dezenaDosSegundos);
            setExercicioUnidadeDosSegundos(exercicioRecebido?.tempos.tempoExercicio?.unidadeDosSegundos);
            return;
        };
        if(exercicioRecebido.tempos.tempoRepeticao){
            setRepeticao(exercicioRecebido.tempos.tempoRepeticao);
        }
        
       
    },[])


    function handleAdicionar(tipo: string){
        const sigla = tipo === TipoCronometro.Rep ? 'Rep' : 'Time';

        const tempoExercicio =  tipo == TipoCronometro.Time ? {
            minuto: exercicioMinuto,
            dezenaDosSegundos: exercicioDezenaDosSegundos,
            unidadeDosSegundos: exercicioUnidadeDosSegundos
        } : undefined;

        const tempoRepeticao = tipo == TipoCronometro.Rep ? repeticao : undefined;

        if(exercicioRecebido && onEditar){
            onEditar(
                sigla,
                exercicioRecebido.id,
                {
                    tempoDescanso: {
                        minuto: descansoMinuto,
                        dezenaDosSegundos: descansoDezenaDosSegundos,
                        unidadeDosSegundos: descansoUnidadeDosSegundos
                    },
                    tempoExercicio,
                    tempoRepeticao
                }
            )

        }else{
            if(onAdicionar){
                onAdicionar(
                    sigla,
                    quantidade,
                    {
                        tempoDescanso: {
                            minuto: descansoMinuto,
                            dezenaDosSegundos: descansoDezenaDosSegundos,
                            unidadeDosSegundos: descansoUnidadeDosSegundos
                        },
                        tempoExercicio,
                        tempoRepeticao
                    }
                )
            }
        }
    }


    return (

    <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
                {!exercicioRecebido && (
                    <View>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>Vezes</Text>
                        </View>

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
                )}
               
           
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
                    <Text style={{...styles.title, 
                        textAlign: 'center', 
                        backgroundColor: theme.colors.header, 
                        marginBottom: 10, 
                        paddingVertical: 4
                        }}>Descanso</Text>
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
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setRepeticao(prev => prev < 50 ? prev + 1 : 0)}>
                                    <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                </TouchableOpacity>
                                <View style={styles.containerContagemTempo}>
                                    <Text style={styles.tempoLabel}>{repeticao}</Text>
                                </View>
                                <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setRepeticao( prev => prev > 0 ? prev - 1 : 0)}>
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
                
           
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerAction} onPress={onClose}>
                        <Text style={styles.footerTitle}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footerAction} onPress={() => handleAdicionar(tipo)}>
                        <Text style={styles.footerTitle}>Adicionar</Text>
                    </TouchableOpacity> 
                </View> 
            </View>
        </View>
    </Modal>
    )
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
        paddingHorizontal: 56
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
        width: 60,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#B8B8B8'
    },
    containerContagemTempo: {
        width: 60,
        padding: 5,
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
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
  footerTitle: {
        textAlign: 'center',
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.medium
    },
    footerAction: {
        paddingVertical: 8,
        width: '35%',
        marginBottom: 4,
        borderRadius: 10,
        backgroundColor: theme.colors.header
    },
});