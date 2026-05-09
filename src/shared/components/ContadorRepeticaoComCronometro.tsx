import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { contadorStyles } from '../styles/contadorStyles';
import { theme } from "../themes/theme";
import { TempoCronometro, TemposExercicio } from "../types/tempos";
import ComboBox from "./Combo_temp";
import { ContadorRepeticao } from "./ContadorRepeticao";

enum TipoCronometro {
  Time = 'time',
  Rep = 'rep',
}

interface IContadorRepeticaoComCronometroProps {
    title: string | undefined;
    visible: boolean;
    quantidadeRecebida?: number,
    exercicioRecebido?: {
        id: string;
        tempos: TemposExercicio
    },
     onAdicionarQuantidade?: (
        tempoQuantidade: number
     ) => void;
     onAdicionarQuantidadeComCronometroOuRepeticao?: ( 
        sigla: 'Time' | 'Rep',
        tempoQuantidade: number,
        tempos: TemposExercicio 
    ) => void;
     onEditarExercicio?: (
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
    quantidadeRecebida,
    onAdicionarQuantidade,
    onAdicionarQuantidadeComCronometroOuRepeticao,
    onEditarExercicio,
    onClose
}: IContadorRepeticaoComCronometroProps) => {

    const [tipo, setTipo] = useState('');
    const [proximo, setProximo] = useState(false);

    //Crônometro do exercício
    const [exercicioMinuto, setExercicioMinuto] = useState(0);
    const [exercicioDezenaDosSegundos, setExercicioDezenaDosSegundos] = useState(0);
    const [exercicioUnidadeDosSegundos, setExercicioUnidadeDosSegundos] = useState(0);
    
    //Crônometro do descanso
    const [descansoMinuto, setDescansoMinuto] = useState(0);
    const [descansoDezenaDosSegundos, setDescansoDezenaDosSegundos] = useState(0);
    const [descansoUnidadeDosSegundos, setDescansoUnidadeDosSegundos] = useState(0);

    //Tempo de repetição
    const [repeticao, setRepeticao] = useState(0);

    //Quantidade de exercícios
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {

        if(exercicioRecebido){
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
            return;
        }

        if(quantidadeRecebida){
            setQuantidade(quantidadeRecebida);
        }
        
       
    },[])

    function pegarValoresDeAcordoComOTipo(tipo:string): {
        sigla: 'Rep' | 'Time',
        tempoExercicio: TempoCronometro | undefined,
        tempoRepeticao: number | undefined
    }{

        const sigla = tipo === TipoCronometro.Rep ? 'Rep' : 'Time';

        const tempoExercicio =  tipo == TipoCronometro.Time ? {
            minuto: exercicioMinuto,
            dezenaDosSegundos: exercicioDezenaDosSegundos,
            unidadeDosSegundos: exercicioUnidadeDosSegundos
        } : undefined;

        const tempoRepeticao = tipo == TipoCronometro.Rep ? repeticao : undefined;

        return {sigla,tempoExercicio,tempoRepeticao};

    }

    function handleAdicionarQuantidade(){
         if(onAdicionarQuantidade){
            onAdicionarQuantidade(
                quantidade
            )
        }
    }


    function handleAdicionarQuantidadeComCronometroOuRepeticao(tipo: string){
        const valores = pegarValoresDeAcordoComOTipo(tipo);

        if(onAdicionarQuantidadeComCronometroOuRepeticao){
            onAdicionarQuantidadeComCronometroOuRepeticao(
                valores.sigla,
                quantidade,
                {
                    tempoDescanso: {
                        minuto: descansoMinuto,
                        dezenaDosSegundos: descansoDezenaDosSegundos,
                        unidadeDosSegundos: descansoUnidadeDosSegundos
                    },
                    tempoExercicio: valores.tempoExercicio,
                    tempoRepeticao: valores.tempoRepeticao
                }
            )

            setProximo(false);
        }

     
    }

    function handleEditar(tipo: string) {
        const valores = pegarValoresDeAcordoComOTipo(tipo);

        if(exercicioRecebido && onEditarExercicio){
            onEditarExercicio(
                valores.sigla,
                exercicioRecebido.id,
                {
                    tempoDescanso: {
                        minuto: descansoMinuto,
                        dezenaDosSegundos: descansoDezenaDosSegundos,
                        unidadeDosSegundos: descansoUnidadeDosSegundos
                    },
                    tempoExercicio: valores.tempoExercicio,
                    tempoRepeticao: valores.tempoRepeticao
                }
            )   
        }
        
    }


    return (

    <Modal transparent animationType="fade" visible={visible}>
        <View style={contadorStyles.overlay}>
            <View style={contadorStyles.modal}>
                <View style={contadorStyles.header}>
                    <Text style={contadorStyles.headerTitle}>{title}</Text>
                </View>
                
                {!exercicioRecebido && !proximo && (
                    <ContadorRepeticao 
                        labelBotao={onAdicionarQuantidade ? 'Adicionar' : 'Próximo'}
                        quantidade={quantidade}
                        changeQuantidade={setQuantidade}
                        onAdicionar={() => {
                            if(onAdicionarQuantidadeComCronometroOuRepeticao){
                                setProximo(true);
                            }else{
                               handleAdicionarQuantidade();
                            }
                           
                        }}
                        onClose={onClose}
                    />
                )}
           
               
                {(proximo || exercicioRecebido) && (
                <>
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
                            <View style={contadorStyles.containerTitle}>
                                <Text style={contadorStyles.title}>Minutos</Text>
                                <Text style={{...contadorStyles.title, marginRight: 10}}>Segundos</Text>
                            </View>

                            <View style={contadorStyles.containerContagem}>
                                {/*Minutos*/}
                                <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setExercicioMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{exercicioMinuto}</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setExercicioMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>
                                </View>

                                {/*Separador*/}
                                <View style={contadorStyles.containerContagemSeparator}>
                                    <Text style={contadorStyles.separatorText}>:</Text>
                                </View>
                            
                                {/*Segundos*/}
                                <View style={contadorStyles.containerContagemMinutos}>
                                    <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setExercicioDezenaDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{exercicioDezenaDosSegundos}</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setExercicioDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>  
                                    </View>

                                    <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setExercicioUnidadeDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{exercicioUnidadeDosSegundos }</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setExercicioUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>  
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{width: '100%'}}>
                            <Text style={{...contadorStyles.title, 
                                textAlign: 'center', 
                                backgroundColor: theme.colors.header, 
                                marginBottom: 10, 
                                paddingVertical: 4
                                }}>Descanso</Text>
                            <View style={contadorStyles.containerTitle}>
                                <Text style={contadorStyles.title}>Minutos</Text>
                                <Text style={{...contadorStyles.title, marginRight: 10}}>Segundos</Text>
                            </View>

                            <View style={contadorStyles.containerContagem}>
                                {/*Minutos*/}
                                <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{descansoMinuto}</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>
                                </View>

                                {/*Separador*/}
                                <View style={contadorStyles.containerContagemSeparator}>
                                    <Text style={contadorStyles.separatorText}>:</Text>
                                </View>
                            
                                {/*Segundos*/}
                                <View style={contadorStyles.containerContagemMinutos}>
                                    <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoDezenaDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{descansoDezenaDosSegundos}</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>  
                                    </View>

                                    <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoUnidadeDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{descansoUnidadeDosSegundos }</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
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
                            <View style={contadorStyles.containerContagem}>
                                <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setRepeticao(prev => prev < 50 ? prev + 1 : 0)}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{repeticao}</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setRepeticao( prev => prev > 0 ? prev - 1 : 0)}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{width: '100%'}}>
                            <Text style={{...contadorStyles.title, textAlign: 'center', backgroundColor: theme.colors.header, marginBottom: 10}}>Descanso</Text>
                            <View style={contadorStyles.containerTitle}>
                                <Text style={contadorStyles.title}>Minutos</Text>
                                <Text style={{...contadorStyles.title, marginRight: 10}}>Segundos</Text>
                            </View>

                            <View style={contadorStyles.containerContagem}>
                                {/*Minutos*/}
                                <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{descansoMinuto}</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>
                                </View>

                                {/*Separador*/}
                                <View style={contadorStyles.containerContagemSeparator}>
                                    <Text style={contadorStyles.separatorText}>:</Text>
                                </View>
                            
                                {/*Segundos*/}
                                <View style={contadorStyles.containerContagemMinutos}>
                                    <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoDezenaDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{descansoDezenaDosSegundos}</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>  
                                    </View>

                                    <View style={contadorStyles.containerContagemSeparator}>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoUnidadeDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                                    </TouchableOpacity>
                                    <View style={contadorStyles.containerContagemTempo}>
                                        <Text style={contadorStyles.tempoLabel}>{descansoUnidadeDosSegundos }</Text>
                                    </View>
                                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDescansoUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                                    </TouchableOpacity>  
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                    )}
                
           
                    <View style={contadorStyles.footer}>
                        <TouchableOpacity style={contadorStyles.footerAction} onPress={onClose}>
                            <Text style={contadorStyles.footerTitle}>Cancelar</Text>
                        </TouchableOpacity>

                        {exercicioRecebido && (
                            <TouchableOpacity style={contadorStyles.footerAction} onPress={() => handleEditar(tipo)}>
                                <Text style={contadorStyles.footerTitle}>Editar</Text>
                            </TouchableOpacity> 
                        )}

                         {!exercicioRecebido && (
                            <TouchableOpacity style={contadorStyles.footerAction} onPress={() => handleAdicionarQuantidadeComCronometroOuRepeticao(tipo)}>
                                <Text style={contadorStyles.footerTitle}>Adicionar</Text>
                            </TouchableOpacity> 
                        )}
                       
                    </View> 
                </>
                )}
            </View>
        </View>
    </Modal>
    )
}

