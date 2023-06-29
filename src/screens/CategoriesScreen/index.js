import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Translations */
import TranslateText from "../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../global/globalVars";

/** Import Componentes Custom */
import StatusBarComponent from "../../components/atoms/StatusBar";
import BlueTextComponent from "../../components/atoms/BlueText";
import SearchButtonIconComponent from "../../components/atoms/SearchTouchable";
import CategoriesCarouselTabs from "../../components/organisms/CategoriesTabs";
import ProductsGrid from "../../components/organisms/ProductsGrid";
import ModalSearchBar from "../../components/organisms/ModalSearchBar";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const CategoriesScreen = ({ route, navigation }) => {
  const itemCat =
    route && route.params && route.params.itemCat ? route.params.itemCat : null;
  const itemsCount =
    route && route.params && route.params.counter ? route.params.counter : 0;

  const [userApp, setUserapp] = useState("");
  const [userToken, setUserToken] = useState(false);

  // Search Variables
  const [searchmodal, setModalsearch] = React.useState(false);
  const [searchText, setSearchText] = useState("");

  // Screen variables
  const [selected, setSelected] = useState(itemCat);
  const [availableSelect, setAvailableSelect] = useState(itemsCount);

  // Language
  const [lang, setLang] = React.useState(GlobalVars.defaultLang);

  // Modal Filters view
  const [modalfilters, setModalfilters] = React.useState(false);

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

  /** Hook to Search modify text */
  useEffect(() => {}, [searchText]);

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

  const changeSelection = (idCat, available) => {
    setSelected(idCat);
    setAvailableSelect(available);
    // console.log( idCat, available );
  };

  const changeModalSearch = () => {
    setModalsearch(!searchmodal);
  };

  const changeTextSearch = (receive) => {
    setSearchText(receive);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewCategories}>
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

        {Platform.OS === "ios" && (
          <View style={styles.positiontitleiOS}>
            <Text style={styles.title}>
              {TranslateText(lang, "Categorías")}
            </Text>
          </View>
        )}
        {searchmodal ? (
          <SearchButtonIconComponent
            searchmodal
            changeModalSearch={changeModalSearch}
          />
        ) : (
          <SearchButtonIconComponent changeModalSearch={changeModalSearch} />
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {userToken && (
            <CategoriesCarouselTabs
              lang={lang}
              userToken={userToken}
              selected={selected}
              changeSelection={changeSelection}
            />
          )}
          <View style={styles.infoContainer}>
            <BlueTextComponent
              text={
                (availableSelect || "0") +
                " " +
                TranslateText(lang, "available products")
              }
              color={GlobalVars.bluePantone}
              size={22}
            />
            <TouchableOpacity
              style={styles.filterbtn}
              onPress={() => setModalfilters(true)}
            >
              <Feather
                name="sliders"
                size={24}
                color={GlobalVars.bluePantone}
              />
            </TouchableOpacity>
          </View>
          {userToken && (
            <ProductsGrid
              navigation={navigation}
              lang={lang}
              userToken={userToken}
              selected={selected}
              filterText={searchText}
            />
          )}

          {searchmodal && (
            <ModalSearchBar
              visible
              changeTextSearch={changeTextSearch}
              searchText={searchText}
              ctrlModal={changeModalSearch}
              searchlabel={TranslateText(lang, "Buscar")}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
