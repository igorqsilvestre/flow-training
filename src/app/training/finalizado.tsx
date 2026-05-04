import { salvarDataConcluida } from '@/src/shared/services/treinoDataStorage';
import { theme } from '@/src/shared/themes/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Finalizado() {
     const sucess = useAudioPlayer(require('@/assets/sounds/sucess.mp3'));

    useEffect(() => {
       
        sucess.seekTo(0);
        sucess.play();

        const data = getDataHoje();
        salvarDataConcluida(data);

    },[])

    function getDataHoje(){
         const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');

        return `${ano}-${mes}-${dia}`;
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row',gap: 10}}>
                <MaterialIcons size={50} name="celebration"  color={theme.colors.white}/>
                <MaterialIcons size={50} name="celebration"  color={theme.colors.white}/>
                <MaterialIcons size={50} name="celebration"  color={theme.colors.white}/>
                <MaterialIcons size={50} name="celebration"  color={theme.colors.white}/>
            </View>
            <Text style={styles.texto}>
                Parabéns
            </Text>
            <Text style={styles.texto}>
                Treino realizado com sucesso
            </Text>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBotao} onPress={() => router.push('/(tabs)')}>
                    <Text style={styles.texto}>Voltar a home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBotao} onPress={() => router.push('/(tabs)/progresso')} >
                    <Text style={styles.texto}>Ver progresso</Text>
                </TouchableOpacity>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
 container: {
    backgroundColor: theme.colors.secundary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30
 },

 texto: {
    color: theme.colors.white,
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.family.medium
 },

 footer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
 },

 footerBotao: {
    backgroundColor: '#5e5e5e',
    borderRadius: 10,
    padding: 10
 }

})