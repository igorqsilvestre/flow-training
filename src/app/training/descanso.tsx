import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { formatarTempoParaSegundos } from "@/src/shared/utils/auxiliarTreinoEmExecucao";
import { router } from "expo-router";

export default function Descanso() {

    const execucaoStorage = useTreinoExecucaoStore(s => s);
    
    function irParaProximaRota(){
        execucaoStorage.proximaFase();
        router.push('/training/exercicio');
    }


    return (
        <CardBig
        tipoTreino="descanso"
        tempoCronometroEmSegundos={
            formatarTempoParaSegundos(execucaoStorage.exercicioAtual?.tempoDescanso)
        }
        title='Descanso' 
        backgroundColor={theme.colors.cycles} 
        buttonColor={theme.colors.botaoDescanso}
        irParaAproximaRota={irParaProximaRota}
        />
    )
}