import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { checkNomeExists, criarTreino, updateTreino } from '../services/treinoStorage';
import { modalStyles } from '../styles/modalStyles';
import { Exercicio } from '../types/exercicio';
import { TempoCronometro } from '../types/tempos';

type TreinoWithoutId = {
    id?: string;
    nome: string;
    tempoPreparacao: TempoCronometro,
    tempoCiclos: number,
    listaDeExercicios: Exercicio[];
}

type Props = {
  treino: TreinoWithoutId,
  visible: boolean;
  onClose: () => void;
};
export function ModalGravarTreino({ treino, visible, onClose }: Props){
    const [nome, setNome] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    useEffect(() => {
       setNome(treino.nome);
    }, [treino]);
 

    async function onSalvar(){

        if(!nome || nome.trim() === ''){
            setErrorMessage('Não pode estar vazio !');
            return;
        }

        if(nome.length > 30){
            setErrorMessage('Tamanho maior que 30 caracteres !');
            return;
        }

        if(await checkNomeExists(nome, treino.id)){
            setErrorMessage('Nome de treino já existe !');
            return;
        }


       if(treino.listaDeExercicios && treino.tempoCiclos !== undefined && treino.tempoCiclos !== null && treino.tempoPreparacao){
            if(treino.id){
                await updateTreino({
                    id: treino.id,
                    listaDeExercicios: treino.listaDeExercicios,
                    nome,
                    tempoCiclos: treino.tempoCiclos,
                    tempoPreparacao: treino.tempoPreparacao
                })
            }else{
                await criarTreino({
                    id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
                    nome,
                    tempoPreparacao: treino.tempoPreparacao,
                    tempoCiclos: treino.tempoCiclos,
                    listaDeExercicios: treino.listaDeExercicios
                });
            }
        }
        
        router.push('/meusTreinos');
        setErrorMessage('');
        onClose();
    }

    return (
    <Modal  
        visible={visible} 
        transparent 
        animationType="fade" 
        statusBarTranslucent
    >
        <View style={modalStyles.overlay}>
            <View style={modalStyles.modal}>
                <View style={modalStyles.header}>
                    <Text style={modalStyles.headerTitle}>{treino.id ? 'Editar treino' : 'Gravar Treino'}</Text>
                </View>
                <View style={modalStyles.content}>
                    <Text style={modalStyles.label}>Nome</Text>
                    <TextInput
                        style={{
                        ...modalStyles.input,
                        borderColor: errorMessage ? '#ff4d4f' : '#000000'
                        }}
                        onChangeText={setNome}
                        value={nome}
                    />
                    {errorMessage && <Text style={modalStyles.error}>{errorMessage}</Text>}
                </View>
                    
                <View style={modalStyles.footer}>
                    <TouchableOpacity style={modalStyles.footerAction} onPress={onClose}>
                        <Text style={modalStyles.footerTitle}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={modalStyles.footerAction} onPress={onSalvar}>
                        <Text style={modalStyles.footerTitle}>{treino.id ? 'Atualizar': 'Salvar'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>    
    )
}

