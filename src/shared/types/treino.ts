import { Exercicio } from "./exercicio";
import { TempoCronometro } from "./tempos";

export type Treino = {
    id?: string;
    nome: string;
    tempoPreparacao?: TempoCronometro,
    tempoCiclos?: number,
    listaDeExercicios: Exercicio[];
}