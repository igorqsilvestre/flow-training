import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { contadorStyles } from '../styles/contadorStyles';

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
            <View style={contadorStyles.containerTitle}>
                <Text style={contadorStyles.title}>Vezes</Text>
            </View>

            <View style={contadorStyles.containerContagem}>
                <View style={contadorStyles.containerContagemSeparator}>
                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => changeQuantidade(quantidade < 50 ? quantidade + 1 : 0)}>
                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="add" color='#000'/>
                    </TouchableOpacity>

                    <View style={contadorStyles.containerContagemTempo}>
                        <Text style={contadorStyles.tempoLabel}>{quantidade}</Text>
                    </View>

                    <TouchableOpacity style={contadorStyles.containerContagemBotao} onPress={() => changeQuantidade(quantidade > 0 ? quantidade - 1 : 0)}>
                        <MaterialIcons style={{alignSelf: 'center'}} size={24} name="remove" color='#000'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        <View style={contadorStyles.footer}>
            <TouchableOpacity style={contadorStyles.footerAction} onPress={onClose}>
                <Text style={contadorStyles.footerTitle}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={contadorStyles.footerAction} onPress={() => onAdicionar()}>
                <Text style={contadorStyles.footerTitle}>{labelBotao}</Text>
            </TouchableOpacity> 
        </View>
    </>   
    )
}
