import { Exercicio } from "../types/exercicio";
import { TempoCronometro, TempoCronometroFormatado } from "../types/tempos";

function retornarValorPadraoParaCronometroZerado (tempoCronometro: TempoCronometro): TempoCronometro{
  if(tempoCronometro.minuto === 0 && tempoCronometro.dezenaDosSegundos === 0 && tempoCronometro.unidadeDosSegundos === 0){
    return {
      minuto: 0,
      dezenaDosSegundos: 4,
      unidadeDosSegundos: 5
    };
  }

  return tempoCronometro;
 
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

      if(exercicioASerAtualizado.tempos.tempoExercicio){
        item.tempos.tempoRepeticao = undefined;
        item.tempos.tempoExercicio = retornarValorPadraoParaCronometroZerado(exercicioASerAtualizado.tempos.tempoExercicio);
      }else{
        item.tempos.tempoExercicio = undefined;
        item.tempos.tempoRepeticao =  exercicioASerAtualizado.tempos.tempoRepeticao === 0 ? 10 : exercicioASerAtualizado.tempos.tempoRepeticao;
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

  if(quantidadeDeExercicios === 0){
    quantidadeDeExercicios = 4;
  }

  if(tempoExercicio){
    tempoRepeticao = undefined;
    tempoExercicio = retornarValorPadraoParaCronometroZerado(tempoExercicio);
    
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