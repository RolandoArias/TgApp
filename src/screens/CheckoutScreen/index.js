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
import ButtonCarritoComponent from "../../components/atoms/ButtonCarritoComponent";
import StatusBarComponent from "../../components/atoms/StatusBar";
import Carretilla from "../../components/organisms/Carretilla";
import PopBoxesCheckout from "../../components/organisms/PopBoxesCheckout";
import ModalsCheckout from "../../components/organisms/ModalsCheckout";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const CheckoutScreen = ({ navigation }) => {
  const [salirApp, setSalirapp] = useState(false);
  const [userApp, setUserapp] = useState("");
  const [userToken, setUserToken] = useState(false);

  // Language
  const [lang, setLang] = useState(GlobalVars.defaultLang);

  // Screen Vars
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalprice] = useState(0);

  const [removeCheckout, setRemoveCheckout] = useState(false);
  const [currentObjectRemove, setCurrentObjectRemove] = useState(null);

  const [updateCheckout, setUpdateCheckout] = useState(false);

  useEffect(() => {
    /** Recover Language */
    getLang();

    /** Recover user data */
    recoveringDataUsaer();

    /** Recover Data Cart */
    getDataCart();

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

  const CloseModal = (res) => {
    if (res === 1) {
      setUpdateCheckout(false);
    } else if (res === 2) {
      setRemoveCheckout(false);
    }
  };

  const ToPurchasing = () => {
    navigation.navigate("Purchasing", {
      PrecioTotal: totalPrice,
      Carrito: cart,
    });
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
            {userToken && (
              <Carretilla
                lang={lang}
                userToken={userToken}
                navigation={navigation}
                changeTotal={changeTotal}
                cart={cart}
                handleDrop={handleDrop}
                IncrementProduct={IncrementProduct}
                DecrementProduct={DecrementProduct}
              />
            )}
            {userToken && (
              <PopBoxesCheckout
                lang={lang}
                userToken={userToken}
                navigation={navigation}
              />
            )}

            {updateCheckout && (
              <ModalsCheckout
                navigation={navigation}
                CloseModal={CloseModal}
                lang={lang}
                isUpdateCheckout
              />
            )}
            {removeCheckout && (
              <ModalsCheckout
                navigation={navigation}
                CloseModal={CloseModal}
                lang={lang}
                isDropCheckout
              />
            )}
          </AnimatedScrollView>
        </View>

        <View style={styles.containerBottom}>
          <ButtonCarritoComponent
            color="blue"
            text={TranslateText(lang, "Procesar compra")}
            alternText={totalPrice}
            iconName="arrowright"
            Action={ToPurchasing}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
