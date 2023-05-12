import * as React from "react";
import { View, Text, Animated } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";

/** Import Componentes Custom */
import TitleComponent from "../../atoms/Titles";
import CategoryCard from "../../molecules/CategoryCard";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function CategoriesCarouselComponent({
  navigation,
  lang = "es",
  userToken = null,
}) {
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    /** Get categories */
    getCategories();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      /** Refresh result components */
      /** Get categories */
      getCategories();
      return () => 1;
    }, [])
  );

  const redirectPage = (id, count) => {
    navigation.navigate("Categories", { itemCat: id, counter: count });
    // console.log( id );
  };

  const goToCats = () => {
    // console.log('------------');
    navigation.navigate("Categories");
  };

  const getCategories = async () => {
    // console.log("------------");
    // console.log(userToken);

    if (userToken) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      await fetch(GlobalVars.urlapi + "/categories", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success && responseJson.data)
            setResult(responseJson.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  let cards = result.map((item, i) => (
    <CategoryCard
      key={i}
      uriimage={item.pictures}
      categoria={item.name}
      redirectid={item.id}
      countproducts={item.countProducts}
      redirectidMethod={redirectPage}
    />
  ));

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        <View style={styles.headerContent}>
          <TitleComponent
            title={TranslateText(lang, "Categorías")}
            color={GlobalVars.grisColor}
            size={22}
          />
          <Text style={styles.viewAllLabel} onPress={() => goToCats()}>
            {TranslateText(lang, "Ver todas")}
          </Text>
        </View>
        <AnimatedScrollView
          style={styles.stylesCarousel}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          snapToInterval={2}
          decelerationRate="fast"
          bounces={false}
          bouncesZoom={true}
          pagingEnabled
          contentContainerStyle={styles.contentCarousel}
        >
          {cards}
        </AnimatedScrollView>
      </View>
    </View>
  );
}
