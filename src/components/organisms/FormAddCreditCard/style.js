import * as React from "react";

import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
  },

  formView: {
    marginTop: 20,
    backgroundColor: GlobalVars.fondoPrincipal,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  stylesResult: {
    width: "100%",
  },

  contentResult: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 15,
    flexDirection: "column",
  },

  divider: {
    width: "100%",
    height: 30,
  },

  viewSelecteType: {
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
  },
});

export default Styles;
