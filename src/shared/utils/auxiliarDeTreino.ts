import { Exercicio } from "../types/exercicio";
import { TempoCronometro, TempoCronometroFormatado } from "../types/tempos";

function verificaSeExercicioEstaZerado (tempoCronometro: TempoCronometro | undefined){
  if(!tempoCronometro){
    return false;
  }

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
      item.tempoDescanso = exercicioASerAtualizado.tempoDescanso;

      if(exercicioASerAtualizado.tempoRepeticao){
        item.tempoRepeticao =  exercicioASerAtualizado.tempoRepeticao;
        item.tempoCronometro = undefined;
        return;
      }

      if(verificaSeExercicioEstaZerado(exercicioASerAtualizado.tempoCronometro)){
        item.tempoCronometro = exercicioASerAtualizado.tempoCronometro;
        item.tempoRepeticao = undefined;
        return;
      }
      
      return;
    }
  });
  return listaDeExercicios;
}


export function criarListaDeExerciciosDeTempoCronometro(
  quantidadeDeExercicios:number, 
  tempoExercicio:TempoCronometro,
  tempoDescanso:TempoCronometro
): Exercicio[]{

  if(!verificaSeExercicioEstaZerado(tempoExercicio)){
    tempoExercicio.minuto = 0;
    tempoExercicio.dezenaDosSegundos = 4;
    tempoExercicio.unidadeDosSegundos = 5;
  }

  //Criando uma lista padrão de exercícios
  const lista: Exercicio[] = [];
  for (let index = 0; index < quantidadeDeExercicios; index++) {
    lista.push( 
      {
        id: (index + 1).toString(), 
        sigla: 'Time',
        tempoCronometro: tempoExercicio,
        tempoDescanso: tempoDescanso,
      }
    )
  }

  return lista;
}