import React, { useEffect, useState } from "react";

import {
  View,
  BackHandler,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Translations */
import TranslateText from "../../utils/useTranslations";
/** Import GPS Hook */
import recoveringStateLocation from "../../utils/useGPS";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import ButtonCarritoComponent from "../../components/atoms/ButtonCarritoComponent";
import StatusBarComponent from "../../components/atoms/StatusBar";
import SwicthPurchasingProcess from "../../components/molecules/SwitchProcessPurchasing";
import EnvioComponent from "../../components/organisms/EnvioAddress";
import PayComponent from "../../components/organisms/PayComponent";
import ConfirmationComponent from "../../components/organisms/ConfirmationComponent";
import ModalsCheckout from "../../components/organisms/ModalsCheckout";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const PurchasingScreen = ({ route, navigation }) => {
  // Params Get
  const { PrecioTotal, Carrito } = route.params;

  const [salirApp, setSalirapp] = useState(false);
  const [userApp, setUserapp] = useState("");
  const [userToken, setUserToken] = useState(false);

  // Language
  const [lang, setLang] = useState(GlobalVars.defaultLang);

  // Screen Vars
  const [cart, setCart] = useState(Carrito);
  const [totalPrice, setTotalprice] = useState(PrecioTotal);
  const [statusProcess, setStatusProcess] = useState(1);

  const [removeCheckout, setRemoveCheckout] = useState(false);
  const [currentObjectRemove, setCurrentObjectRemove] = useState(null);

  const [updateCheckout, setUpdateCheckout] = useState(false);

  const [resultAddresses, setResultAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [updateAddresses, setUpdateAddresses] = useState(false);

  const [varAddress, setVarAddress] = useState(null);

  const [activeMsgNoAddressSelected, setActiveMsgNoAddressSelected] =
    useState(false);
  const [addressToEdit, setAddressToEdit] = useState({});
  const [updateAddressModal, setUpdateAddressModal] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [ubicacion, setUbicacion] = useState(null);

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

    /** Recover Data Cart */
    getDataCart();

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

      /** Refresh recover cart */
      getDataCart();

      /** Recover user data */
      recoveringDataUsaer();

      /** Recover Location */
      setGPSLocation();

      /** Get Direcciones */
      getAddresses();

      /** Get Credit Cards */
      getCardsPay();

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

  useEffect(() => {
    /** Get Direcciones */
    getAddresses();

    /** Get Credit Cards */
    getCardsPay();
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

  const getDataCart = async () => {
    try {
      const checkoutlistcurrent = JSON.parse(
        await AsyncStorage.getItem("currentCheckoutList")
      );
      if (checkoutlistcurrent && checkoutlistcurrent.list) {
        let recovercart = checkoutlistcurrent.list;
        let cartsize = checkoutlistcurrent.size;
        setCart(recovercart);
        // console.log( {recovercart}, {cartsize} );
      } else {
        setCart([]);
      }
    } catch (e) {
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

  const setearStatus = (val) => {
    if (val === 2) {
      if (varAddress) {
        setStatusProcess(val);
      } else {
        setActiveMsgNoAddressSelected(true);
      }
    } else if (val === 3) {
      if (payMethodSelected) {
        if (payMethodSelected === "credit_card") {
          if (selectedCreditCard) {
            setStatusProcess(val);
          } else {
            setActivePayCardNoSelected(true);
          }
        } else if (payMethodSelected === "cash") {
          setStatusProcess(val);
        }
      } else {
        setActivePayMethodNoSelected(true);
      }
    } else {
      setStatusProcess(val);
    }
  };

  const setearAddressToSelected = (val) => {
    setVarAddress(val);
  };

  const setearLocation = (lat, long) => {
    setUbicacion({
      coords: {
        latitude: lat,
        longitude: long,
      },
    });
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

  const CloseModal = (res) => {
    if (res === 3) {
      setUpdateAddresses(false);
    } else if (res === 4) {
      setActiveMsgNoAddressSelected(false);
    } else if (res === 5) {
      setUpdated(false);
    } else if (res === 6) {
      setActivePayMethodNoSelected(false);
    } else if (res === 7) {
      setActivePayCardNoSelected(false);
    }
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

  const setSeleccionable = (value) => {
    setPayMethod(value);
  };

  const setSeleccionableCreditCard = (value) => {
    setSelectedCreditCard(value);
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

  const setEditCreditCard = (value) => {
    setCreditCardToEdit(value);
    setUpdateModalCard(true);
  };

  const changeTotal = (newval) => {
    setTotalprice(newval);
  };

  const handleDrop = async (idproduct) => {
    // console.log({idproduct});
    try {
      const checkoutlistcurrent = JSON.parse(
        await AsyncStorage.getItem("currentCheckoutList")
      );
      // console.log( {checkoutlistcurrent} );
      if (checkoutlistcurrent && checkoutlistcurrent.list) {
        let exists = false;
        let indextoslice = null;

        // Verifico si existe el id
        checkoutlistcurrent.list.find(function (value, index) {
          // console.log({index}, {value});
          if (value.id === idproduct) {
            exists = true;
            indextoslice = index;
          }
        });
        let newlist = checkoutlistcurrent.list;
        if (exists) {
          let objrecover = newlist[indextoslice];
          newlist.splice(indextoslice, 1);
          AsyncStorage.removeItem("currentCheckoutList");
          let objcheckout = {};
          objcheckout.list = newlist;
          objcheckout.size = newlist.length;
          AsyncStorage.setItem(
            "currentCheckoutList",
            JSON.stringify(objcheckout)
          );
          setCart(newlist);
          setRemoveCheckout(true);
          setCurrentObjectRemove(objrecover);
        }
      }
    } catch (err) {
      null;
    }
  };

  const IncrementProduct = async (val) => {
    // console.log({val})
    try {
      const checkoutlistcurrent = JSON.parse(
        await AsyncStorage.getItem("currentCheckoutList")
      );
      // console.log( {checkoutlistcurrent} );
      if (checkoutlistcurrent && checkoutlistcurrent.list) {
        let exists = false;
        let indextoslice = null;

        // Verifico si existe el id
        checkoutlistcurrent.list.find(function (value, index) {
          // console.log({index}, {value});
          if (value.id === val) {
            exists = true;
            indextoslice = index;
          }
        });

        // console.log( {exists} );

        let newlist = checkoutlistcurrent.list;
        if (exists) {
          let objrecover = newlist[indextoslice];
          let quantity = objrecover.qty;
          let newquantity = quantity + 1;
          let objpushnew = {
            id: objrecover.id,
            image: objrecover.image,
            unitprice: objrecover.unitprice,
            name: objrecover.name,
            qty: newquantity,
          };
          newlist.splice(indextoslice, 1);
          AsyncStorage.removeItem("currentCheckoutList");
          newlist.push(objpushnew);
          let objcheckout = {};
          objcheckout.list = newlist;
          objcheckout.size = newlist.length;
          // console.log( {objcheckout} );
          AsyncStorage.setItem(
            "currentCheckoutList",
            JSON.stringify(objcheckout)
          );
          setCart(newlist);
          setUpdateCheckout(true);
        }
      }
    } catch (e) {
      null;
      // console.log(e);
    }
  };

  const DecrementProduct = async (val) => {
    // console.log({val});
    try {
      const checkoutlistcurrent = JSON.parse(
        await AsyncStorage.getItem("currentCheckoutList")
      );
      // console.log( {checkoutlistcurrent} );
      if (checkoutlistcurrent && checkoutlistcurrent.list) {
        let exists = false;
        let indextoslice = null;

        // Verifico si existe el id
        checkoutlistcurrent.list.find(function (value, index) {
          // console.log({index}, {value});
          if (value.id === val) {
            exists = true;
            indextoslice = index;
          }
        });

        // console.log( {exists} );

        let newlist = checkoutlistcurrent.list;
        if (exists) {
          let objrecover = newlist[indextoslice];
          let quantity = objrecover.qty;
          let newquantity = quantity > 1 ? quantity - 1 : 1;
          let objpushnew = {
            id: objrecover.id,
            image: objrecover.image,
            unitprice: objrecover.unitprice,
            name: objrecover.name,
            qty: newquantity,
          };
          newlist.splice(indextoslice, 1);
          AsyncStorage.removeItem("currentCheckoutList");
          newlist.push(objpushnew);
          let objcheckout = {};
          objcheckout.list = newlist;
          objcheckout.size = newlist.length;
          // console.log( {objcheckout} );
          AsyncStorage.setItem(
            "currentCheckoutList",
            JSON.stringify(objcheckout)
          );
          setCart(newlist);
          setUpdateCheckout(true);
        }
      }
    } catch (e) {
      null;
      // console.log(e);
    }
  };

  const CloseModalUpdatesCart = (res) => {
    if (res === 1) {
      setUpdateCheckout(false);
    } else if (res === 2) {
      setRemoveCheckout(false);
    }
  };

  const ToDo = () => {
    const findCard = resultPayCards.find(
      (element) => element.id === selectedCreditCard
    );
    const findAddress = resultAddresses.find(
      (element) => element.id === varAddress
    );

    // console.log(
    //   { cart },
    //   { totalPrice },
    //   { statusProcess },
    //   { varAddress },
    //   { payMethodSelected },
    //   { selectedCreditCard },
    // );

    let req = {};
    req.card =
      findCard && payMethodSelected !== "cash"
        ? {
            cvv: findCard.ccv,
            pan: findCard.numberCard,
            date: findCard.endDate,
            name: findCard.titular,
          }
        : null;
    req.cart = cart;
    req.amount = totalPrice;
    console.log({ req });

    // let cardData = {};
    // let cartData = [];

    // let res = {};

    // resultPayCards.map(({}, i) => {

    // });
    // cardData = {

    // };
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
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            <SwicthPurchasingProcess
              status={statusProcess}
              lang={lang}
              Action={setearStatus}
            />
            {!ubicacion && (
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
            {statusProcess === 1 && ubicacion && (
              <EnvioComponent
                userToken={userToken}
                lang={lang}
                result={resultAddresses}
                loading={loadingAddresses}
                setearAddressToSelected={setearAddressToSelected}
                varAddress={varAddress}
                location={ubicacion}
                setearLocation={setearLocation}
                addAddressToApi={addAddressToApi}
                editAddress={editAddress}
                addressToEdit={addressToEdit}
                updateAddressModal={updateAddressModal}
                triggerUpdateAddressModal={triggerUpdateAddressModal}
                changeData={changeData}
                dropData={dropData}
              />
            )}
            {statusProcess === 2 && (
              <PayComponent
                userToken={userToken}
                lang={lang}
                result={resultPayCards}
                loading={loadingPayCards}
                payMethodSelected={payMethodSelected}
                setSeleccionable={setSeleccionable}
                selectedCreditCard={selectedCreditCard}
                setSeleccionableCreditCard={setSeleccionableCreditCard}
                cardToEdit={cardToEdit}
                setEditCreditCard={setEditCreditCard}
                visibleModalAddCard={visibleModalAddCard}
                triggerModalAddCard={triggerModalAddCard}
                addCreditCard={addCreditCard}
                updateModal={updateModalCard}
                triggerModalUpdateCard={triggerModalUpdateCard}
                updateCreditCard={updateCreditCard}
              />
            )}
            {statusProcess === 3 && (
              <ConfirmationComponent
                lang={lang}
                userToken={userToken}
                navigation={navigation}
                payMethodSelected={payMethodSelected}
                resultPayCards={resultPayCards}
                creditCard={selectedCreditCard}
                cart={cart}
                amount={totalPrice}
                changeTotal={changeTotal}
                handleDrop={handleDrop}
                IncrementProduct={IncrementProduct}
                DecrementProduct={DecrementProduct}
                resultAddresses={resultAddresses}
                addres={varAddress}
              />
            )}
          </AnimatedScrollView>
        </View>

        <View style={styles.containerBottom}>
          {statusProcess === 1 && (
            <ButtonCarritoComponent
              color="blue"
              text={TranslateText(lang, "Ir a pago")}
              alternText={totalPrice}
              iconName="arrowright"
              Action={() => setearStatus(2)}
            />
          )}
          {statusProcess === 2 && (
            <ButtonCarritoComponent
              color="blue"
              text={TranslateText(lang, "Confirmar")}
              alternText={totalPrice}
              iconName="arrowright"
              Action={() => setearStatus(3)}
            />
          )}
          {statusProcess === 3 && (
            <ButtonCarritoComponent
              color="blue"
              text={TranslateText(lang, "Procesar compra")}
              alternText={totalPrice}
              Action={ToDo}
            />
          )}
        </View>

        {updateAddresses && (
          <ModalsCheckout
            lang={lang}
            navigation={navigation}
            CloseModal={CloseModal}
            isUpdateAddresses
          />
        )}

        {activeMsgNoAddressSelected && (
          <ModalsCheckout
            lang={lang}
            navigation={navigation}
            CloseModal={CloseModal}
            isNoSelectedAddress
          />
        )}

        {updated && (
          <ModalsCheckout
            lang={lang}
            navigation={navigation}
            CloseModal={CloseModal}
            isUpdated
          />
        )}

        {activePayMethodNoSelected && (
          <ModalsCheckout
            lang={lang}
            navigation={navigation}
            CloseModal={CloseModal}
            isNoSelectedPayMethod
          />
        )}

        {activePayCardNoSelected && (
          <ModalsCheckout
            lang={lang}
            navigation={navigation}
            CloseModal={CloseModal}
            isNoSelectedPayCard
          />
        )}

        {updateCheckout && (
          <ModalsCheckout
            navigation={navigation}
            CloseModal={CloseModalUpdatesCart}
            lang={lang}
            isUpdateCheckout
          />
        )}
        {removeCheckout && (
          <ModalsCheckout
            navigation={navigation}
            CloseModal={CloseModalUpdatesCart}
            lang={lang}
            isDropCheckout
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PurchasingScreen;
