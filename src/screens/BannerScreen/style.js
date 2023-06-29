import { Platform, StyleSheet } from "react-native";

import Constants from "expo-constants";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewRoot: {
    zIndex: 1,
    backgroundColor: GlobalVars.fondoPrincipal,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight + 30,
    paddingBottom: 0,
    // paddingHorizontal: 20,
    width: "100%",
  },

  buttonReturn: {
    position: "absolute",
    left: 25,
    top: Platform.OS === "ios" ? 30 : 70,
    zIndex: 10,
  },

  scrollView: {
    backgroundColor: "transparent",
    width: "100%",
  },

  contentContainer: {
    paddingTop: Constants.statusBarHeight + 35,
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  positiontitle: {
    position: "absolute",
    top: Platform.OS === "ios" ? 30 : 70,
  },

  image: {
    width: GlobalVars.windowWidth / 1.3,
    height: GlobalVars.windowWidth / 1.3,
    resizeMode: "contain",
    borderRadius: 7,
  },
});

export default Styles;
