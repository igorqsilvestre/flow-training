export type TempoCronometro = {
  minuto: number, 
  dezenaDosSegundos: number, 
  unidadeDosSegundos: number
}

type TempoCronometroFormatado = `${number}:${number}${number}`;
type TempoRepeticaoFormatada = `${number}x`

function verificaSeExercicioEstaZerado (tempoCronometro: TempoCronometro | undefined){
  if(!tempoCronometro){
    return false;
  }

  if(tempoCronometro.minuto === 0 && tempoCronometro.dezenaDosSegundos === 0 && tempoCronometro.unidadeDosSegundos === 0){
    return false;
  }

  return true;
 
}

function formatarCronometro(
  minuto: number , 
  dezenaDosSegundos:number , 
  unidadeDosSegundos: number 
): TempoCronometroFormatado {
    return `${minuto}:${dezenaDosSegundos}${unidadeDosSegundos}`
}

export type Treino = {
  id: string;
  sigla: 'Time' | 'Rep'
  tempoRepeticao?: number;
  tempoCronometro?: TempoCronometro,
  tempoDescanso: TempoCronometro,
  tempoCronometroFormatado?: TempoCronometroFormatado;
  tempoDescansoFormatado?: TempoCronometroFormatado;
  tempoRepeticaoFormatada?: TempoRepeticaoFormatada;
}


export function editarListaDeTreino(listaDeTreino: Treino[], treinoASerAtualizado: Treino){
  listaDeTreino.forEach((item) => {
    if(item.id === treinoASerAtualizado.id){
      item.sigla = treinoASerAtualizado.sigla;

      if(treinoASerAtualizado.tempoRepeticao){
        item.tempoRepeticao =  treinoASerAtualizado.tempoRepeticao;
        item.tempoRepeticaoFormatada = `${treinoASerAtualizado.tempoRepeticao}x`;
      }

      if(verificaSeExercicioEstaZerado(treinoASerAtualizado.tempoCronometro)){
        item.tempoCronometro = treinoASerAtualizado.tempoCronometro;
        item.tempoCronometroFormatado = formatarCronometro(
          treinoASerAtualizado.tempoCronometro!.minuto,
          treinoASerAtualizado.tempoCronometro!.dezenaDosSegundos,
          treinoASerAtualizado.tempoCronometro!.unidadeDosSegundos
        );
      }
      
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

  if(!verificaSeExercicioEstaZerado(tempoExercicio)){
    tempoExercicio.minuto = 0;
    tempoExercicio.dezenaDosSegundos = 4;
    tempoExercicio.unidadeDosSegundos = 5;
  }

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