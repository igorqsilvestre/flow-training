import { StyleSheet, Text, View } from "react-native";
import { theme } from "../themes/theme";

const dias = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

type Props = {
  datasTreino: string[]; 
};

export const DiasDaSemanaRadio = ({ datasTreino }: Props) => {
  const inicio = inicioDaSemana();
  const fim = fimDaSemana();

  const diasAtivos = new Set<number>();

  datasTreino.forEach(dataStr => {
    const data = criarDataLocal(dataStr);

    if (data >= inicio && data <= fim) {
    const indice = getIndiceSemanaSegunda(data);
    diasAtivos.add(indice);
    }
  });

  return (
    <View style={styles.container}>
      {dias.map((dia, index) => (
        <View key={index} style={styles.coluna}>
          <Text style={styles.label}>{dia}</Text>

          <View style={styles.radioFora}>
            {diasAtivos.has(index) && <View style={styles.radioDentro} />}
          </View>
        </View>
      ))}
    </View>
  );
    
}

// auxiliares
function criarDataLocal(dataStr: string) {
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

function inicioDaSemana(data = new Date()) {
  const d = new Date(data);
  d.setHours(0, 0, 0, 0);

  const dia = d.getDay();
  const diff = dia === 0 ? -6 : 1 - dia;
  d.setDate(d.getDate() + diff);

  return d;
}

function fimDaSemana(data = new Date()) {
  const d = inicioDaSemana(data);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

function getIndiceSemanaSegunda(data: Date) {
  const dia = data.getDay();
  return dia === 0 ? 6 : dia - 1;
}

// =========================
// Estilos
// =========================
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20
  },
  coluna: {
    alignItems: 'center'
  },
  label: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.white
  },
  radioFora: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDentro: {
    width: 12,
    height: 12,
    borderRadius: 7,
    backgroundColor:  theme.colors.white,
  }
})