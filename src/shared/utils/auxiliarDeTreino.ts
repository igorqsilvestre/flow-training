
type TempoFormatado = `${number}:${number}${number}`;

type TempoCronometro = {
  minuto: number, 
  dezenaDosSegundos: number, 
  unidadeDosSegundos: number
}

type TempoCronometroFormatado = `${number}:${number}${number}`;

type Treino = {
  id: string;
  tipo : {
    sigla: 'Rep' | 'Time',
    valor: 'Repetição' | 'Time'
  };
  tempoCronometro?: TempoCronometroFormatado;
  tempoDescanso?: TempoCronometroFormatado;
  tempoRepeticao?: number;
}

function formatarTempo(
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

export function criarListaDeTreinoPadrao(
  quantidade:number, 
  tempoExercicio?:TempoCronometro,
  tempoDescanso?:TempoCronometro
): Treino[]{

  //Criando uma lista padrão de treinos
  const lista: Treino[] = [];
  for (let index = 0; index < quantidade; index++) {
    lista.push( 
      {
        id: (index + 1).toString(), 
        tipo: {sigla: 'Time', valor: 'Time'}, 
        tempoCronometro: formatarTempo(
          tempoExercicio?.minuto,
          tempoExercicio?.dezenaDosSegundos,
          tempoExercicio?.unidadeDosSegundos,
          { minuto: 0, dezena: 4, unidade: 5 } // padrão 00:45
        ),
        tempoDescanso: formatarTempo(
          tempoDescanso?.minuto,
          tempoDescanso?.dezenaDosSegundos,
          tempoDescanso?.unidadeDosSegundos,
          { minuto: 0, dezena: 1, unidade: 5 } // padrão 00:15
        ),
      }
    )
  }

  return lista;
}