import React, { useEffect, useState } from "react";

import {
  View,
  BackHandler,
  Text,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Translations */
import TranslateText from "../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import ModalsCheckout from "../../components/organisms/ModalsCheckout";
import CardProductInfo from "../../components/organisms/CardProductInfo";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ProductScreen = ({ route, navigation }) => {
  const itemProduct =
    route && route.params && route.params.itemProduct
      ? route.params.itemProduct
      : null;

  const [userApp, setUserapp] = useState("");
  const [userToken, setUserToken] = useState(false);

  // Language
  const [lang, setLang] = React.useState(GlobalVars.defaultLang);

  // Set variables
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const [updateCheckout, setUpdateCheckout] = useState(false);

  /** Did mount Hook */
  useEffect(() => {
    /** Recover Language */
    getLang();

    /** Recover user data */
    recoveringDataUsaer();

    /** Android return back */
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  /** selecteditem Hook */
  useEffect(() => {
    /** recovering info product */
    getProduct(itemProduct);
  }, [userToken]);

  /** Get Language */
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

  /** Recovered data user */
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

  const getProduct = (identifier) => {
    // console.log('------------');
    // console.log(userToken);

    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
    myHeaders.append("Authorization", "Bearer " + userToken);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      GlobalVars.urlapi + "/products/" + identifier + "/show",
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success && responseJson.data)
          setData(responseJson.data);
        setLoading(false);
        // console.log( responseJson.data );
      })
      .catch((error) => {
        // console.log('error', error)
      });
  };

  const updatingCheckout = () => {
    setUpdateCheckout(true);
  };

  const CloseModal = (res) => {
    if (res === 1) {
      setUpdateCheckout(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewProduct}>
        <StatusBarComponent />

        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={styles.buttonReturn}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={24}
              color={GlobalVars.firstColor}
            />
          </TouchableOpacity>
        )}

        {!loading && Platform.OS !== "ios" && (
          <View style={styles.positiontitleAndroid}>
            <Text style={styles.title}>{data.name || ""}</Text>
          </View>
        )}

        {!loading && Platform.OS === "ios" && (
          <View style={styles.positiontitleiOS}>
            <Text style={styles.title}>{data.name || ""}</Text>
          </View>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {loading && (
            <ActivityIndicator
              style={{ alignSelf: "center", marginVertical: 30 }}
              size="large"
              color={GlobalVars.firstColor}
            />
          )}

          {loading && (
            <Text style={styles.loadingText}>
              {TranslateText(lang, "cargando...")}
            </Text>
          )}

          {!loading && (
            <Image
              style={styles.image}
              source={{
                uri: data.images[0].url,
              }}
            />
          )}
        </ScrollView>

        {!loading && userToken && data.is_favorite ? (
          <CardProductInfo
            idproduct={itemProduct}
            name={data.name}
            price={data.unit_price}
            image={data.images[0].url}
            updatingCheckout={updatingCheckout}
            lang={lang}
            userToken={userToken}
            isFavorite
          />
        ) : (
          <></>
        )}

        {!loading && userToken && !data.is_favorite ? (
          <CardProductInfo
            idproduct={itemProduct}
            name={data.name}
            price={data.unit_price}
            image={data.images[0].url}
            updatingCheckout={updatingCheckout}
            lang={lang}
            userToken={userToken}
          />
        ) : (
          <></>
        )}

        {updateCheckout && (
          <ModalsCheckout
            navigation={navigation}
            CloseModal={CloseModal}
            lang={lang}
            isUpdateCheckout
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;
