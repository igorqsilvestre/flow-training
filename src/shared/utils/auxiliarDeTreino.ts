import { Exercicio } from "../types/Exercicio";
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

function formatarCronometro(
  minuto: number , 
  dezenaDosSegundos:number , 
  unidadeDosSegundos: number 
): TempoCronometroFormatado {
    return `${minuto}:${dezenaDosSegundos}${unidadeDosSegundos}`
}


export function editarListaDeExercicios(listaDeExercicios: Exercicio[], exercicioASerAtualizado: Exercicio){
  listaDeExercicios.forEach((item) => {
    if(item.id === exercicioASerAtualizado.id){
      item.sigla = exercicioASerAtualizado.sigla;

      if(exercicioASerAtualizado.tempoRepeticao){
        item.tempoRepeticao =  exercicioASerAtualizado.tempoRepeticao;
        item.tempoRepeticaoFormatada = `${exercicioASerAtualizado.tempoRepeticao}x`;
      }

      if(verificaSeExercicioEstaZerado(exercicioASerAtualizado.tempoCronometro)){
        item.tempoCronometro = exercicioASerAtualizado.tempoCronometro;
        item.tempoCronometroFormatado = formatarCronometro(
          exercicioASerAtualizado.tempoCronometro!.minuto,
          exercicioASerAtualizado.tempoCronometro!.dezenaDosSegundos,
          exercicioASerAtualizado.tempoCronometro!.unidadeDosSegundos
        );
      }
      
      item.tempoDescanso = exercicioASerAtualizado.tempoDescanso;
      item.tempoDescansoFormatado = formatarCronometro(
        exercicioASerAtualizado.tempoDescanso.minuto,
        exercicioASerAtualizado.tempoDescanso.dezenaDosSegundos,
        exercicioASerAtualizado.tempoDescanso.unidadeDosSegundos,
      );
      return;
    }
  });
}

export function criarListaDeExercicios(
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
        tempoCronometroFormatado: formatarCronometro(tempoExercicio.minuto, tempoExercicio.dezenaDosSegundos, tempoExercicio.unidadeDosSegundos),
        tempoDescansoFormatado: formatarCronometro(tempoDescanso.minuto, tempoDescanso.dezenaDosSegundos, tempoDescanso.unidadeDosSegundos)
      }
    )
  }

  return lista;
}