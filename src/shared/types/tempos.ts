export type TempoCronometro = {
  minuto: number, 
  dezenaDosSegundos: number, 
  unidadeDosSegundos: number
}

export type TempoCronometroFormatado = `${number}:${number}${number}`;
export type TempoRepeticaoFormatada = `${number}x`