import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { TempoCronometro } from "@/src/shared/types/tempos";
import { formatarTempoParaSegundos } from "@/src/shared/utils/auxiliarTreinoEmExecucao";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function Exercicio() {

     const execucaoStorage = useTreinoExecucaoStore(s => s);
     const [tempoCronometro, setTempoCronometro] = useState<TempoCronometro | undefined>();
     const [tempoRepeticao, setTempoRepeticao] = useState<number | undefined>();

     useEffect(() => {
       const exercicio = execucaoStorage?.exercicioAtual;

       if(exercicio) {
        setTempoCronometro(exercicio.tempoCronometro);
        setTempoRepeticao(exercicio.tempoRepeticao);
       }else{
        console.log('undefined');
       }
     },[execucaoStorage.exercicioAtual])

     function irParaProximaRota(){
        execucaoStorage.proximaFase();
        router.push('/training/descanso');
     }

    return (
        <CardBig
            tipoTreino="execucao"
            title={`Exercicio ${execucaoStorage.indexExercicio + 1}º`}
            backgroundColor={theme.colors.exercise}
            buttonColor={theme.colors.botaoExercise}
            irParaAproximaRota={irParaProximaRota}
            tempoCronometroEmSegundos={formatarTempoParaSegundos(tempoCronometro)}
            tempoRepeticao={tempoRepeticao}
        />
    )
}