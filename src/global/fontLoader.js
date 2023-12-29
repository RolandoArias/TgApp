import * as Font from 'expo-font';

const useLoadFonts = () => {
  Font.loadAsync({
    'Montserrat': require('../../assets/fonts/Montserrat.ttf'),
    // Agrega otras fuentes personalizadas según sea necesario
  });
};

export default useLoadFonts;
