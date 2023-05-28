import * as React from "react";

import { Fab, Icon } from "native-base";

import { Feather } from "@expo/vector-icons";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

const FABCheckout = ({ navigation }) => {
  return (
    <Fab
      position="absolute"
      size="sm"
      style={{ backgroundColor: GlobalVars.firstColor }}
      onPress={() => navigation.navigate("Cart")}
      icon={
        <Icon
          size={5}
          color={GlobalVars.white}
          as={<Feather name="shopping-cart" />}
        />
      }
      bottom={GlobalVars.windowHeight / 12}
    />
  );
};

export default FABCheckout;
