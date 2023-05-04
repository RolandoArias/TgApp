import * as React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';


import RootApp from './src/navigation/RootApp';

const App = () => {
  /** Ignore Yellow Box Warning */
  LogBox.ignoreAllLogs();

  let [fontsLoaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat.ttf'),
  });

  React.useEffect(() => {
    async function prepareApp() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    }

    prepareApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
        <StatusBar hidden />
        <RootApp />
    </>
  );
};

export default App;
