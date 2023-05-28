import * as React from "react";
import { Platform, StyleSheet } from "react-native";

import Constants from "expo-constants";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  viewRoot: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 0,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: GlobalVars.windowHeight / 2,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: GlobalVars.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.65,
    shadowRadius: 10.84,
    elevation: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 50 },
    textShadowRadius: 10,
  },

  headercard: {
    height: Platform.OS === "ios" ? "80%" : "85%",
    width: "100%",
  },

  scrollView: {
    backgroundColor: "transparent",
    width: "100%",
  },

  contentContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },

  footercard: {
    height: Platform.OS === "ios" ? "20%" : "15%",
    width: "100%",
  },

  texttitle: {
    color: GlobalVars.azulOscuro,
    fontFamily: GlobalVars.fontFamily,
    fontSize: 18,
  },

  textprice: {
    color: GlobalVars.bluePantone,
    fontFamily: GlobalVars.fontFamily,
    fontSize: 18,
    marginTop: 15,
  },

  textdescription: {
    fontFamily: GlobalVars.fontFamily,
    fontSize: 13,
    color: GlobalVars.azulOscuro,
    textAlign: "justify",
    marginTop: 15,
  },

  texttitledetails: {
    fontFamily: GlobalVars.fontFamily,
    fontSize: 18,
    color: GlobalVars.bluePantone,
    marginTop: 15,
  },

  textdetails: {
    fontFamily: GlobalVars.fontFamily,
    fontSize: 13,
    color: GlobalVars.azulOscuro,
    textAlign: "justify",
    marginTop: 15,
  },

  buyproduct: {
    backgroundColor: GlobalVars.grisOscuro,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  leftlad: {
    width: "40%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  rightlad: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  qtystyle: {
    color: GlobalVars.bluePantone,
    fontFamily: GlobalVars.fontFamily,
    fontSize: 17,
  },

  floatWishIcon: {
    position: "absolute",
    top: 10,
    right: 25,
  },
});

export default Styles;
