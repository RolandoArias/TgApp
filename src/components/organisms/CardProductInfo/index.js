import * as React from "react";

import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Imort components */
import ButtonComponent from "../../../components/atoms/ButtonComponent";
import ButtonComponentIncDec from "../../../components/atoms/ButtonIncreaseDecrementComponent";

import Styles from "./style";

const styles = Styles;

const CardProductInfo = ({
  idproduct,
  name,
  price,
  image,
  isFavorite = false,
  lang = "es",
  ...props
}) => {
  /** Quantity products add */
  const [qty, setQty] = React.useState(1);

  /** Wish variables */
  const [iswish, setIswish] = React.useState(false);
  const [wishresult, setWishresult] = React.useState([]);

  /** Did mount Hook */
  React.useEffect(() => {
    /** Get Wishlist */
    getWishlist();
  }, []);

  /** Wish Results */
  React.useEffect(() => {
    /** verify if exists in wishlist */
    if (wishresult.length > 0) {
      // Verifico si existe el id en el wishlist
      wishresult.find(function (value) {
        // console.log({value});
        if (value === idproduct) {
          setIswish(true);
        }
      });
    }
  }, [wishresult]);

  const getWishlist = async () => {
    try {
      const wishlistcurrent = JSON.parse(
        await AsyncStorage.getItem("currentWishList")
      );
      // console.log( {wishlistcurrent} );
      if (wishlistcurrent && wishlistcurrent.wishlist) {
        setWishresult(wishlistcurrent.wishlist);
      }
    } catch (e) {
      //   console.log(e);
      null;
    }
  };

  const wishResponse = (id, setting) => {
    // console.log({id}, {setting});
    switch (setting) {
      case 1:
        addToWishList(id);
        break;
      case 2:
        quitToWishList(id);
        break;
      default:
        null;
    }
  };

  const addToWishList = async (id) => {
    // console.log(id);
    try {
      const wishlistcurrent = JSON.parse(
        await AsyncStorage.getItem("currentWishList")
      );
      // console.log( {wishlistcurrent} );
      if (wishlistcurrent && wishlistcurrent.wishlist) {
        let exists = null;

        // Verifico si existe el id en el wishlist
        wishlistcurrent.wishlist.find(function (value, index) {
          // console.log({index}, {value});
          if (value === id) {
            exists = true;
          }
        });

        // console.log( {exists} );
        let newwish = wishlistcurrent.wishlist;
        if (!exists) {
          newwish.push(id);
          AsyncStorage.removeItem("currentWishList");
          let objwish = {};
          objwish.wishlist = newwish;
          AsyncStorage.setItem("currentWishList", JSON.stringify(objwish));
          setWishresult(newwish);
          setIswish(true);
        } else {
          null;
        }
      } else {
        let objwish = {};
        objwish.wishlist = [id];
        AsyncStorage.setItem("currentWishList", JSON.stringify(objwish));
        setWishresult([id]);
        setIswish(true);
      }
    } catch (e) {
      // console.log(e);
      null;
    }
  };

  const quitToWishList = async (id) => {
    //  console.log(id);
    try {
      const wishlistcurrent = JSON.parse(
        await AsyncStorage.getItem("currentWishList")
      );
      // console.log( {wishlistcurrent} );
      if (wishlistcurrent && wishlistcurrent.wishlist) {
        let exists = null;
        let indextoslice = null;
        // Verifico si existe el id en el wishlist
        wishlistcurrent.wishlist.find(function (value, index) {
          // console.log({index}, {value});
          if (value === id) {
            exists = true;
            indextoslice = index;
          }
        });

        // console.log( {exists} );
        let newwish = wishlistcurrent.wishlist;
        if (exists) {
          newwish.splice(indextoslice, 1);
          AsyncStorage.removeItem("currentWishList");
          let objwish = {};
          objwish.wishlist = newwish;
          if (newwish.length > 0) {
            AsyncStorage.setItem("currentWishList", JSON.stringify(objwish));
          }
          setWishresult(newwish);
          setIswish(false);
        } else {
          null;
        }
      }
    } catch (e) {
      // console.log(e);
      null;
    }
  };

  const AddProductToCar = async () => {
    // console.log( {idproduct} );
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

        // console.log( {exists} );

        let newlist = checkoutlistcurrent.list;
        if (!exists) {
          newlist.push({
            id: idproduct,
            image: image,
            unitprice: price,
            name: name,
            qty: qty,
          });
          AsyncStorage.removeItem("currentCheckoutList");
          let objcheckout = {};
          objcheckout.list = newlist;
          objcheckout.size = newlist.length;
          // console.log( {objcheckout} );
          AsyncStorage.setItem(
            "currentCheckoutList",
            JSON.stringify(objcheckout)
          );
          setUpdateCheckout();
        } else {
          let objrecover = newlist[indextoslice];
          let quantity = objrecover.qty;
          let newquantity = quantity + qty;
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
          setUpdateCheckout();
        }
      } else {
        let objcheckout = {};
        let objadd = {
          id: idproduct,
          image: image,
          unitprice: price,
          name: name,
          qty: qty,
        };
        objcheckout.list = [objadd];
        objcheckout.size = 1;
        // console.log( {objcheckout} );
        AsyncStorage.setItem(
          "currentCheckoutList",
          JSON.stringify(objcheckout)
        );
        setUpdateCheckout();
      }
    } catch (e) {
      null;
      // console.log(e);
    }
  };

  const decrementAction = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const incrementAction = () => {
    setQty(qty + 1);
  };

  const setUpdateCheckout = () => {
    if (props.updatingCheckout) {
      props.updatingCheckout();
    }
  };

  return (
    <View style={styles.viewRoot}>
      <View style={styles.headercard}>
        <AnimatedScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.texttitle}>{name}</Text>
          <Text style={styles.textprice}>$ {price}</Text>
          <Text style={styles.textdescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </Text>
          <Text style={styles.texttitledetails}>Detalles</Text>
          <Text style={styles.textdetails}>
            Ancho: 58 cm. {"\n"}
            Alto: 58 cm. {"\n"}
            Peso: 483 g {"\n"}
            Distribuidor: Nestlé {"\n"}
            Estado: Disponible {"\n"}
          </Text>
        </AnimatedScrollView>
        {iswish ? (
          <TouchableOpacity
            style={styles.floatWishIcon}
            onPress={() => wishResponse(idproduct, 2)}
          >
            <AntDesign name="heart" size={26} color={GlobalVars.firstColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.floatWishIcon}
            onPress={() => wishResponse(idproduct, 1)}
          >
            <AntDesign name="hearto" size={26} color={GlobalVars.firstColor} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footercard}>
        <View style={styles.buyproduct}>
          <View style={styles.leftlad}>
            <ButtonComponentIncDec
              val="decrement"
              iconName="minus"
              ToDecrement={decrementAction}
            />
            <Text style={styles.qtystyle}>{qty}</Text>
            <ButtonComponentIncDec
              val="increment"
              iconName="plus"
              ToIncrease={incrementAction}
            />
          </View>
          <View style={styles.rightlad}>
            <ButtonComponent
              text={TranslateText(lang, "Agregar producto")}
              iconName=""
              Action={AddProductToCar}
              customHeight={38}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardProductInfo;
