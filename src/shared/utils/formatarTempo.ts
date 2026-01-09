
type TempoFormatado = `${number}:${number}${number}`;

export function formatarTempo(
  minuto = 0,
  dezena = 0,
  unidade = 0,
  padrao: { minuto: number; dezena: number; unidade: number }
): TempoFormatado {
  const estaZerado = minuto === 0 && dezena === 0 && unidade === 0;

  const m = estaZerado ? padrao.minuto : minuto;
  const d = estaZerado ? padrao.dezena : dezena;
  const u = estaZerado ? padrao.unidade : unidade;

  return `${m}:${d}${u}`;
}