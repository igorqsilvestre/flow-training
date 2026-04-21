import { create } from "zustand";
import { TreinoEmExecucao } from "../types/treinoEmExecucao";

export const useTreinoExecucaoStore = create<TreinoEmExecucao>((set,get) => ({
    treino: undefined,
    indexExercicio: 0,
    cicloAtual: 1,
    fase: 'preparacao',

    iniciarTreino: (treino) => 
        set({
            treino,
            indexExercicio: 0,
            cicloAtual: 1,
            fase: 'preparacao'
        }),

    proximaFase: () => {
        const { fase } = get();

        if(fase === 'preparacao') set({ fase: 'execucao' });
        else if (fase === 'execucao') set({ fase: 'descanso' })
        else if (fase === 'descanso') {
            get().proximoExercicio();
        }
    },

    proximoExercicio: () => {
        const { indexExercicio, treino  } = get();

        if(!treino) return;

        const ultimoExercicio = 
            indexExercicio >= treino.listaDeExercicios.length - 1;
        
        if(!ultimoExercicio) {
            set({
                indexExercicio: indexExercicio + 1,
                fase: 'preparacao'
            });
        } else {
            //treino acabou
            set({ treino: undefined });
        }
    },

    get exercicioAtual() {
        const { treino, indexExercicio } = get();

        return treino?.listaDeExercicios[indexExercicio];
    }
}))



