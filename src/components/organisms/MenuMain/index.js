import * as React from "react";
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function MainMenu({
  navigation,
  lang = "es",
  userToken = null,
  ...props
}) {
  const [result, setResult] = React.useState([]);
  const [empty, setEmpty] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getProducts();
  }, [userToken]);

  const goToCats = () => {
    // console.log('------------');
    navigation.navigate("Categories");
  };

  const getProducts = () => {};

  const handleDelete = () => {};
  const redirectPage = (id) => {
    navigation.navigate("Product", { itemProduct: id });
  };

  return (
    <View style={styles.rootMain}>
      <View style={styles.viewContainer}>
        <Text style={styles.titleWishProduct}>
          {TranslateText(lang, "Menu")}
        </Text>
        {loading && (
          <ActivityIndicator
            style={{ alignSelf: "center", marginVertical: 30 }}
            size="large"
            color={GlobalVars.firstColor}
          />
        )}
      </View>
    </View>
  );
}
