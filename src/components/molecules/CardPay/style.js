import * as React from "react";
import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  containerCard: {
    width: "100%",
    backgroundColor: GlobalVars.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.84,
    elevation: 5,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 10,
    marginVertical: 20,
  },

  contentCard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: GlobalVars.white,
    borderRadius: 10,
  },

  textName: {
    color: GlobalVars.grisIntermediate,
    fontSize: 17,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: GlobalVars.fontFamily,
    marginBottom: 10,
    textTransform: "capitalize",
  },

  textDesc: {
    color: GlobalVars.grisIntermediate,
    fontFamily: GlobalVars.fontFamily,
    fontSize: 14,
    width: "70%",
    marginBottom: 10,
  },

  editBtn: {
    position: "absolute",
    right: 20,
    marginLeft: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },

  iconSelect: {
    position: "absolute",
    right: 80,
  },
});

export default Styles;
