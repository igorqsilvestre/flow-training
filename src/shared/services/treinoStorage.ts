import AsyncStorage from '@react-native-async-storage/async-storage';
import { Treino } from '../types/treino';

const KEY = '@treinos';

async function saveTreinos(treinos: Treino[]){
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(treinos));
    } catch (error) {
        console.log(error);
    }
}

export async function getTreinos() {
    try {
       const data = await AsyncStorage.getItem(KEY);
       if(!data) return [];

       return JSON.parse(data) as Treino[];

    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getTreino(id:string) {
    try {
       const data = await AsyncStorage.getItem(KEY);
       if(!data) return null;

       const treinos = JSON.parse(data) as Treino[];

       const treino = treinos.find(t => t.id === id);
       return treino ?? null;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function checkNomeExists(nome: string){
    try {
        const data = await AsyncStorage.getItem(KEY);
        if(!data) return false;

        const listaDeTreinos = JSON.parse(data) as Treino[];

        return listaDeTreinos.some(t =>
            t.nome.toUpperCase().trim() === nome.toUpperCase().trim()
        );

    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function criarTreino(treino: Treino){
    const treinos = await getTreinos();

    const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);

    const novaLista = [...treinos, {
        ...treino,
        id,
    }]; 

    await saveTreinos(novaLista);
}


export async function updateTreino(treino: Treino){
    const treinos = await getTreinos();

    const novaLista = treinos.map((t: Treino) => 
        t.id === treino.id ? {...t, ...treino} : t
    );

    await saveTreinos(novaLista);
}

export async function deleteTreino(id: string){
    const treinos = await getTreinos();
    const novaLista = treinos?.filter((t: Treino) => t.id !== id);

    await saveTreinos(novaLista);
}
