export type TempoCronometro = {
  minuto: number, 
  dezenaDosSegundos: number, 
  unidadeDosSegundos: number
}

export type TemposExercicio = {
    tempoDescanso: TempoCronometro,
    tempoExercicio?: TempoCronometro,
    tempoRepeticao?: number
}

export type TempoCronometroFormatado = `${number}:${number}${number}`;
export type TempoRepeticaoFormatada = `${number}x`