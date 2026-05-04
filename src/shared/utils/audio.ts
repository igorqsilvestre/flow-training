import { useAudioPlayer } from 'expo-audio';

export function usePlaySound(requirePath: any) {
  const player = useAudioPlayer(requirePath);

  const play = () => {
    player.seekTo(0);
    player.play();
  };

  return { play };
}