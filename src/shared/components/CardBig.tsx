import { MaterialIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../themes/theme";
import { formatarSegundosParaTexto } from "../utils/auxiliarTreinoEmExecucao";


interface IPropsCardBig {
    title: string;
    backgroundColor: string;
    buttonColor: string;
    proximaRota: Href;
    modoDescanso?:boolean;
    modoContagem: {
        tempoContagemEmSegundos?: number;
        usarModoContagem: boolean;
    };
    modoRepeticao: {
        tempoRepeticao?:string;
        usarModoRepeticao: boolean;
    };

}

export const CardBig = (props: IPropsCardBig) => {
    const [backgroundColor, setbackgroundColor] = useState('');
    const [title, setTitle] = useState('');
    const [segundos, setSegundos] = useState(props.modoContagem.tempoContagemEmSegundos ?? 0);
    const [rodando, setRodando] = useState(true);

    useEffect(() => {
        if (!rodando) return;

        const interval = setInterval(() => {
            setSegundos((prev) => {
            if (prev <= 1) {
                clearInterval(interval);

                router.push(props.proximaRota);
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
            {props.modoExercicio && (
                <Text style={styles.titleExercise}>1/{props.modoExercicio.quantidadeTotal}</Text>
            )}

            <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{props.title}</Text>
                    {props.modoContagem.usarModoContagem && (
                       <Text style={styles.cardSubtitle}>
                            {formatarSegundosParaTexto(segundos)}
                       </Text>
                    )}
                    {/*Modo Exercício*/}
                    {props.modoContagem.usarModoContagem && !props.modoDescanso && (
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
                    {props.modoContagem.usarModoContagem && props.modoDescanso && (
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
                    {props.modoRepeticao.usarModoRepeticao && (
                        <Text style={styles.cardSubtitle}>
                            {props.modoRepeticao.tempoRepeticao}
                            {!props.modoRepeticao.tempoRepeticao && 'x10'}
                        </Text>
                    )}
                     {props.modoRepeticao.usarModoRepeticao && (
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

                    <TouchableOpacity onPress={() => router.push(props.proximaRota)}>
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