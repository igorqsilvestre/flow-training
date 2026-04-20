import { CardBig } from "@/src/shared/components/CardBig";
import { theme } from "@/src/shared/themes/theme";

export default function Descanso() {
     return (
        <CardBig
        modoContagem={{
            usarModoContagem: true,
            tempoContagem: '00:15'
        }}
        modoRepeticao={{
            usarModoRepeticao: false
        }}
        modoDescanso={true}
        title='Descanso' 
        backgroundColor={theme.colors.cycles} 
        buttonColor={theme.colors.botaoDescanso}
        proximaRota={{pathname: '/training/exercicio'}}
        />
    )
}