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

export function criarListaDeTreino(
  quantidade:number, 
  tempoExercicio:TempoCronometro,
  tempoDescanso:TempoCronometro
): Treino[]{
  //Criando uma lista padrão de treinos
  const lista: Treino[] = [];
  for (let index = 0; index < quantidade; index++) {
    lista.push( 
      {
        id: (index + 1).toString(), 
        tipo: {sigla: 'Time', valor: 'Time'}, 
        tempoCronometro: `${tempoExercicio.minuto}:${tempoExercicio.dezenaDosSegundos}${tempoExercicio.unidadeDosSegundos}`
        ,
        tempoDescanso: `${tempoDescanso.minuto}:${tempoDescanso.dezenaDosSegundos}${tempoDescanso.unidadeDosSegundos}`
      }
    )
  }

  return lista;
}