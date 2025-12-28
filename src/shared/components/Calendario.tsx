import { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { theme } from "../themes/theme";

type Props = {
  datasTreino: string[]; 
};
export const Calendario = ({ datasTreino }: Props) => {
  const [datasMarcadas, setDatasMarcadas] = useState<{ [key: string]: any }>({});

 function gerarDatasMarcadas(datas: string[]) {
    const marked: any = {};

    datas.forEach(date => {
      marked[date] = {
        selected: true,
        selectedColor: theme.colors.exercise,
      };
    });

    return marked;
  }

  useEffect(() => {
    if (!datasTreino || datasTreino.length === 0) return;

    setDatasMarcadas(gerarDatasMarcadas(datasTreino));
  }, [datasTreino]);

  return (
     <View style={{ paddingHorizontal: 8 }}>
      <Calendar
        style={{ borderRadius: 10 }}
        markedDates={datasMarcadas}
        enableSwipeMonths
      />
    </View>
  );
}