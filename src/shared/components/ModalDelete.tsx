import { Modal, Text, TouchableOpacity, View } from "react-native";

import { modalStyles } from '../styles/modalStyles';


type Props = {
  visible: boolean;
  onDelete: () => void;
  onClose: () => void;
};
export function ModalDelete({visible, onDelete, onClose }: Props){

    return (
    <Modal  visible={visible} transparent animationType="fade">
        <View style={modalStyles.overlay}>
            <View style={modalStyles.modal}>
            <View style={modalStyles.header}>
                <Text style={modalStyles.headerTitle}>Excluir treino</Text>
            </View>
            <View style={modalStyles.content}>
                <Text style={modalStyles.message}>Tem certeza que deseja excluir ?</Text>
            </View>
                
            <View style={modalStyles.footer}>
                <TouchableOpacity style={modalStyles.footerAction} onPress={onClose}>
                    <Text style={modalStyles.footerTitle}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={modalStyles.footerAction} onPress={onDelete}>
                    <Text style={modalStyles.footerTitle}>Deletar</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    </Modal>    
    )
}
