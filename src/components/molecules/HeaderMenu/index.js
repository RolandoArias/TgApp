import * as React from "react";
import { View, TouchableOpacity, Text, Image, Platform } from "react-native";
import { SearchBar } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Componentes Custom */
import TitleComponent from "../../atoms/Titles";
import BlueTextComponent from "../../atoms/BlueText";
import LabelTextComponent from "../../atoms/LabelText";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
export default function HeaderMenuComponent({
  name,
  question = "",
  searchlabel = "Buscar",
  lang = "es",
  ...props
}) {
  const [printLabel, setPrintlabel] = React.useState("");

  React.useEffect(() => {
    // console.log(name);
  }, []);

  const returnAction = () => {
    if (props.Action) {
      props.Action();
    }
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.container}>
        <Text>Hola! Juan Jose</Text>
      </View>
    </View>
  );
}
