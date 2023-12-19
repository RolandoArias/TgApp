import React, { useState, useEffect, useCallback } from "react";

import {
  View,
  Animated,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  BackHandler,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

/** Firebase Import */
// import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Translations */
import TranslateText from "../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import TitleComponent from "../../components/atoms/Titles";
import StatusBarComponent from "../../components/atoms/StatusBar";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import SwitchEntryLang from "../../components/molecules/SwitchLang";
// import GooSign from "../../components/molecules/GoogleSign";
// import FBSign from "../../components/molecules/FBSign";
import InputEntry from "../../components/molecules/InputEntry";
import HasAccount from "../../components/molecules/hasAccount";
import CheckboxEntryIos from "../../components/molecules/iosEntryCheckbox";
import ModalsSignup from "../../components/organisms/ModalsSignup";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const LoginScreen = ({ navigation }) => {
  const [redirect, setRedirect] = useState("login");
  const [finished, setFinished] = useState(false);

  // Variables de captura
  const [mailnumber, setMailnumber] = useState("");
  const [password, setPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [respuestaAsynstorage, setRespuesta] = useState("wait");

  // Language
  const [lang, setLang] = React.useState(GlobalVars.defaultLang);

  useFocusEffect(
    useCallback(() => {
      /** Backhandler process Android -> back button */
      BackHandlerProcess();

      return () => {};
    }, [])
  );

  useEffect(() => {
    /** Recover Language */
    getLang();
    /** Recover user Data if exists */
    getDataUser();
  }, []);

  useEffect(() => {
    if (respuestaAsynstorage === "complete") navigation.navigate("Home");
    else null;
  }, [respuestaAsynstorage]);

  const BackHandlerProcess = () => {
    /** Android return */
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  };

  const getDataUser = async () => {
    try {
      const usernametologg = JSON.parse(
        await AsyncStorage.getItem("LoginUser")
      );
      const userpasstologg = JSON.parse(await AsyncStorage.getItem("PassUser"));
      // console.log( {usernametologg}, {userpasstologg} );
      setMailnumber(usernametologg);
      setPass(userpasstologg);
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

  const saveToken = (res) => {
    // console.log( {res} );
    try {
      AsyncStorage.removeItem("currentUserAcces");
      AsyncStorage.removeItem("currentUserShowName");
      AsyncStorage.removeItem("currentToken");
      AsyncStorage.setItem("currentUserAcces", JSON.stringify(res.email));
      AsyncStorage.setItem("currentUserShowName", JSON.stringify(res.name));
      AsyncStorage.setItem("currentToken", JSON.stringify(res.token));
      if (remember) {
        AsyncStorage.setItem("LoginUser", JSON.stringify(mailnumber));
        AsyncStorage.setItem("PassUser", JSON.stringify(password));
      }
      setRespuesta("complete");
      setFinished(true);
    } catch (error) {
      // Error saving data
      // console.error();
      setRespuesta("error");
      setFinished(true);
    }
  };

  const login = () => {
    let obj = {};
    var url = GlobalVars.urlapi;
    var key = GlobalVars.keyres;

    obj.username = mailnumber;
    obj.password = password;

    if (obj.username !== "" && obj.password !== "") {
      fetch(url + "/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: obj.username,
          password: obj.password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          if (!responseJson.success) {
            // console.log( responseJson.message );
            setRespuesta("error");
            setFinished(true);
          } else {
            // console.log( responseJson.data );
            var objres = {};
            objres.email = responseJson.data.email;
            objres.name = responseJson.data.name;
            objres.token = responseJson.data.token;

            if (
              objres.email !== "" &&
              objres.name !== "" &&
              objres.token !== ""
            ) {
              saveToken(objres);
              // console.log( '------------------' );
              // console.log( objres );
            }
          }
        })
        .catch((error) => {
          // console.log(error);
          setRespuesta("error");
          setFinished(true);
        });
    } else {
      setRespuesta("error");
      setFinished(true);
    }
  };

  const setearMailnumber = (val) => {
    setMailnumber(val);
  };

  const setearPass = (val) => {
    setPass(val);
  };

  const setearRemember = () => {
    setRemember(!remember);
  };

  const GoogleAction = useCallback((result) => {
    // // console.log('---------------');
    // // console.log({result}, {name}, {email}, {token});
    // let res = {};
    // // var user = firebase.auth().currentUser;
    // if (user) {
    //   // console.log(user.refreshToken);
    //   res.name = user.displayName;
    //   res.email = user.email;
    //   res.token = user.refreshToken;
    //   if (res.name !== "" && res.email !== "") {
    //     setearMailnumber(res.name);
    //     setearPass(res.email);
    //     // console.log('---------------');
    //     // console.log({res});
    //     saveToken(res);
    //   }
    // }
  });

  const FacebookSign = () => {};

  const hasaccount = () => {
    navigation.navigate("Signup");
  };

  const ToLogin = () => {
    login();
  };

  const setearRespuesta = () => {
    setRespuesta("wait");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewLogin}>
        <StatusBarComponent />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <SwitchEntryLang lang={lang} setLanguage={setLanguage} />

          <Image
            style={styles.stretch}
            source={require("../../../assets/images/login/logo.jpg")}
          />
          <TitleComponent
            title={TranslateText(lang, "Inicia Sesión")}
            color={GlobalVars.grisColor}
            size={26}
          />

          <InputEntry
            label={TranslateText(lang, "Email o Número de teléfono")}
            iconName="mail"
            textvariable={mailnumber}
            setValue={setearMailnumber}
            inputStyle={styles.customInputStyle}
          />
          <InputEntry
            label={TranslateText(lang, "Contraseña")}
            iconName="lock"
            textvariable={password}
            setValue={setearPass}
            visibility
            pass
          />

          {remember ? (
            <CheckboxEntryIos
              label={TranslateText(lang, "Recordar Contraseña")}
              setValue={setearRemember}
              statuscheck={remember}
            />
          ) : (
            <CheckboxEntryIos
              label={TranslateText(lang, "Recordar Contraseña")}
              setValue={setearRemember}
            />
          )}

          <Text style={styles.rememberpass}>
            {TranslateText(lang, "¿Has olvidado tu contraseña?")}
          </Text>

          <ButtonComponent
            text={TranslateText(lang, "Iniciar Sesión")}
            iconName="arrowright"
            ToLogin={ToLogin}
          />
          {/* <GooSign GoogleAction={GoogleAction} />
          <FBSign FacebookSign={FacebookSign} /> */}

          <HasAccount hasaccount={hasaccount} lang={lang} nothasaccount />

          {respuestaAsynstorage === "error" && (
            <ModalsSignup Action={setearRespuesta} isLogin />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
