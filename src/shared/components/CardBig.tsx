import { MaterialIcons } from "@expo/vector-icons";
import { useAudioPlayer } from 'expo-audio';
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { formatarSegundosParaTexto } from "../utils/auxiliarTreinoEmExecucao";

interface IPropsCardBig {
    title: string;
    backgroundColor: string;
    buttonColor: string;
    tipoTreino: 'preparacao' | 'execucao' | 'descanso';

    quantidadeExercicios?: string;
    tempoCronometroEmSegundos?: number;
    tempoRepeticao?: number;
    irParaAproximaRota: () => void;
    voltarRota: () => void;
}

export const CardBig = (props: IPropsCardBig) => {
    const [segundos, setSegundos] = useState<number | undefined>(undefined);
    const [rodando, setRodando] = useState(true);

    const startPlayer = useAudioPlayer(require('@/assets/sounds/start.mp3'));
    const beepPlayer = useAudioPlayer(require('@/assets/sounds/beep.mp3'));

    useFocusEffect(
        useCallback(() => {
            setSegundos(props.tempoCronometroEmSegundos);
            setRodando(true);

            if (props.tipoTreino === 'execucao') {
                startPlayer.seekTo(0);
                startPlayer.play();
            }

            return () => {
                setRodando(false);
            };
        }, [props.tempoCronometroEmSegundos, props.tipoTreino])
    );

   useEffect(() => {
    if (!rodando || segundos === 0) return;

    const interval = setInterval(() => {
        setSegundos((prev) => {
            if (prev === undefined) return prev;
            if (prev <= 1) return 0;
            return prev - 1;
        });
    }, 1000);

    return () => clearInterval(interval);
    }, [rodando, segundos]);

    useEffect(() => {
        if (
            segundos !== undefined &&
            segundos > 0 &&
            segundos <= 3
        ) {
           beepPlayer.seekTo(0);
           beepPlayer.play();
        }
        if (segundos === 0) {
            props.irParaAproximaRota();
        }
    }, [segundos]);

    function adicionarMais20SegundosNoTempo() {
      setSegundos(prev => (prev !== undefined ? prev + 20 : prev));
    }
    

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: props.backgroundColor, ...styles.card}}>
                <TouchableOpacity style={{alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 4}} onPress={() => router.replace('/(tabs)')}>
                    <MaterialIcons size={28} name="cancel"/>
                </TouchableOpacity>
                

                <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{props.title}</Text>
                        {segundos !== undefined && (
                            <Text style={styles.cardSubtitle}>
                                {formatarSegundosParaTexto(segundos)}
                            </Text>
                        )}
                        
                        {/*Modo exercício - cronômetro*/}
                        {segundos !== undefined && props.tipoTreino !== 'descanso' && (
                            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                                <TouchableOpacity style={{backgroundColor: props.buttonColor, ...styles.cardButtonExercise}} onPress={() => setRodando(true)}>
                                    <MaterialIcons size={20} name="play-arrow"  color={theme.colors.white}/>
                                    <Text style={{color: theme.colors.white, fontFamily: theme.fonts.family.bold, fontSize: theme.fonts.sizes.body }}>Continuar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{backgroundColor: props.buttonColor, ...styles.cardButtonExercise}} onPress={() => setRodando(false)}>
                                    <MaterialIcons size={20} name="stop"  color={theme.colors.white}/>
                                    <Text style={{color: theme.colors.white, fontFamily: theme.fonts.family.bold, fontSize: theme.fonts.sizes.body }}>Parar</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/*Modo exercício - repetição*/}
                        {props.tempoRepeticao !== undefined && (
                            <Text style={styles.cardSubtitle}>
                                {props.tempoRepeticao}x 
                            </Text>
                        )}
                        {props.tempoRepeticao !== undefined && (
                            <TouchableOpacity style={{backgroundColor: props.buttonColor, ...styles.cardButtonExercise}} onPress={() => props.irParaAproximaRota()}>
                                <MaterialIcons size={20} name="check"  color={theme.colors.white}/>
                                <Text style={{color: theme.colors.white, fontFamily: theme.fonts.family.bold, fontSize: theme.fonts.sizes.body  }}>Concluído</Text>
                            </TouchableOpacity>
                        )}

                        {/*Modo descanso*/}
                        {props.tipoTreino === 'descanso' && (
                            <TouchableOpacity style={{backgroundColor: props.buttonColor, ...styles.cardButtonExercise}} onPress={adicionarMais20SegundosNoTempo}>
                                <Text style={{color: theme.colors.white, fontFamily: theme.fonts.family.bold, fontSize: theme.fonts.sizes.body  }}>+20s</Text>
                            </TouchableOpacity>
                        )}

                </View>


                <View style={styles.cardFooter}>
                        <TouchableOpacity onPress={() => props.voltarRota()}>
                            <MaterialIcons size={28} name="fast-rewind"  />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.irParaAproximaRota()}>
                            <MaterialIcons size={28} name="fast-forward"  />
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    card: {
        width: '100%',
        borderRadius: 15,
        gap: 20,
  
    },
    titleExercise: {
        position: 'absolute',
        left: 10,
        top: 4,
        fontSize: theme.fonts.sizes.body,
        fontFamily: theme.fonts.family.medium,
        color: theme.colors.primary
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        gap: 10
    },
    cardTitle: {
        textAlign: 'center',
        fontFamily: theme.fonts.family.bold,
        fontSize: theme.fonts.sizes.large,
        color: theme.colors.primary
    },
    cardSubtitle: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.extraLarge,
        color: theme.colors.primary
    },
    cardButtonExercise: {
        width: 153,
        borderRadius: 10,
        paddingVertical: 6,
        gap: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardFooter: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    }
})