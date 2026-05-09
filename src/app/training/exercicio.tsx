import { useKeepAwake } from "expo-keep-awake";
import { router } from "expo-router";

import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { formatarTempoParaSegundos } from "@/src/shared/utils/auxiliarTreinoEmExecucao";



export default function Exercicio() {
     useKeepAwake();

     const useStore = useTreinoExecucaoStore();
     const exercicioAtual = useStore.treino?.listaDeExercicios?.[useStore.indexExercicio];

     function irParaProximaRota(){

        if(useStore.rotaAtual === 'exercicio'){
            if( 
            useStore.treino?.listaDeExercicios.length &&
            useStore.indexExercicio === (useStore.treino?.listaDeExercicios.length - 1) &&
            useStore.cicloAtual === 0
            ){
                const rota = 'finalizado';
                useStore.setTreino(undefined);

                useStore.setProximaRota(rota);
                router.replace(`/training/${rota}`)
                return;
            }

            const rota = 'descanso';
            useStore.setProximaRota(rota);
            router.push(`/training/${rota}`);  
        }
     }

    function voltarRota(){

        if(useStore.rotaAtual === 'exercicio'){
            if(useStore.indexExercicio === 0 && useStore.cicloAtual === 0){
                const rota = 'index';
                useStore.setProximaRota(rota);
            }
            else if(useStore.indexExercicio === 0 && useStore.cicloAtual > 0){
                const rota = 'descanso';
                useStore.setProximaRota(rota);
                useStore.setIndex(useStore.indexExercicio + 1);
                useStore.setCicloAtual(useStore.cicloAtual - 1);
            }
            else {
                const rota = 'descanso';
                useStore.setProximaRota(rota);
                useStore.setIndex(useStore.indexExercicio - 1);
            }
            router.back();
        }
    }

    return (
        <CardBig
            tipoTreino="execucao"
            title={`Exercicio ${useStore.indexExercicio + 1}º`}
            quantidadeDeExercicios={`${useStore.indexExercicio + 1}/${useStore.treino?.listaDeExercicios.length}`}
            backgroundColor={theme.colors.exercise}
            buttonColor={theme.colors.botaoExercise}
            irParaAproximaRota={irParaProximaRota}
            voltarRota={voltarRota}
            tempoCronometroEmSegundos={exercicioAtual?.tempos.tempoExercicio 
                ? formatarTempoParaSegundos(exercicioAtual?.tempos.tempoExercicio)
                : undefined
                }
            tempoRepeticao={exercicioAtual?.tempos.tempoRepeticao}
        />
        
    )
}