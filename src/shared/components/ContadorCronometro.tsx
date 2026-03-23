import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";

export interface IContadorCronometroProps {
     onAdicionar: ( 
        minuto: number, 
        dezenaDosSegundos: number,
        unidadeDosSegundos: number
     ) => void;
}
export const ContadorCronometro = ({onAdicionar}: IContadorCronometroProps) => {

    const [minuto, setMinuto] = useState(0);
    const [dezenaDosSegundos, setDezenaDosSegundos] = useState(0);
    const [unidadeDosSegundos, setUnidadeDosSegundos] = useState(0);

     function handleAdicionar(){
        onAdicionar(minuto,dezenaDosSegundos,unidadeDosSegundos);
    }

    return (
        <>
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