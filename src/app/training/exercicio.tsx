import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Exercicio() {

     const execucaoStorage = useTreinoExecucaoStore(s => s);

     useEffect(() => {
       const exercicio = execucaoStorage.exercicioAtual;
       if(exercicio) {
       cont tempoCronometro = exercicio.
       }
     },[])

     function irParaProximaRota(){
        execucaoStorage.proximaFase();
        router.push('/training/descanso');
     }

    return (
        <CardBig
            
            title={'Exercicio 'execucaoStorage.indexExercicio+1'º'}
            backgroundColor={theme.colors.exercise}
            buttonColor={theme.colors.botaoExercise}
            irParaAproximaRota={irParaProximaRota}
            tempoCronometroEmSegundos={execucaoStorage.treino.}
        />
    )
}