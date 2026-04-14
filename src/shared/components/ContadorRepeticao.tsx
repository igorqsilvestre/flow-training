import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";

interface IContadorRepeticaoProps {
    title: string | undefined;
    tempoRepeticao?: number;
    visible: boolean;
    onAdicionar: ( quantidade: number ) => void;
    onClose: () => void;
}

export const ContadorRepeticao = ({visible,title,tempoRepeticao, onAdicionar, onClose}: IContadorRepeticaoProps) => {

    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        if(tempoRepeticao){
            setQuantidade(tempoRepeticao);
        }
    },[])

    function handleAdicionar(){
        onAdicionar(quantidade);
    }

    return (
    <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>

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

                            <TouchableOpacity style={styles.containerContagemBotao} onPress={() => setQuantidade(prev => prev > 0 ? quantidade - 1 : 0)}>
                                <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerAction} onPress={onClose}>
                        <Text style={styles.footerTitle}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footerAction} onPress={handleAdicionar}>
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