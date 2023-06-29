import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function CardPay({
  id,
  name,
  titular,
  type,
  ccv,
  numberCard,
  createAt,
  endDate,
  ...props
}) {
  const returnAction = (id) => {
    if (props.setSeleccionableCreditCard) {
      props.setSeleccionableCreditCard(id);
    }
  };

  const returnEdit = (id, name, titular, type, ccv, numberCard, endDate) => {
    if (props.setEditCreditCard) {
      props.setEditCreditCard({
        id,
        name,
        titular,
        type,
        ccv,
        numberCard,
        endDate,
      });
    }
  };

  if (!id || !name || !numberCard || !titular) return null;

  const parseNumberCard = () => {
    return (
      numberCard.substring(0, 4) + " **** **** " + numberCard.substring(12, 16)
    );
  };

  return (
    <TouchableOpacity
      style={styles.containerCard}
      onPress={() => returnAction(id)}
    >
      <View style={styles.contentCard}>
        <Text style={styles.textName}>{type}</Text>
        <Text style={styles.textDesc}>{parseNumberCard()}</Text>
        {!props.noEdit && (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => returnEdit(id, name, titular, type, ccv, numberCard, endDate)}
          >
            <Feather name="edit-2" size={24} color={GlobalVars.firstColor} />
          </TouchableOpacity>
        )}
        {props.isSelected && (
          <Feather
            style={[styles.iconSelect, { right: props.noEdit ? 20 : 80}]}
            name="check-circle"
            size={24}
            color={GlobalVars.firstColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
