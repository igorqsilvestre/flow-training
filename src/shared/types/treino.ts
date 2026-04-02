import { Exercicio } from "./Exercicio";

export type Treino = {
    id: string;
    nome: string;
    listaDeExercicios: Exercicio[];
}