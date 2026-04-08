import { theme } from '@/src/shared/themes/theme';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { checkNomeExists, criarTreino, updateTreino } from '../services/treinoStorage';
import { Exercicio } from '../types/exercicio';
import { TempoCronometro } from '../types/tempos';


type Props = {
  treino: {
    tempoPreparacao?: TempoCronometro,
    tempoCiclos?: number,
    listaDeExercicios?: Exercicio[],
    id: string | undefined
  },
  visible: boolean;
  onClose: () => void;
};
export function ModalGravarTreino({ treino, visible, onClose }: Props){
    const [nome, setNome] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const  router = useRouter();
    

    useEffect(() => {
       controlarTecladoDigitacaoParaInput();
    }, []);

    function controlarTecladoDigitacaoParaInput(){
         //Controlando o teclado do celular para abrir e fechar
        const show = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardOpen(true);
        });

        const hide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOpen(false);
        });

        return () => {
            show.remove();
            hide.remove();
        };
    }

    async function onSalvar(){

        if(!nome || nome.trim() === ''){
            setErrorMessage('Não pode estar vazio !');
            return;
        }

        if(nome.length > 30){
            setErrorMessage('Tamanho maior que 30 caracteres !');
            return;
        }

        if(await checkNomeExists(nome)){
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
    <Modal  visible={visible} transparent animationType="fade" statusBarTranslucent>
        <View style={[
             styles.overlay,
            {
                justifyContent: keyboardOpen ? 'flex-end' : 'center',
                paddingBottom: keyboardOpen ? 20 : 0,
            }
        ]}>
            <View style={styles.modal}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{treino.id ? 'Editar treino' : 'Gravar Treino'}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={{
                    ...styles.input,
                    borderColor: errorMessage ? '#ff4d4f' : '#000000'
                    }}
                    onChangeText={setNome}
                    value={nome}
                />
                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
                
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerAction} onPress={onClose}>
                    <Text style={styles.footerTitle}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerAction} onPress={onSalvar}>
                    <Text style={styles.footerTitle}>{treino.id ? 'Atualizar': 'Salvar'}</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    </Modal>    
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
    modal: {
        borderRadius: 10,
        width: '95%',
        backgroundColor: "#fff",
        alignItems: 'center',
        overflow: 'hidden',
        gap: 30
      },
    header: {
        backgroundColor: theme.colors.header,
        width: '100%',
        padding: 10
      },
    headerTitle: {
        textAlign: 'center',
        fontFamily: theme.fonts.family.bold,
        fontSize: theme.fonts.sizes.medium
    },
    content: {
        marginVertical: 8,
        width: '90%',
    },
    input: {
        marginVertical: 2,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.body,
    },
    label: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.body,
    },
     error: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.small,
        color: theme.colors.wrong
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    footerTitle: {
        textAlign: 'center',
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.medium
    },
    footerAction: {
        paddingVertical: 8,
        width: '25%',
        marginBottom: 4,
        borderRadius: 10,
        backgroundColor: theme.colors.header
    },
   
});