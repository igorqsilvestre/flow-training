import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = '@treinosDate';


export async function salvarDataConcluida(data: string) {
  try {
    const datas = await getDatas();

    if (datas[data]) return; 

    datas[data] = true;

    await AsyncStorage.setItem(KEY, JSON.stringify(datas));
  } catch (error) {
    console.error(error);
  }
}

export async function buscarDatas() {
  return await getDatas();
}

async function getDatas() {
  try {
    const dados = await AsyncStorage.getItem(KEY);
    return dados ? JSON.parse(dados) : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}
