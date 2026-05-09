import { useKeepAwake } from 'expo-keep-awake';
import { router } from "expo-router";

import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { formatarTempoParaSegundos } from "@/src/shared/utils/auxiliarTreinoEmExecucao";
import { useEffect } from 'react';


export default function Index() {
    useKeepAwake();
    
    const {setTempoInicialTreino, rotaAtual, setProximaRota, treino} = useTreinoExecucaoStore();

    useEffect(() => {
        setTempoInicialTreino(new Date());
    },[])

    function irParaProximaRota(){
        const rota = rotaAtual;
        if(rota === 'index'){
            const proximaRota = 'exercicio';
            setProximaRota(proximaRota);
            router.push(`/training/${proximaRota}`); 
        } 
    }

    function voltarRota(){
       router.back();
    }

    return (
       <CardBig
       tempoCronometroEmSegundos={
        formatarTempoParaSegundos(treino?.tempoPreparacao)
       }
       tipoTreino="preparacao"
       title='Preparação' 
       backgroundColor={theme.colors.preparation} 
       buttonColor={theme.colors.botaoPreparation}
       irParaAproximaRota={irParaProximaRota}
       voltarRota={voltarRota}
       />
    )
}