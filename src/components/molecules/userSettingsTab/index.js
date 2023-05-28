import * as React from "react";
import { View, TouchableOpacity } from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Components */
import LabelTextComponent from "../../atoms/LabelText";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function UserSettingOption({ option_id, icon, text, ...props }) {
  const returnAction = (id) => {
    if (props.setSeleccionableOption) {
      props.setSeleccionableOption(id);
    } else if (props.returnBack) {
      props.returnBack();
    }
  };

  if (!option_id || !icon || !text) return null;

  return (
    <TouchableOpacity
      style={styles.containerTab}
      onPress={() => returnAction(option_id)}
    >
      <View
        style={[styles.content, { borderTopWidth: props.noLineTop ? 0 : 1 }]}
      >
        <Feather
          name={icon}
          size={24}
          color={GlobalVars.firstColor}
          style={styles.iconLeft}
        />
        <LabelTextComponent
          text={text}
          color={GlobalVars.grisIntermediate}
          size={14}
        />
        {props.noArrowRight || (
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={GlobalVars.grisIntermediate}
            style={styles.iconRight}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
