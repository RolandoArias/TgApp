import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  wrapper: {},

  rootView: {
    width: "100%",
    height: GlobalVars.windowHeight < 600 ? 600 : GlobalVars.windowHeight / 1.35,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  stretch: {
    width: GlobalVars.windowWidth / 5,
    height: GlobalVars.windowHeight / 10,
    borderRadius: 15,
    resizeMode: "contain",
    marginBottom: 20,
  },

  normal: {
    width: GlobalVars.windowWidth / 2,
    height: GlobalVars.windowHeight / 4,
    resizeMode: "contain",
  },
});

export default Styles;
