import { CardBig } from "@/src/shared/components/CardBig";
import { theme } from "@/src/shared/themes/theme";

export default function Exercicio() {
    return (
        <CardBig
            modoExercicio={{
                quantidadeTotal: 5
            }}
            modoRepeticao={{
                usarModoRepeticao: false,
            }}
            modoContagem={{
                usarModoContagem: true,
                tempoContagem: '00:45'
            }}
            title="Exercício 1º"
            backgroundColor={theme.colors.exercise}
            buttonColor={theme.colors.botaoExercise}
            proximaRota={{pathname: '/training/descanso'}}
        />
    )
}