import * as React from "react";

import { LogBox } from "react-native";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

import RootApp from "./src/navigation/RootApp";
import LoadScreen from "./src/screens/LoadScreen";

const App = () => {
  /** Ignore Yellow Box Warning */
  LogBox.ignoreAllLogs();

  let [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat.ttf"),
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
