import { TempoCronometro, TempoCronometroFormatado, TempoRepeticaoFormatada } from "./tempos";

export type Exercicio = {
  id: string;
  sigla: 'Time' | 'Rep'
  tempoRepeticao?: number;
  tempoCronometro?: TempoCronometro,
  tempoDescanso: TempoCronometro,
  tempoCronometroFormatado?: TempoCronometroFormatado;
  tempoDescansoFormatado?: TempoCronometroFormatado;
  tempoRepeticaoFormatada?: TempoRepeticaoFormatada;
}