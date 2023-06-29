import * as React from "react";
import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  viewOptions: {
    backgroundColor: GlobalVars.grisOscuro,
    padding: Platform.OS === "ios" ? 0 : 0,
    borderRadius: Platform.OS === "ios" ? 0 : 0,
    marginBottom: Platform.OS === "ios" ? 0 : 5,
  },

  viewContent: {
    backgroundColor: GlobalVars.grisOscuro,
    padding: Platform.OS === "ios" ? 0 : 0,
    borderRadius: Platform.OS === "ios" ? 0 : 0,
  },
});

export default Styles;
