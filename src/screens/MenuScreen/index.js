import React, { useEffect, useState } from "react";

import {
  View,
  BackHandler,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from "react-native";

import { Text } from "native-base";

import { useFocusEffect } from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Translations */
import TranslateText from "../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import HeaderMenuComponent from "../../components/molecules/HeaderMenu";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const MenuScreen = ({ navigation }) => {
  const [salirApp, setSalirapp] = useState(false);
  const [userApp, setUserapp] = useState("");
  const [userToken, setUserToken] = useState(false);
  const [loading, setLoading] = React.useState(false);

  // Language
  const [lang, setLang] = useState(GlobalVars.defaultLang);

  useEffect(() => {
    /** Recover Language */
    getLang();

    /** Recover user data */
    recoveringDataUsaer();

    // clearAll();

    /** Android return back */
    const backAction = () => {
      CloseScreen();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      /** Android return back */
      const backAction = () => {
        CloseScreen();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [])
  );

  const CloseScreen = () => {
    navigation.goBack();
  };

  const recoveringDataUsaer = async () => {
    try {
      const usernametoapp = JSON.parse(
        await AsyncStorage.getItem("currentUserShowName")
      );
      const usertokentoapp = JSON.parse(
        await AsyncStorage.getItem("currentToken")
      );
      setUserapp(usernametoapp);
      setUserToken(usertokentoapp);
    } catch (e) {
      console.log("Error recovering");
      null;
    }
  };

  const getLang = async () => {
    try {
      const language = JSON.parse(await AsyncStorage.getItem("currentLang"));
      // console.log( {language} );
      if (language) {
        setLang(language);
      }
    } catch (e) {
      //   console.log(e);
      null;
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
      // console.error();
    }
  };

  const redirectToProduct = (id) => {
    setearModalSearch();
    navigation.navigate("Product", { itemProduct: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHome}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.titleWishProduct}>
            {TranslateText(lang, "Menu")}
          </Text>
          {loading && (
            <ActivityIndicator
              style={{ alignSelf: "center", marginVertical: 30 }}
              size="large"
              color={GlobalVars.firstColor}
            />
          )}
          {userToken && (
            <HeaderMenuComponent
              Component
              navigation={navigation}
              lang={lang}
              userToken={userToken}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;
