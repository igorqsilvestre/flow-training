import { MaterialIcons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { salvarDataConcluida } from '@/src/shared/services/treinoDataStorage';
import { useTreinoExecucaoStore } from '@/src/shared/store/useTreinoExecucaoStore';
import { theme } from '@/src/shared/themes/theme';


export default function Finalizado() {
    const {tempoInicialTreino} = useTreinoExecucaoStore();
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

   function calcularTempoTotal() {
        const agora = new Date();

        const diferencaEmMs = agora.getTime() - tempoInicialTreino.getTime();

        const totalSegundos = Math.floor(diferencaEmMs / 1000);

        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;

        return `Tempo total: ${minutos}m e ${segundos}s`;
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
            <Text style={styles.texto}>
                {calcularTempoTotal()}
            </Text>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBotao} onPress={() => router.replace('/(tabs)')}>
                    <Text style={styles.texto}>Voltar a home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBotao} onPress={() => router.replace('/(tabs)/progresso')} >
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