import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function AddressCard({
  lang = "es",
  name,
  desc,
  dateAt,
  coordinates,
  id,
  ...props
}) {
  const returnAction = (id) => {
    if (props.setearAddress) {
      props.setearAddress(id);
    }
  };

  const editAddress = (id, name, desc, coordinates) => {
    if (props.editAddress) {
      props.editAddress(id, name, desc, coordinates);
    }
  };

  if (!id) return null;

  return (
    <TouchableOpacity
      style={styles.containerCard}
      onPress={() => returnAction(id)}
    >
      <View style={styles.contentCard}>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.textDesc}>{desc}</Text>
        <View style={styles.viewDate}>
          <Text style={styles.date}>{dateAt}</Text>
          {!props.noEdit && (
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => editAddress(id, name, desc, coordinates)}
            >
              <Text style={styles.textEdit}>
                {TranslateText(lang, "Editar")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <MaterialIcons
          style={styles.iconTop}
          name="gps-fixed"
          size={24}
          color={GlobalVars.firstColor}
        />
        {props.isSelected && (
          <Feather
            style={styles.iconBottom}
            name="check-circle"
            size={24}
            color={GlobalVars.firstColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
