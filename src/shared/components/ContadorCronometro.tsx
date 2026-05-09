import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { contadorStyles } from '../styles/contadorStyles';
import { TempoCronometro } from "../types/tempos";

interface IContadorCronometroProps {
    title: string | undefined;
    visible: boolean;
    tempoCronometro?: TempoCronometro;
    onAdicionar: ( 
       tempo: TempoCronometro
    ) => void;
    onClose: () => void;
}
export const ContadorCronometro = ({title,visible,tempoCronometro,onAdicionar, onClose}: IContadorCronometroProps) => {

    const [minuto, setMinuto] = useState(0);
    const [dezenaDosSegundos, setDezenaDosSegundos] = useState(0);
    const [unidadeDosSegundos, setUnidadeDosSegundos] = useState(0);

    useEffect(() => {
        if(!tempoCronometro) return;

        setMinuto(tempoCronometro.minuto);
        setDezenaDosSegundos(tempoCronometro.dezenaDosSegundos);
        setUnidadeDosSegundos(tempoCronometro.unidadeDosSegundos);
        
    },[])

    function handleAdicionar(){
        onAdicionar({
            minuto,
            dezenaDosSegundos,
            unidadeDosSegundos
        });
    }

    return (
    <Modal transparent animationType="fade" visible={visible}>
        <View style={contadorStyles.overlay}>
            <View style={contadorStyles.modal}>
                <View style={contadorStyles.header}>
                    <Text style={contadorStyles.headerTitle}>{title}</Text>
                </View>
           
                <View style={{width: '100%'}}>
                    <View style={contadorStyles.containerTitle}>
                        <Text style={contadorStyles.title}>Minutos</Text>
                        <Text style={{...contadorStyles.title, marginRight: 10}}>Segundos</Text>
                    </View>

                    <View style={contadorStyles.containerContagem}>
                        {/*Minutos*/}
                        <View style={contadorStyles.containerContagemSeparator}>
                            <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setMinuto((prev) => (prev < 50 ? prev + 1 : 0))}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                            </TouchableOpacity>
                            <View style={contadorStyles.containerContagemTempo}>
                                <Text style={contadorStyles.tempoLabel}>{minuto}</Text>
                            </View>
                            <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setMinuto((prev) => (prev > 0 ? prev - 1 : 0))}>
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
                            <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDezenaDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                            </TouchableOpacity>
                            <View style={contadorStyles.containerContagemTempo}>
                                <Text style={contadorStyles.tempoLabel}>{dezenaDosSegundos}</Text>
                            </View>
                            <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setDezenaDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                            </TouchableOpacity>  
                            </View>

                            <View style={contadorStyles.containerContagemSeparator}>
                            <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setUnidadeDosSegundos((prev) => (prev < 5 ? prev + 1 : 0))}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                            </TouchableOpacity>
                            <View style={contadorStyles.containerContagemTempo}>
                                <Text style={contadorStyles.tempoLabel}>{unidadeDosSegundos}</Text>
                            </View>
                            <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => setUnidadeDosSegundos((prev) => (prev > 0 ? prev - 1 : 0))}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                            </TouchableOpacity>  
                            </View>
                        </View>
                    </View> 
                </View>

                <View style={contadorStyles.footer}>
                    <TouchableOpacity style={contadorStyles.footerAction} onPress={onClose}>
                        <Text style={contadorStyles.footerTitle}>Cancelar</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={contadorStyles.footerAction} onPress={handleAdicionar}>
                        <Text style={contadorStyles.footerTitle}>Adicionar</Text>
                    </TouchableOpacity> 
                </View>
                     
                   
            </View>
        </View>
    </Modal> 
    )
}
