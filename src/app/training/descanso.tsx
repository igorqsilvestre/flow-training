import { useKeepAwake } from "expo-keep-awake";
import { router } from "expo-router";

import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { formatarTempoParaSegundos } from "@/src/shared/utils/auxiliarTreinoEmExecucao";


export default function Descanso() {
    useKeepAwake();

    const useStore = useTreinoExecucaoStore();
    const exercicioAtual = useStore.treino?.listaDeExercicios?.[useStore.indexExercicio];
    
    function irParaProximaRota(){
        if(useStore.rotaAtual === 'descanso'){
            if(useStore.treino){
                const ultimoExercicio = useStore.indexExercicio >= useStore.treino?.listaDeExercicios?.length - 1;
                const ultimoCiclo = useStore.cicloAtual >= useStore.treino.tempoCiclos;

                if(!ultimoExercicio){
                    const proximaRota = 'exercicio';
                    useStore.setIndex(useStore.indexExercicio + 1);
                    useStore.setProximaRota(proximaRota);
                    router.push(`/training/${proximaRota}`); 
                }else if (!ultimoCiclo){
                    const proximaRota = 'exercicio';
                    useStore.setIndex(0);
                    useStore.setCicloAtual(useStore.cicloAtual + 1);
                    useStore.setProximaRota(proximaRota);
                    router.push(`/training/${proximaRota}`);  
                }else{
                    const proximaRota = 'finalizado'
                    useStore.setTreino(undefined);
                    useStore.setProximaRota(proximaRota);
                    router.replace(`/training/${proximaRota}`); 
                }
            }
        }
    }

   function voltarRota(){
        if(useStore.rotaAtual === 'descanso'){
            const rota = 'exercicio';
            useStore.setProximaRota(rota);
            router.back();
        }
    }

    return (
        <CardBig
            tipoTreino="descanso"
            tempoCronometroEmSegundos={
                formatarTempoParaSegundos(exercicioAtual?.tempos.tempoDescanso)
            }
            title='Descanso' 
            quantidadeDeExercicios={`${useStore.indexExercicio + 1}/${useStore.treino?.listaDeExercicios.length}`}
            backgroundColor={theme.colors.cycles} 
            buttonColor={theme.colors.botaoDescanso}
            irParaAproximaRota={irParaProximaRota}
            voltarRota={voltarRota}
        />
    )
}