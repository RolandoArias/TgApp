import * as React from "react";
import { Platform, StyleSheet } from "react-native";

import Constants from "expo-constants";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },

  buttonReturn: {
    position: "absolute",
    left: 25,
    top: 30,
    zIndex: 10,
  },

  viewCategories: {
    zIndex: 2,
    backgroundColor: GlobalVars.fondoPrincipal,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
    paddingBottom: 0,
    // paddingHorizontal: 20,
  },

  positiontitleiOS: {
    position: "absolute",
    top: 30,
  },

  title: {
    fontSize: 24,
    fontFamily: GlobalVars.fontFamily,
    color: GlobalVars.bluePantone,
  },

  scrollView: {
    backgroundColor: "transparent",
    width: "100%",
  },

  contentContainer: {
    // paddingTop: Constants.statusBarHeight,
    paddingBottom: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  infoContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },

  filterbtn: {
    marginLeft: GlobalVars.windowWidth / 4,
    display: "none",
  },
});

export default Styles;
