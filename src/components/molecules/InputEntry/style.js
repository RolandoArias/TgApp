import * as React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },

  container: {
    flex: 1,
    width: "100%",
  },

  inner: {
    paddingVertical: 8,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  textInput: {
    height: "70%",
    width: "90%",
    borderColor: GlobalVars.grisIntermediate,
    borderBottomWidth: 1,
    fontFamily: GlobalVars.fontFamily,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },

  touchCalendar: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },

  innerCalendar: {
    width: "90%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    borderBottomColor: GlobalVars.grisIntermediate,
    borderBottomWidth: 1,
  },

  textCalendar: {
    fontFamily: GlobalVars.fontFamily,
    fontSize: 17,
    fontWeight: "bold",
  },

  iconstyle: {
    marginRight: 20,
  },

  eye: {
    position: "absolute",
    right: 5,
    top: 3,
  },
});

export default Styles;
