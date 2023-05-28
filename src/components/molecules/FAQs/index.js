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

export default function FAQOption({ option_id, title, text, ...props }) {
  const [visible, setVisible] = React.useState(false);

  if (!option_id || !title || !text) return null;

  return (
    <>
      <TouchableOpacity
        style={styles.containerTab}
        onPress={() => setVisible(!visible)}
      >
        <View
          style={[styles.content, { borderTopWidth: props.noLineTop ? 0 : 1 }]}
        >
          <Feather
            name="help-circle"
            size={24}
            color={GlobalVars.firstColor}
            style={styles.iconLeft}
          />
          <LabelTextComponent
            text={title}
            color={GlobalVars.grisIntermediate}
            size={14}
          />
          {!visible && (
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color={GlobalVars.grisIntermediate}
              style={styles.iconRight}
            />
          )}
          {visible && (
            <MaterialIcons
              name="keyboard-arrow-up"
              size={24}
              color={GlobalVars.grisIntermediate}
              style={styles.iconRight}
            />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={[styles.contentText, { display: visible ? "flex" : "none" }]}
      >
        <LabelTextComponent
          text={text}
          color={GlobalVars.grisIntermediate}
          size={14}
        />
      </View>
    </>
  );
}
