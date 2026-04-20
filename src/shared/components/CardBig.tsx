import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { FaseTreino } from "../types/treinoEmExecucao";
import { formatarSegundosParaTexto } from "../utils/auxiliarTreinoEmExecucao";



interface IPropsCardBig {
    title: string;
    backgroundColor: string;
    buttonColor: string;
    tipoTreino: FaseTreino;

    quantidadeExercicios?: string;
    tempoCronometroEmSegundos?: number;
    tempoRepeticao?: number;
    irParaAproximaRota: () => void;
}

export const CardBig = (props: IPropsCardBig) => {
    const [segundos, setSegundos] = useState(0);
    const [rodando, setRodando] = useState(true);


    useEffect(() => {
        if (!rodando) return;

        const interval = setInterval(() => {
            setSegundos((prev) => {
            if (prev <= 1) {
                clearInterval(interval);
                
                props.irParaAproximaRota();
                return 0;
            }

            return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [rodando]);

    

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: props.backgroundColor, ...styles.card}}>
                {props.quantidadeExercicios && (
                    <Text style={styles.titleExercise}>
                        {props.quantidadeExercicios}
                    </Text>
                )}

                <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{props.title}</Text>
                        {props.tempoCronometroEmSegundos && (
                            <Text style={styles.cardSubtitle}>
                                    {formatarSegundosParaTexto(segundos)}
                            </Text>
                        )}
                        {/*Modo Exercício*/}
                        {props.tipoTreino === 'execucao' && (
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

                        {/*Modo descanso*/}
                        {props.tipoTreino === 'descanso' && (
                        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                            <TouchableOpacity style={{backgroundColor: props.buttonColor, ...styles.cardButtonExercise}}>
                                <Text style={{color: theme.colors.white, fontFamily: theme.fonts.family.bold, fontSize: theme.fonts.sizes.body  }}>+20s</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{backgroundColor: props.buttonColor, ...styles.cardButtonExercise}}>
                                <MaterialIcons size={20} name="stop"  color={theme.colors.white}/>
                                <Text style={{color: theme.colors.white, fontFamily: theme.fonts.family.bold, fontSize: theme.fonts.sizes.body }}>Parar</Text>
                            </TouchableOpacity>
                        </View>
                        )}

                        {/*Modo repetição*/}
                        {props.tempoRepeticao && (
                            <Text style={styles.cardSubtitle}>
                                {props.tempoRepeticao}
                            </Text>
                        )}
                        {props.tempoRepeticao && (
                            <TouchableOpacity style={{backgroundColor: props.buttonColor, ...styles.cardButtonExercise}}>
                                <MaterialIcons size={20} name="check"  color={theme.colors.white}/>
                                <Text style={{color: theme.colors.white, fontFamily: theme.fonts.family.bold, fontSize: theme.fonts.sizes.body  }}>Concluído</Text>
                            </TouchableOpacity>
                        )}

                </View>


                <View style={styles.cardFooter}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <MaterialIcons size={25} name="fast-rewind"  />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.irParaAproximaRota()}>
                            <MaterialIcons size={25} name="fast-forward"  />
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
        paddingVertical: 4,
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