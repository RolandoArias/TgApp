import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "transparent",
    position: "absolute",
    top: Constants.statusBarHeight + 10,
    left: GlobalVars.windowWidth - 75,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    zIndex: 1,
  },

  texto: {
    fontSize: 13,
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    fontFamily: GlobalVars.fontFamily,
    width: "100%",
    height: "100%",
    color: GlobalVars.bluePantone,
  },
});

export default Styles;
