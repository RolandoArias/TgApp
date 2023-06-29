import React, { useEffect, useState } from "react";

import {
  View,
  BackHandler,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Translations */
import TranslateText from "../../utils/useTranslations";
/** Import GPS Hook */
import recoveringStateLocation from "../../utils/useGPS";
import processingLogout from "../../utils/useLogout";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import LabelTextComponent from "../../components/atoms/LabelText";
import UserOptions from "../../components/organisms/OptionsUser";
import AddressessProfile from "../../components/organisms/ViewAddressess";
import PayProfile from "../../components/organisms/PayProfile";
import FAQSProfile from "../../components/organisms/FAQS";
import UserInformationUpdate from "../../components/organisms/UserInformationUpdate";
import ModalsCheckout from "../../components/organisms/ModalsCheckout";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const UserScreen = ({ route, navigation }) => {
  // Params Get
  const [salirApp, setSalirapp] = useState(false);
  const [userApp, setUserapp] = useState("");
  const [userToken, setUserToken] = useState(false);

  // Language
  const [lang, setLang] = useState(GlobalVars.defaultLang);

  // Info del usuario
  const [resultInfoUser, setResultUserInfo] = useState([]);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  // Control de Screen
  const [estatusScreen, setEstatusScreen] = useState(0);

  // Control de direcciones
  const [resultAddresses, setResultAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [updateAddresses, setUpdateAddresses] = useState(false);

  const [addressToEdit, setAddressToEdit] = useState({});
  const [updateAddressModal, setUpdateAddressModal] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [ubicacion, setUbicacion] = useState(null);

  // control de tarjetas
  const [loadingPayCards, setLoadingPayCards] = useState(true);
  const [resultPayCards, setResultPayCards] = useState([]);
  const [payMethodSelected, setPayMethod] = useState(null);
  const [selectedCreditCard, setSelectedCreditCard] = useState(null);
  const [cardToEdit, setCreditCardToEdit] = useState(null);
  const [updateModalCard, setUpdateModalCard] = useState(false);
  const [activePayMethodNoSelected, setActivePayMethodNoSelected] =
    useState(false);
  const [activePayCardNoSelected, setActivePayCardNoSelected] = useState(false);
  const [visibleModalAddCard, setVisibleModalAddCard] = useState(false);

  useEffect(() => {
    /** Recover Language */
    getLang();

    /** Recover user data */
    recoveringDataUsaer();

    /** Recover Location */
    setGPSLocation();

    /** Get Direcciones */
    getAddresses();

    /** Get Credit Cards */
    getCardsPay();

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
      /** Recover Language */
      getLang();

      /** Recover user data */
      recoveringDataUsaer();

      /** Recover Location */
      setGPSLocation();

      /** Get Direcciones */
      getAddresses();

      /** Get Credit Cards */
      getCardsPay();

      /** Set estatus to init */
      setEstatusScreen(0);

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

  /** selecteditem Hook */
  useEffect(() => {
    /** recovering info user */
    getUserInfo();
    /** Get Direcciones */
    getAddresses();
  }, [userToken]);

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

  const setGPSLocation = async () => {
    let recover = await recoveringStateLocation();
    while (recover === "error" || !recover) {
      recover = await recoveringStateLocation();
    }
    setUbicacion(recover);
  };

  const getUserInfo = () => {
    // console.log('------------');

    setLoadingUserInfo(true);

    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
    myHeaders.append("Authorization", "Bearer " + userToken);

    var raw = "";
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ raw }),
      redirect: "follow",
    };

    fetch(GlobalVars.urlapi + "/user/me", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log( responseJson );
        if (responseJson && responseJson.success && responseJson.data) {
          setResultUserInfo(responseJson.data);
          setLoading(false);
        }
        // console.log( responseJson );
      })
      .catch((error) => {
        /* console.log('error', error) */
        setLoadingUserInfo(false);
      });
    setLoadingUserInfo(false);
  };

  const getAddresses = () => {
    // console.log('------------');
    //   console.log(userToken);

    setLoadingAddresses(true);

    var myHeaders = new Headers();
    //   myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + userToken);

    var raw = "";
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ raw }),
      redirect: "follow",
    };

    fetch(GlobalVars.urlapi + "/address/lists", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log( responseJson );
        if (responseJson.success && responseJson.data) {
          setResultAddresses(responseJson.data);
          setLoadingAddresses(false);
        }
      })
      .catch((error) => {
        /* console.log('error', error) */
        setLoadingAddresses(false);
      });
    // setResultAddresses([
    //   {
    //     id: 1,
    //     name: "Mi Casa",
    //     description: "Final calle el lago, casa #34 Ahuchapán",
    //     coordinates: { latitude: 13.914270986317, longitude: -89.850406832993 },
    //     createAt: "23/05/2020",
    //   },
    //   {
    //     id: 2,
    //     name: "Casa de mi hermana",
    //     description: "Calle del mandarín, casa #58 otro lado",
    //     coordinates: { latitude: 14.0, longitude: -89.0 },
    //     createAt: "23/05/2020",
    //   },
    // ]);
    setLoadingAddresses(false);
  };

  const addAddressToApi = (name, description) => {
    setLoadingAddresses(true);
    // console.log('------------');
    //   console.log(userToken);

    var myHeaders = new Headers();
    //   myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + userToken);

    var raw = JSON.stringify({
      lon: String(ubicacion.coords.longitude),
      lat: String(ubicacion.coords.latitude),
      name: name,
      description: description,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(GlobalVars.urlapi + "/address/create", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log( responseJson );
        if (responseJson.success && responseJson.message === "Address Ok.") {
          setLoadingAddresses(false);
          setUpdateAddresses(true);
          getAddresses();
        }
      })
      .catch((error) => {
        /* console.log('error', error) */
        setLoadingAddresses(false);
        setUpdateAddresses(true);
      });
  };

  const setearLocation = (lat, long) => {
    setUbicacion({
      coords: {
        latitude: lat,
        longitude: long,
      },
    });
  };

  const editAddress = (id, name, desc, coordinates) => {
    setAddressToEdit({
      id,
      name,
      desc,
      coordinates,
    });
    setUpdateAddressModal(true);
  };

  const triggerUpdateAddressModal = () => {
    setUpdateAddressModal(!updateAddressModal);
    setAddressToEdit({});
  };

  const changeData = (id, name, desc, coords) => {
    setUpdateAddresses(true);
    // console.log('------------');
    //   console.log(userToken);

    var myHeaders = new Headers();
    //   myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + userToken);

    var raw = JSON.stringify({
      address_id: id,
      lon: String(coords.longitude),
      lat: String(coords.latitude),
      name: name,
      description: desc,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(GlobalVars.urlapi + "/address/update", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success && responseJson.message === "Address Ok.") {
          setLoadingAddresses(false);
          setUpdateAddresses(true);
          getAddresses();
        }
      })
      .catch((error) => {
        /* console.log('error', error) */
        setLoadingAddresses(false);
        setUpdateAddresses(true);
      });
  };

  const dropData = (id) => {};

  const setSeleccionableOption = (id) => {
    setEstatusScreen(id);
  };

  const closeSession = async () => {
    const processEstatus = await processingLogout();
    if (processEstatus === "error") null;
    else navigation.navigate("Initial");
  };

  const getCardsPay = () => {
    // console.log('------------');
    //   console.log(userToken);

    // setLoading( true );

    // var myHeaders = new Headers();
    // //   myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
    // myHeaders.append("Authorization", "Bearer " + userToken);

    // var raw = "";
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: JSON.stringify({raw}),
    //     redirect: 'follow'
    // };

    // fetch(GlobalVars.urlapi + "/categories", requestOptions)
    // .then(response => response.json())
    // .then(responseJson => {
    //         // console.log( responseJson );
    //         if( responseJson.success && responseJson.data && responseJson.data.products )
    //         setResult(responseJson.data.products) ;
    //         setLoading( false );
    //         // console.log( responseJson );

    // })
    // .catch(error => {
    //     /* console.log('error', error) */
    //     setLoading( false );
    // });
    setResultPayCards([
      {
        id: 1,
        name: "Tarjeta 1",
        titular: "Jose galo",
        type: "mastercard",
        ccv: "123",
        numberCard: "1234567891234567",
        endDate: "1121",
        createAt: "23/05/2020",
      },
      {
        id: 2,
        name: "Tarjeta 2",
        titular: "Jose galo",
        type: "visa",
        ccv: "123",
        numberCard: "1234567891234567",
        endDate: "1022",
        createAt: "23/05/2020",
      },
    ]);
    setLoadingPayCards(false);
  };

  const setEditCreditCard = (value) => {
    setCreditCardToEdit(value);
    setUpdateModalCard(true);
  };

  const triggerModalAddCard = () => {
    setVisibleModalAddCard(!visibleModalAddCard);
  };

  const addCreditCard = (name, titular, number, type, ccv, endDate, where) => {
    if (where === 1) {
      let payCardTemp = resultPayCards;
      let d = new Date();
      payCardTemp.push({
        id: payCardTemp.length + 1,
        name,
        titular,
        type,
        ccv,
        endDate,
        numberCard: number,
        createAt:
          (d.getDay() < 10 ? "0" + d.getDay() : d.getDay()) +
          "/" +
          (d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()) +
          "/" +
          d.getFullYear(),
      });
      setResultPayCards(payCardTemp);
      triggerModalAddCard();
      setUpdated(true);
    } else if (where === 2) {
      let payCardTemp = resultPayCards;
      let d = new Date();
      payCardTemp.push({
        id: payCardTemp.length + 1,
        name,
        titular,
        type,
        ccv,
        endDate,
        numberCard: number,
        createAt:
          (d.getDay() < 10 ? "0" + d.getDay() : d.getDay()) +
          "/" +
          (d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()) +
          "/" +
          d.getFullYear(),
      });
      setResultPayCards(payCardTemp);
      setUpdated(true);
    }
  };

  const triggerModalUpdateCard = () => {
    setUpdateModalCard(!updateModalCard);
  };

  const updateCreditCard = (
    id,
    name,
    ccv,
    type,
    titular,
    endDate,
    number
  ) => {};

  const SetNewDataUser = async (dataRecovered) => {
    try {
      const LoginUser = JSON.parse(await AsyncStorage.getItem("LoginUser"));
      AsyncStorage.removeItem("currentUserAcces");
      AsyncStorage.removeItem("currentUserShowName");
      AsyncStorage.removeItem("currentToken");
      AsyncStorage.setItem(
        "currentUserAcces",
        JSON.stringify(dataRecovered.email)
      );
      AsyncStorage.setItem(
        "currentUserShowName",
        JSON.stringify(dataRecovered.name)
      );
      if (LoginUser) {
        AsyncStorage.setItem("LoginUser", JSON.stringify(dataRecovered.email));
      }
    } catch (error) {
      // Error saving data
      // console.error();
      null;
    }
  };

  const CloseModal = (res) => {
    if (res === 3) {
      setUpdateAddresses(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewRoot}>
        <StatusBarComponent />

        {(estatusScreen === 0 || estatusScreen === 1) && (
          <View style={styles.containerScroll}>
            <View style={styles.topContainer}>
              <ImageBackground
                source={require("../../../assets/images/user/bgUsrScreen.jpg")}
                style={styles.imageTopBG}
              >
                <View style={styles.textIndicatorTop}>
                  <LabelTextComponent
                    text={TranslateText(lang, "Profile")}
                    color={GlobalVars.white}
                    size={18}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
              {estatusScreen === 1 && (
                <TouchableOpacity
                  onPress={() => setEstatusScreen(0)}
                  style={styles.backAction}
                >
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={24}
                    color={GlobalVars.firstColor}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.containerImg}>
                <Image
                  source={require("../../../assets/images/user/bgUsrScreen.jpg")}
                  style={styles.imgProfile}
                />
              </View>
              <View style={styles.separationHead}></View>
              <AnimatedScrollView
                style={styles.scrollView}
                pagingEnabled
                bounces={false}
                snapToInterval={2}
                bouncesZoom={true}
                decelerationRate="fast"
                scrollEventThrottle={200}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
              >
                {loadingUserInfo && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <ActivityIndicator
                      size="large"
                      color={GlobalVars.firstColor}
                      style={{ marginTop: 30 }}
                    />
                  </View>
                )}

                <LabelTextComponent
                  text={resultInfoUser.name}
                  color={GlobalVars.firstColor}
                  size={18}
                />

                <LabelTextComponent
                  text={resultInfoUser.email}
                  color={GlobalVars.grisIntermediate}
                  size={15}
                />

                {estatusScreen === 0 && (
                  <UserOptions
                    lang={lang}
                    setSeleccionableOption={setSeleccionableOption}
                    CloseScreen={() => closeSession(navigation)}
                  />
                )}

                {estatusScreen === 1 && (
                  <UserInformationUpdate
                    lang={lang}
                    userToken={userToken}
                    SetNewData={SetNewDataUser}
                    backScreen={() => setEstatusScreen(0)}
                  />
                )}
              </AnimatedScrollView>
            </View>
          </View>
        )}
        {(estatusScreen === 2 ||
          estatusScreen === 3 ||
          estatusScreen === 4) && (
          <View style={styles.containerScroll}>
            <AnimatedScrollView
              style={styles.scrollView}
              pagingEnabled
              bounces={false}
              snapToInterval={2}
              bouncesZoom={true}
              decelerationRate="fast"
              scrollEventThrottle={200}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            >
              {ubicacion && estatusScreen === 2 && (
                <AddressessProfile
                  lang={lang}
                  userToken={userToken}
                  result={resultAddresses}
                  loading={loadingAddresses}
                  location={ubicacion}
                  setearLocation={setearLocation}
                  addAddressToApi={addAddressToApi}
                  editAddress={editAddress}
                  addressToEdit={addressToEdit}
                  updateAddressModal={updateAddressModal}
                  triggerUpdateAddressModal={triggerUpdateAddressModal}
                  changeData={changeData}
                  dropData={dropData}
                  setearEstatusScreen={(val) => setEstatusScreen(val)}
                />
              )}
              {estatusScreen === 3 && (
                <PayProfile
                  userToken={userToken}
                  lang={lang}
                  result={resultPayCards}
                  loading={loadingPayCards}
                  cardToEdit={cardToEdit}
                  setEditCreditCard={setEditCreditCard}
                  visibleModalAddCard={visibleModalAddCard}
                  triggerModalAddCard={triggerModalAddCard}
                  addCreditCard={addCreditCard}
                  updateModal={updateModalCard}
                  triggerModalUpdateCard={triggerModalUpdateCard}
                  updateCreditCard={updateCreditCard}
                  setearEstatusScreen={(val) => setEstatusScreen(val)}
                />
              )}
              {estatusScreen === 4 && (
                <FAQSProfile
                  lang={lang}
                  userToken={userToken}
                  setearEstatusScreen={(val) => setEstatusScreen(val)}
                />
              )}
            </AnimatedScrollView>
          </View>
        )}
        {updateAddresses && (
          <ModalsCheckout
            lang={lang}
            navigation={navigation}
            CloseModal={CloseModal}
            isUpdateAddresses
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
