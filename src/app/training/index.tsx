import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { formatarTempoParaSegundos } from "@/src/shared/utils/auxiliarTreinoEmExecucao";
import { router } from "expo-router";

export default function Index() {

    const execucaoStorage = useTreinoExecucaoStore(s => s);

    function irParaProximaRota(){
        execucaoStorage.proximaFase();
        router.push('/training/exercicio'); 
    }

    return (
       <CardBig
       tempoCronometroEmSegundos={
        formatarTempoParaSegundos(execucaoStorage.treino?.tempoPreparacao)
       }
       tipoTreino="preparacao"
       title='Preparação' 
       backgroundColor={theme.colors.preparation} 
       buttonColor={theme.colors.botaoPreparation}
       irParaAproximaRota={irParaProximaRota}
       />
    )
}