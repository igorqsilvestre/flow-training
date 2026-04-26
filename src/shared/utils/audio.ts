import { Audio } from 'expo-av';

export async function playSound(requirePath: any) {
  const { sound } = await Audio.Sound.createAsync(requirePath);
  await sound.playAsync();

  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      sound.unloadAsync();
    }
  });
}