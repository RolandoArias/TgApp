import React, { useState, useEffect, useCallback } from "react";

import {
  View,
  Animated,
  SafeAreaView,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-community/async-storage";

/** Import Translations */
import TranslateText from "../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import TitleComponent from "../../components/atoms/Titles";
import StatusBarComponent from "../../components/atoms/StatusBar";
import ButtonComponent from "../../components/atoms/ButtonComponent";
import SwitchEntryLang from "../../components/molecules/SwitchLang";
// import GooSign from '../../components/molecules/GoogleSign';
// import FBSign from "../../components/molecules/FBSign";
import InputEntry from "../../components/molecules/InputEntry";
// import CheckboxEntry from '../../components/molecules/EntryCheckbox';
import CheckboxEntryIos from "../../components/molecules/iosEntryCheckbox";
import HasAccount from "../../components/molecules/hasAccount";
import ModalsSignup from "../../components/organisms/ModalsSignup";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const SignupScreen = ({ navigation }) => {
  const [redirect, setRedirect] = useState("Login");
  const [finished, setFinished] = useState(false);
  const [remember, setRemember] = useState(false);

  // Language
  const [lang, setLang] = React.useState(GlobalVars.defaultLang);

  // Variables de captura
  const [name, setName] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [mailnumber, setMailnumber] = useState("");
  const [password, setPass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [termscond, setTermscond] = useState(false);
  const [respuestaAsynstorage, setRespuesta] = useState("wait");

  const [sucessfullycreatedaccount, setSucessfullycreatedaccount] =
    useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.goBack();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    /** Recover Language */
    getLang();
  }, []);

  useEffect(() => {
    if (respuestaAsynstorage === "complete") navigation.navigate("Home");
    else null;
  }, [respuestaAsynstorage]);

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

  const signup = () => {
    let obj = {};
    var url = GlobalVars.urlapi;
    var key = GlobalVars.keyres;

    obj.username = name;
    obj.password = password;
    obj.mailnumber = mailnumber;
    obj.confirmpass = confirmpass;
    obj.termscond = termscond;

    if (
      obj.username !== "" &&
      obj.password !== "" &&
      obj.password === obj.confirmpass &&
      obj.termscond
    ) {
      fetch(url + "/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: obj.username,
          password: obj.password,
          email: obj.mailnumber,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log( responseJson );
          if (!responseJson.success) {
            // console.log( responseJson );
            setRespuesta("error");
            setFinished(true);
          } else {
            // console.log( responseJson.data );
            var objres = {};
            objres.email = mailnumber;
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

  const ToLogin = () => {
    navigation.navigate("Login");
  };

  const setearName = (val) => {
    setName(val);
  };

  const setearCard = (val) => {
    setCardnumber(val);
  };

  const setearMailnumber = (val) => {
    setMailnumber(val);
  };

  const setearPass = (val) => {
    setPass(val);
  };

  const setearConfirmpass = (val) => {
    setConfirmpass(val);
  };

  const setearTermsCond = () => {
    setTermscond(!termscond);
  };

  const setearRemember = () => {
    setRemember(!remember);
  };

  const GoogleAction = useCallback((result) => {
    /*
        // console.log('---------------');
        // console.log({result}, {name}, {email}, {token});

        let res = {};

        var user = firebase.auth().currentUser;
        if( user ){
            // console.log(user.refreshToken);
            res.name = user.displayName;
            res.email = user.email;
            res.token = user.refreshToken;

            if( res.name !== '' && res.email !== '' ){
                setearMailnumber( res.email );
                setearName( res.name );
                // console.log('---------------');
                // console.log({res});
                saveToken(res);
            }
        }
        */
  });

  const FacebookSign = () => {};

  const hasaccount = () => {
    ToLogin();
  };

  const ToSignUp = () => {
    signup();
  };

  const ToHome = () => {
    navigation.navigate("Home");
  };

  const setearRespuesta = () => {
    setRespuesta("wait");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewSignup}>
        <StatusBarComponent />

        <AnimatedScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <SwitchEntryLang lang={lang} setLanguage={setLanguage} />

          <Image
            style={styles.stretch}
            source={require("../../../assets/images/login/logo.jpg")}
          />
          <TitleComponent
            title={TranslateText(lang, "Crea tu cuenta")}
            color={GlobalVars.grisColor}
            size={26}
          />

          <InputEntry
            label={TranslateText(lang, "Nombre")}
            iconName="user"
            textvariable={name}
            setValue={setearName}
          />
          <InputEntry
            label={TranslateText(lang, "No. de tarjeta (Opcional)")}
            iconName="credit-card"
            textvariable={cardnumber}
            setValue={setearCard}
          />
          <InputEntry
            label={TranslateText(lang, "Email o Número de teléfono")}
            iconName="mail"
            textvariable={mailnumber}
            setValue={setearMailnumber}
          />
          <InputEntry
            label={TranslateText(lang, "Contraseña")}
            iconName="lock"
            textvariable={password}
            setValue={setearPass}
            visibility
            pass
          />
          <InputEntry
            label={TranslateText(lang, "Confirmar contraseña")}
            iconName="lock"
            textvariable={confirmpass}
            setValue={setearConfirmpass}
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

          {/* {
                        Platform.OS !== 'ios'
                        ?
                        (
                            termscond
                            ?
                            <CheckboxEntry label="Aceptar terminos y condiciones. Lorem ipsum dolor sit amet, 
                                                consectetur adipiscelit, sed do eiusmod tempor incididunt."
                                        setValue={setearTermsCond} statuscheck={termscond} />
                            :
                            <CheckboxEntry label="Aceptar terminos y condiciones. Lorem ipsum dolor sit amet, 
                                                consectetur adipiscelit, sed do eiusmod tempor incididunt."
                                        setValue={setearTermsCond} />
                        )
                        :
                        null
                    }  */}

          {
            // Platform.OS === 'ios'
            // ?
            // (
            termscond ? (
              <CheckboxEntryIos
                label={TranslateText(lang, "Aceptar terminos y condiciones")}
                setValue={setearTermsCond}
                statuscheck={termscond}
              />
            ) : (
              <CheckboxEntryIos
                label={TranslateText(lang, "Aceptar terminos y condiciones")}
                setValue={setearTermsCond}
              />
            )
            // )
            // :
            // null
          }

          <ButtonComponent
            text={TranslateText(lang, "Crear Cuenta")}
            iconName="arrowright"
            ToSignUp={ToSignUp}
          />
          {/*<GooSign GoogleAction={GoogleAction} />*/}
          {/* <FBSign FacebookSign={FacebookSign} /> */}

          <HasAccount hasaccount={hasaccount} lang={lang} />

          {respuestaAsynstorage === "error" && (
            <ModalsSignup Action={setearRespuesta} isSignFalse />
          )}
        </AnimatedScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
