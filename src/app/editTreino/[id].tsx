import Treino from "@/src/shared/components/Treino";
import { useLocalSearchParams } from "expo-router";

export default function EditTreino() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Treino id={id} />
}