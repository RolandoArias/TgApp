import * as React from "react";
import { Platform, StyleSheet } from "react-native";

import Constants from "expo-constants";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewProduct: {
    zIndex: 1,
    backgroundColor: GlobalVars.fondoPrincipal,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: Constants.statusBarHeight,
    paddingBottom: 0,
    // paddingHorizontal: 20,
    width: "100%",
  },

  buttonReturn: {
    position: "absolute",
    left: 25,
    top: 30,
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

  loadingText: {
    color: GlobalVars.firstColor,
    fontFamily: GlobalVars.fontFamily,
    fontSize: 20,
  },

  positiontitleAndroid: {
    position: "absolute",
    top: -(GlobalVars.windowHeight * 0.035),
  },

  positiontitleiOS: {
    position: "absolute",
    top: 30,
  },

  title: {
    fontSize: 18,
    fontFamily: GlobalVars.fontFamily,
    color: GlobalVars.bluePantone,
  },

  image: {
    width:
      Platform.OS === "ios"
        ? GlobalVars.windowWidth / 2.5
        : GlobalVars.windowWidth / 2,
    height:
      Platform.OS === "ios"
        ? GlobalVars.windowWidth / 2.5
        : GlobalVars.windowWidth / 2,
    resizeMode: "contain",
  },
});

export default Styles;
