import { Treino } from "./treino";

export type RotaTreino = 'index' | 'exercicio' | 'descanso' | 'finalizado';

export type TreinoEmExecucao = {
    treino?: Treino;

    indexExercicio: number;
    cicloAtual: number,
    rotaAtual: RotaTreino;

    iniciarTreino: (treino: Treino) => void;
    setProximaRota: (rota: RotaTreino) => void;
    setTreino: (treino: Treino | undefined) => void;
    setIndex: (index: number) => void;
    setCicloAtual: (ciclo: number) => void;
}