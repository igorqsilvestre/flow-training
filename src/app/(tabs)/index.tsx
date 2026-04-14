import Treino from "@/src/shared/components/Treino";
import { useTreinoStore } from "@/src/shared/store/treinoStore";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";


export default function Index() {
 const treinoId = useTreinoStore((state) => state.treinoId);
 const setTreinoId = useTreinoStore((s) => s.setTreinoId);


 useFocusEffect(
    useCallback(() => { 
      return () => { 
        setTreinoId(undefined);
      }; 
    }, []) 
  );

 return <Treino id={treinoId} />
}

