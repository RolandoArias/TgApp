import React, { useEffect, useState } from "react";

import {
  View,
  BackHandler,
  SafeAreaView,
  Animated,
  ScrollView,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import ProductsWish from "../../components/organisms/ProductsWish";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const WishScreen = ({ navigation }) => {
  const [salirApp, setSalirapp] = useState(false);
  const [userApp, setUserapp] = useState("");
  const [userToken, setUserToken] = useState(false);

  // Language
  const [lang, setLang] = useState(GlobalVars.defaultLang);

  const [ToRandomWishNumber, setToRandomWishNumber] = useState(null);

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

      // data
      recoveringDataUsaer();
      getLang();

      /** Get Random vals */
      getRandomNumberValidateToWish();

      // clearAll();

      return () => {
        backHandler.remove();
      };
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
      // console.log("Error recovering");
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

  const getRandomNumberValidateToWish = () => {
    // random vals process for generate token for wish
    let attrTemp = Math.random();
    setToRandomWishNumber(attrTemp);
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
      // console.error();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHome}>
        <StatusBarComponent />

        <View style={styles.containerScroll}>
          <AnimatedScrollView
            style={styles.scrollView}
            pagingEnabled
            bounces={false}
            snapToInterval={2}
            bouncesZoom={true}
            decelerationRate="fast"
            scrollEventThrottle={200}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.contentContainer}
          >
            <ProductsWish
              lang={lang}
              userToken={userToken}
              ToRandomWishNumber={ToRandomWishNumber}
              navigation={navigation}
            />
          </AnimatedScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WishScreen;
