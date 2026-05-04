import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";

interface IContadorRepeticaoProps {
    labelBotao: string;
    quantidade: number;
    changeQuantidade: (quantidade:number) => void;
    onAdicionar: () => void;
    onClose: () => void;
}

export const ContadorRepeticao = ({labelBotao,quantidade,changeQuantidade, onAdicionar, onClose}: IContadorRepeticaoProps) => {

    return (
    <>

        <View>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Vezes</Text>
            </View>

            <View style={styles.containerContagem}>
                <View style={styles.containerContagemSeparator}>
                    <TouchableOpacity style={styles.containerContagemBotao} onPress={() => changeQuantidade(quantidade < 50 ? quantidade + 1 : 0)}>
                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                    </TouchableOpacity>

                    <View style={styles.containerContagemTempo}>
                        <Text style={styles.tempoLabel}>{quantidade}</Text>
                    </View>

                    <TouchableOpacity style={styles.containerContagemBotao} onPress={() => changeQuantidade(quantidade > 0 ? quantidade - 1 : 0)}>
                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerAction} onPress={onClose}>
                <Text style={styles.footerTitle}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerAction} onPress={() => onAdicionar()}>
                <Text style={styles.footerTitle}>{labelBotao}</Text>
            </TouchableOpacity> 
        </View>
    </>   
    )
}


const styles = StyleSheet.create({
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
        paddingHorizontal: 56,
        
    },
    containerContagemSeparator: {
        gap: 2,
        alignItems: 'center',
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