import { theme } from '@/src/shared/themes/theme';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


type Props = {
  visible: boolean;
  onDelete: () => void;
  onClose: () => void;
};
export function ModalDelete({visible, onDelete, onClose }: Props){

    return (
    <Modal  visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
            <View style={styles.modal}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Excluir treino</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.message}>Tem certeza que deseja excluir ?</Text>
            </View>
                
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerAction} onPress={onClose}>
                    <Text style={styles.footerTitle}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerAction} onPress={onDelete}>
                    <Text style={styles.footerTitle}>Deletar</Text>
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
    content: {
        marginVertical: 8,
        width: '90%',
    },
    message: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.body,
        textAlign: 'center'
    },
    footer: {
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