import { CardBig } from "@/src/shared/components/CardBig";
import { useTreinoExecucaoStore } from "@/src/shared/store/useTreinoExecucaoStore";
import { theme } from "@/src/shared/themes/theme";
import { formatarTempoParaSegundos } from "@/src/shared/utils/auxiliarTreinoEmExecucao";
import { router } from "expo-router";

export default function Exercicio() {

     const {
        treino, 
        indexExercicio, 
        rotaAtual, 
        setProximaRota, 
        setIndex,
        cicloAtual,
        setCicloAtual
    } = useTreinoExecucaoStore();
     const exercicioAtual = treino?.listaDeExercicios?.[indexExercicio];

     function irParaProximaRota(){
        if(rotaAtual === 'exercicio'){
            const rota = 'descanso';
            setProximaRota(rota);
            router.push(`/training/${rota}`); 
        }
     }

    function voltarRota(){
        if(rotaAtual === 'exercicio'){
            if(indexExercicio === 0 && cicloAtual === 0){
                const rota = 'index';
                setProximaRota(rota);
            }
            else if(indexExercicio === 0 && cicloAtual > 0){
                const rota = 'descanso';
                setProximaRota(rota);
                setIndex(indexExercicio + 1);
                setCicloAtual(cicloAtual - 1);
            }
            else {
                const rota = 'descanso';
                setProximaRota(rota);
                setIndex(indexExercicio - 1);
            }
            router.back();
        }
    }

    return (
        <CardBig
            tipoTreino="execucao"
            title={`Exercicio ${indexExercicio + 1}º`}
            backgroundColor={theme.colors.exercise}
            buttonColor={theme.colors.botaoExercise}
            irParaAproximaRota={irParaProximaRota}
            voltarRota={voltarRota}
            tempoCronometroEmSegundos={exercicioAtual?.tempoCronometro 
                ? formatarTempoParaSegundos(exercicioAtual?.tempoCronometro)
                : undefined
                }
            tempoRepeticao={exercicioAtual?.tempoRepeticao}
        />
        
    )
}