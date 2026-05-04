import { TemposExercicio } from "./tempos";

export type Exercicio = {
  id: string;
  sigla: 'Time' | 'Rep'
  tempos: TemposExercicio
}