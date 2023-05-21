import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

export default function BuyedCard({
  totalproducts,
  totalpricefinal,
  totalpricereal,
  date,
  ...props
}) {
  const returnAction = (id) => {
    if (
      props.redirectidMethod &&
      props.redirectid !== undefined &&
      props.redirectid !== null
    ) {
      props.redirectidMethod(id);
    }
  };

  if (props.redirectid === undefined || props.redirectid === null) return null;

  return (
    <TouchableOpacity
      style={styles.containerCard}
      onPress={() => returnAction(props.redirectid)}
    >
      <View style={styles.headerCard}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.textTotal}>{totalproducts + " Productos"}</Text>
        <View style={styles.footerCard}>
          <Text style={styles.textPriceFinal}>${totalpricefinal}</Text>
          <Text style={[styles.textPriceReal, { display: "none" }]}>
            {" "}
            ${totalpricereal}
          </Text>
          <View style={styles.iconView}>
            <AntDesign name="shoppingcart" size={24} color={GlobalVars.white} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
