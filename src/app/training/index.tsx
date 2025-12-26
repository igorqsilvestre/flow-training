import { CardBig } from "@/src/shared/components/CardBig";
import { theme } from "@/src/shared/themes/theme";

export default function Index() {
    return (
       <CardBig
       modoContagem={{
        usarModoContagem: true
       }}
       modoRepeticao={{
        usarModoRepeticao: false
       }}
       title='Preparação' 
       backgroundColor={theme.colors.preparation} 
       buttonColor={theme.colors.botaoPreparation}
       proximaRota={{pathname: '/training/exercicio'}}
       />
    )
}
