import * as React from "react";

import { Fab } from "native-base";

import { AntDesign } from "@expo/vector-icons";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

const FABOff = ({ onHandle }) => {
  return (
    <Fab
      active={true}
      direction="up"
      position="absolute"
      containerStyle={{}}
      style={{ backgroundColor: GlobalVars.firstColor }}
      onPress={() => onHandle()}
    >
      <AntDesign name="poweroff" size={24} color={GlobalVars.white} />
    </Fab>
  );
};

export default FABOff;
