import { TempoCronometro } from "../types/tempos";

export function formatarTempoParaSegundos(tempo?: TempoCronometro) {
  if (!tempo) return 0;

  const segundos = tempo.dezenaDosSegundos * 10 + tempo.unidadeDosSegundos;

  return tempo.minuto * 60 + segundos;
}

/* function segundosParaTempo(segundos: number): TempoCronometro {
  const minuto = Math.floor(segundos / 60);
  const resto = segundos % 60;

  return {
    minuto,
    dezenaDosSegundos: Math.floor(resto / 10),
    unidadeDosSegundos: resto % 10,
  };
} */

export function formatarSegundosParaTexto(segundos: number) {
  const min = Math.floor(segundos / 60);
  const sec = segundos % 60;

  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

