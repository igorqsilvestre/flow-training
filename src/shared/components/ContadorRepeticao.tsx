import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";

export interface IContadorRepeticaoProps {
    quantidade: number;
    onChangeQuantidade: (valor: number) => void;
}

export const ContadorRepeticao = ({onChangeQuantidade, quantidade}: IContadorRepeticaoProps) => {
    return (
        <>
            <View>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Vezes</Text>
                </View>

                <View style={styles.containerContagem}>
                    <View style={styles.containerContagemSeparator}>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => onChangeQuantidade(quantidade < 50 ? quantidade + 1 : 0)}>
                            <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                        </TouchableOpacity>
                        <View style={styles.containerContagemTempo}>
                            <Text style={styles.tempoLabel}>{quantidade}</Text>
                        </View>
                        <TouchableOpacity style={styles.containerContagemBotao} onPress={() => onChangeQuantidade(quantidade > 0 ? quantidade - 1 : 0)}>
                            <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>    
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
});