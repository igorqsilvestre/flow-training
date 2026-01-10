import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";

export interface IContadorRepeticaoProps {
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


export const ContadorRepeticao = ({ onAdicionar }: IContadorRepeticaoProps) => {
    //Repetição
    const [quantidade, setQuantidade] = useState(0);

    function handleAdicionar() {
      onAdicionar(
        undefined,
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
        paddingHorizontal: 60,
        
    },
    containerContagemSeparator: {
        gap: 2,
        alignItems: 'center',
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