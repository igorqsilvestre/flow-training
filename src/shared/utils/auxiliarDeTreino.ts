import { Exercicio } from "../types/exercicio";
import { TempoCronometro, TempoCronometroFormatado } from "../types/tempos";

function verificaSeExercicioEstaZerado (tempoCronometro: TempoCronometro){
  if(tempoCronometro.minuto === 0 && tempoCronometro.dezenaDosSegundos === 0 && tempoCronometro.unidadeDosSegundos === 0){
    return false;
  }

  return true;
 
}

export function formatarCronometro({
  minuto,
  dezenaDosSegundos,
  unidadeDosSegundos
}: {
  minuto: number;
  dezenaDosSegundos: number;
  unidadeDosSegundos: number;
}): TempoCronometroFormatado {
  return `${minuto}:${dezenaDosSegundos}${unidadeDosSegundos}`
}


export function editarListaDeExercicios(listaDeExercicios: Exercicio[], exercicioASerAtualizado: Exercicio){
  listaDeExercicios.forEach((item) => {
    if(item.id === exercicioASerAtualizado.id){
      item.sigla = exercicioASerAtualizado.sigla;
      item.tempos.tempoDescanso = exercicioASerAtualizado.tempos.tempoDescanso;

      if(exercicioASerAtualizado.tempos.tempoRepeticao){
        item.tempos.tempoRepeticao =  exercicioASerAtualizado.tempos.tempoRepeticao;
        item.tempos.tempoExercicio = undefined;
        return;
      }

      if(exercicioASerAtualizado.tempos.tempoExercicio && verificaSeExercicioEstaZerado(exercicioASerAtualizado.tempos.tempoExercicio)){
        item.tempos.tempoExercicio = exercicioASerAtualizado.tempos.tempoExercicio;
        item.tempos.tempoRepeticao = undefined;
        return;
      }
      
      return;
    }
  });
  return listaDeExercicios;
}


export function criarListaDeExerciciosDeTempoCronometro(
  quantidadeDeExercicios:number, 
  sigla: 'Time' | 'Rep',
  tempoDescanso:TempoCronometro,
  tempoExercicio?: TempoCronometro,
  tempoRepeticao?: number
): Exercicio[]{

  if(tempoExercicio){
    tempoRepeticao = undefined;

    if(!verificaSeExercicioEstaZerado(tempoExercicio)){
      tempoExercicio.minuto = 0;
      tempoExercicio.dezenaDosSegundos = 4;
      tempoExercicio.unidadeDosSegundos = 5;
    }
  }else {
    tempoExercicio = undefined;

    if(tempoRepeticao === 0) tempoRepeticao = 10;
  }

  //Criando uma lista padrão de exercícios
  const lista: Exercicio[] = [];
  for (let index = 0; index < quantidadeDeExercicios; index++) {
    lista.push( 
      {
        id: (index + 1).toString(), 
        sigla,
        tempos: {
          tempoExercicio,
          tempoRepeticao,
          tempoDescanso,
        }
      }
    )
  }

  return lista;
}