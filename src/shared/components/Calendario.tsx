import { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { theme } from "../themes/theme";
import { DatasTreino } from "../types/datasTreino";

type Props = {
  datasTreino: DatasTreino;
};
export const Calendario = ({ datasTreino }: Props) => {
  const [datasMarcadas, setDatasMarcadas] = useState<{ [key: string]: any }>({});

 function gerarDatasMarcadas(datas: DatasTreino) {
    const marked: any = {};

    Object.keys(datas).forEach(date => {
      if (datas[date]) {
        marked[date] = {
          selected: true,
          selectedColor: theme.colors.exercise,
        };
      }
    });

    return marked;
  }

  useEffect(() => {
    if (!datasTreino || Object.keys(datasTreino).length === 0) return;

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