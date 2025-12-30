import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export function CustomModal() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Modal transparent animationType="fade" visible={open}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
            <Text>Preparação</Text>

             <TouchableOpacity onPress={() => setOpen(!open)}>
                <MaterialIcons size={28} name="add" color='#FFFFFF'/>
            </TouchableOpacity>
             

            <TouchableOpacity onPress={() => setOpen(!open)}>
                <Text>Fechar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
});