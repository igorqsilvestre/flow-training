export type TempoCronometro = {
  minuto: number, 
  dezenaDosSegundos: number, 
  unidadeDosSegundos: number
}

type TempoCronometroFormatado = `${number}:${number}${number}`;

function formatarCronometro(
  minuto: number | undefined, 
  dezenaDosSegundos:number | undefined, 
  unidadeDosSegundos: number | undefined
): TempoCronometroFormatado | undefined{
  if(minuto && dezenaDosSegundos && unidadeDosSegundos){
     return `${minuto}:${dezenaDosSegundos}${unidadeDosSegundos}`
  }
}

export type Treino = {
  id: string;
  sigla: 'Time' | 'Rep'
  tempoRepeticao?: number;
  tempoCronometro?: TempoCronometro,
  tempoDescanso: TempoCronometro,
  tempoCronometroFormatado?: TempoCronometroFormatado;
  tempoDescansoFormatado?: TempoCronometroFormatado;
}


export function editarListaDeTreino(listaDeTreino: Treino[], treinoASerAtualizado: Treino){
  listaDeTreino.forEach((item) => {
    if(item.id === treinoASerAtualizado.id){
      item.sigla = treinoASerAtualizado.sigla;
      item.tempoCronometro = treinoASerAtualizado.tempoCronometro;
      item.tempoCronometroFormatado = formatarCronometro(
        treinoASerAtualizado.tempoCronometro?.minuto,
        treinoASerAtualizado.tempoCronometro?.dezenaDosSegundos,
        treinoASerAtualizado.tempoCronometro?.unidadeDosSegundos
      );
      item.tempoDescanso = treinoASerAtualizado.tempoDescanso;
      item.tempoDescansoFormatado = formatarCronometro(
        treinoASerAtualizado.tempoDescanso.minuto,
        treinoASerAtualizado.tempoDescanso.dezenaDosSegundos,
        treinoASerAtualizado.tempoDescanso.unidadeDosSegundos,
      );
      return;
    }
  });
}

export function criarListaDeTreino(
  quantidadeDeExercicios:number, 
  tempoExercicio:TempoCronometro,
  tempoDescanso:TempoCronometro
): Treino[]{
  //Criando uma lista padrão de treinos
  const lista: Treino[] = [];
  for (let index = 0; index < quantidadeDeExercicios; index++) {
    lista.push( 
      {
        id: (index + 1).toString(), 
        sigla: 'Time',
        tempoCronometro: tempoExercicio,
        tempoDescanso: tempoDescanso,
        tempoCronometroFormatado: formatarCronometro(tempoExercicio.minuto, tempoExercicio.dezenaDosSegundos, tempoExercicio.unidadeDosSegundos),
        tempoDescansoFormatado: formatarCronometro(tempoDescanso.minuto, tempoDescanso.dezenaDosSegundos, tempoDescanso.unidadeDosSegundos)
      }
    )
  }

  return lista;
}