import { Text, View } from "react-native";

export default function Finalizado() {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{ color: 'white' }}>
                Treino terminado com sucesso!
            </Text>
        </View> 
    )
}