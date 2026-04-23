import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { formatarTempoParaSegundos } from "@/src/shared/utils/auxiliarTreinoEmExecucao";
import { router } from "expo-router";

export default function Index() {
    
    const execucaoStorage = useTreinoExecucaoStore();

    function irParaProximaRota(){
        const rota = execucaoStorage.rotaAtual;
        if(rota === 'index'){
            const proximaRota = 'exercicio';
            execucaoStorage.setProximaRota(proximaRota);
            router.push(`/training/${proximaRota}`); 
        } 
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