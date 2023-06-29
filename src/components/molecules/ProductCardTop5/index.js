import * as React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Hooks Wish */
import WishMethods from "../../../utils/useWish";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function ProductCardTop5({
  nameproduct,
  unitprice,
  realprice,
  idproduct,
  userToken,
  ...props
}) {
  const [iswish, setIswish] = React.useState(false);
  const [wishresult, setWishresult] = React.useState([]);

  // Cart Vars
  const [addcheckout, setAddCheckout] = React.useState(false);
  const [ischeckout, setIsCheckout] = React.useState(false);

  React.useEffect(() => {
    /** Get Wishlist */
    getWishlist();
  }, []);

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
      // AsyncStorage.removeItem("currentWishList");
      // console.log( {wishlistcurrent} );
      if (wishlistcurrent && wishlistcurrent.wishlist) {
        setWishresult(wishlistcurrent.wishlist);
      }
    } catch (e) {
      //   console.log(e);
      null;
    }
  };

  const returnAction = (id) => {
    // console.log({id});
    if (props.redirectidMethod) {
      props.redirectidMethod(id);
    }
  };

  const wishResponse = (id, setting) => {
    // console.log({id}, {setting});
    switch (setting) {
      case 1:
        addToWishList(id);
        WishMethods.setWishItem(id, userToken);
        break;
      case 2:
        quitToWishList(id);
        WishMethods.dropWishItem(id, userToken);
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

  const addToCart = async (id, image, unitprice, name) => {
    // console.log( {id}, {image}, {unitprice}, {name} );
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
          if (value.id === id) {
            exists = true;
            indextoslice = index;
          }
        });

        // console.log( {exists} );

        let newlist = checkoutlistcurrent.list;
        if (!exists) {
          newlist.push({
            id: id,
            image: image,
            unitprice: unitprice,
            name: name,
            qty: 1,
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
          setAddCheckout(newlist);
          setIsCheckout(true);
        } else {
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
          setAddCheckout(true);
          setIsCheckout(true);
        }
      } else {
        let objcheckout = {};
        let objadd = {
          id: id,
          image: image,
          unitprice: unitprice,
          name: name,
          qty: 1,
        };
        objcheckout.list = [objadd];
        objcheckout.size = 1;
        // console.log( {objcheckout} );
        AsyncStorage.setItem(
          "currentCheckoutList",
          JSON.stringify(objcheckout)
        );
        setAddCheckout(true);
        setIsCheckout(true);
      }
    } catch (e) {
      null;
      // console.log(e);
    }
  };

  // console.log( props.image[0] );

  if (!idproduct) return null;

  let uriimage = "";
  if (props.image && props.image[0])
    uriimage = props.image[0].url ? props.image[0].url : "";
  else return null;

  // console.log( uriimage );

  return (
    <View style={styles.contenedorView}>
      <TouchableOpacity
        onPress={() => returnAction(idproduct)}
        style={styles.containerCard}
      >
        <ImageBackground
          source={{ uri: uriimage }}
          style={styles.imageBg}
          imageStyle={styles.imageStyles}
        >
          <TouchableOpacity
            style={styles.headerCard}
            onPress={() => returnAction(idproduct)}
          ></TouchableOpacity>
          {iswish ? (
            <TouchableOpacity
              style={styles.floatWishIcon}
              onPress={() => wishResponse(idproduct, 2)}
            >
              <AntDesign name="heart" size={26} color={GlobalVars.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.floatWishIcon}
              onPress={() => wishResponse(idproduct, 1)}
            >
              <AntDesign name="hearto" size={26} color={GlobalVars.white} />
            </TouchableOpacity>
          )}
        </ImageBackground>
        <View style={styles.contentCard}>
          <Text style={styles.textName}>{nameproduct}</Text>
          <View style={styles.footerCard}>
            <Text style={styles.textPriceFinal}>${unitprice}</Text>
            {realprice ? (
              <Text style={styles.textPriceReal}>{`$` + realprice}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.iconView}
              onPress={() =>
                addToCart(idproduct, uriimage, unitprice, nameproduct)
              }
            >
              <AntDesign
                name="shoppingcart"
                size={24}
                color={GlobalVars.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
