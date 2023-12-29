// App.js
import * as React from "react";
import { LogBox } from "react-native";
import * as Font from 'expo-font';

import * as SplashScreen from "expo-splash-screen";
import RootApp from "./src/navigation/RootApp";
import LoadScreen from "./src/screens/LoadScreen";

const App = () => {
  /** Ignore Yellow Box Warning */
  LogBox.ignoreAllLogs();

  let fontsLoaded = Font.loadAsync({
    'Montserrat': require('./assets/fonts/Montserrat.ttf'),
    // Agrega otras fuentes personalizadas según sea necesario
  });

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

  React.useEffect(() => {
    prepareApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <LoadScreen />;
  }

  return <RootApp />;
};

export default App;
