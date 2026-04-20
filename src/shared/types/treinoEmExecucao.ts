import { Exercicio } from "./exercicio";
import { Treino } from "./treino";

export type FaseTreino = 'preparacao' | 'execucao' | 'descanso';

export type TreinoEmExecucao = {
    treino?: Treino;

    indexExercicio: number;
    cicloAtual: number,
    fase: FaseTreino;

    iniciarTreino: (treino: Treino) => void;
    proximaFase: () => void;
    proximoExercicio: () => void;

    exercicioAtual: Exercicio | undefined;
}