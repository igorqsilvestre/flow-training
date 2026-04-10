import { TempoCronometro } from "./tempos";

export type Exercicio = {
  id: string;
  sigla: 'Time' | 'Rep'
  tempoRepeticao?: number;
  tempoCronometro?: TempoCronometro,
  tempoDescanso: TempoCronometro,
}