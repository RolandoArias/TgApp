import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Feather, Entypo } from "@expo/vector-icons";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function CardPayMethod({ icon, name, value, lang, ...props }) {

  const setSeleccionable = (value) => {
    if( props.setSeleccionable ){
      props.setSeleccionable(value);
    }
  }

  if (!name || !value) return null;

  return (
    <TouchableOpacity style={styles.containerCard} onPress={() => setSeleccionable(value)}>
      <View style={styles.contentCard}>
        <Entypo
          style={styles.payicon}
          name={icon}
          size={24}
          color={props.isSelected ? GlobalVars.firstColor : GlobalVars.grisIntermediate}
        />
        <Text style={styles.textName}>{TranslateText(lang, name)}</Text>
        {props.isSelected && (
          <Feather
            style={styles.iconSelected}
            name="check-circle"
            size={24}
            color={GlobalVars.firstColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
