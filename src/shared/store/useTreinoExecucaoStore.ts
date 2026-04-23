import { create } from "zustand";
import { TreinoEmExecucao } from "../types/treinoEmExecucao";

export const useTreinoExecucaoStore = create<TreinoEmExecucao>((set) => ({
    treino: undefined,
    indexExercicio: 0,
    cicloAtual: 0,
    rotaAtual: 'index',

    iniciarTreino: (treino) => 
        set({
            treino,
            indexExercicio: 0,
            cicloAtual: 0,
            rotaAtual: 'index'
        }),

    setProximaRota: (rota) => set({ rotaAtual: rota }),
    setTreino: (treino) => set({treino: treino}),
    setIndex: (index) => set({indexExercicio: index}),
    setCicloAtual: (ciclo) => set({ cicloAtual: ciclo }),
}))



