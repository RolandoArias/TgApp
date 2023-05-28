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

/** Import Translations */
import TranslateText from "../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import FABCheckout from "../../components/atoms/FABCheckout";
import StatusBarComponent from "../../components/atoms/StatusBar";
import SwitchEntryLang from "../../components/molecules/SwitchLang";
import HeaderHomeComponent from "../../components/molecules/HeaderHome";
import BannerPromotionalCard from "../../components/molecules/BannerPromotionalCard";
import CategoriesCarouselComponent from "../../components/organisms/CategoriesCarousel";
import LatestBuyCarouselComponent from "../../components/organisms/LatestBuyCarousel";
import WeekOffCarousel from "../../components/organisms/WeekOffCarousel";
import Top5Carousel from "../../components/organisms/Top5Carousel";
import ModalsSignup from "../../components/organisms/ModalsSignup";
import ModalSearch from "../../components/organisms/ModalSearch";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const FirstScreen = ({ navigation }) => {
  const [salirApp, setSalirapp] = useState(false);
  const [userApp, setUserapp] = useState("");
  const [userToken, setUserToken] = useState(false);

  // Search Variables
  const [modalSearch, setModalsearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchProducts, setSearchproducts] = useState([]);

  // Language
  const [lang, setLang] = useState(GlobalVars.defaultLang);

  useEffect(() => {
    /** Recover Language */
    getLang();

    /** Recover user data */
    recoveringDataUsaer();

    // clearAll();

    /** Android no return Login */
    const backAction = () => {
      setSalirapp(!salirApp);
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
      /** Recover Language */
      getLang();

      /** Recover user data */
      recoveringDataUsaer();

      /** Android no return Login */
      const backAction = () => {
        setSalirapp(!salirApp);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [])
  );

  /** Action to searchText change */
  useEffect(() => {
    searchingProducts(searchText);
    // console.log( {searchText} );
  }, [searchText]);

  const CloseApp = (response = false) => {
    if (response) BackHandler.exitApp();
    else setSalirapp(!salirApp);
  };

  const recoveringDataUsaer = async () => {
    try {
      const usernametoapp = JSON.parse(
        await AsyncStorage.getItem("currentUserShowName")
      );
      const usertokentoapp = JSON.parse(
        await AsyncStorage.getItem("currentToken")
      );
      // console.log( {usernametoapp} );
      // console.log( {usertokentoapp} );
      setUserapp(usernametoapp);
      setUserToken(usertokentoapp);
    } catch (e) {
      //   console.log(e);
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

  const setLanguage = (value) => {
    // console.log({value});
    try {
      AsyncStorage.removeItem("currentLang");
      AsyncStorage.setItem("currentLang", JSON.stringify(value));
      // console.log( value );
      setLang(value);
    } catch (error) {
      // Error saving data
      // console.error();
      null;
    }
  };

  const setearModalSearch = () => {
    setModalsearch(!modalSearch);
  };

  const setearSearchText = (propose) => {
    setSearchText(propose);
  };

  const searchingProducts = (str) => {
    // console.log('------------');
    // console.log(userToken);
    // console.log( {str} );

    if (str) {
      var myHeaders = new Headers();
      // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
      myHeaders.append("Authorization", "Bearer " + userToken);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ s: str });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(GlobalVars.urlapi + "/search", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          if (
            responseJson.success &&
            responseJson.data &&
            responseJson.data.products
          ) {
            setSearchproducts(responseJson.data.products);
            // console.log( responseJson.data.products );
          }
        })
        .catch((error) => {
          /* console.log('error', error) */
        });
    } else {
      setSearchproducts([]);
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
        <StatusBarComponent />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <SwitchEntryLang lang={lang} setLanguage={setLanguage} />

          {userApp !== "" && (
            <HeaderHomeComponent
              name={userApp}
              question={TranslateText(lang, "¿Necesitas algo?")}
              lang={lang}
              searchlabel={TranslateText(lang, "Buscar")}
              Action={setearModalSearch}
            />
          )}

          {userToken && (
            <CategoriesCarouselComponent
              navigation={navigation}
              lang={lang}
              userToken={userToken}
            />
          )}

          {userToken && (
            <LatestBuyCarouselComponent
              navigation={navigation}
              lang={lang}
              userToken={userToken}
            />
          )}

          {userToken && (
            <Top5Carousel
              navigation={navigation}
              lang={lang}
              userToken={userToken}
            />
          )}

          {userToken && (
            <BannerPromotionalCard
              userToken={userToken}
              navigation={navigation}
            />
          )}

          {userToken && (
            <WeekOffCarousel
              navigation={navigation}
              lang={lang}
              userToken={userToken}
            />
          )}

          {salirApp && (
            <ModalsSignup
              navigation={navigation}
              CloseApp={CloseApp}
              isSalirApp
            />
          )}

          {modalSearch && (
            <ModalSearch
              ctrlModal={setearModalSearch}
              searchlabel={TranslateText(lang, "Buscar")}
              redirectToProduct={redirectToProduct}
              searchText={searchText}
              changeText={setearSearchText}
              lang={lang}
              searchProducts={searchProducts}
            />
          )}
        </ScrollView>

        <FABCheckout navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default FirstScreen;
