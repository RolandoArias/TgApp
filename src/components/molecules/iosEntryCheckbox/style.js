import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    // height: 35,
  },

  inner: {
    paddingVertical: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  checkview: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    textAlign: "justify",
  },

  textolabel: {
    fontSize: 15,
    textAlign: "justify",
    fontFamily: GlobalVars.fontFamily,
  },

  checkbox: {
    marginRight: 10,
  },

  containerroot: {
    backgroundColor: GlobalVars.white,
    borderColor: "transparent",
    borderWidth: 0,
  },
});

export default Styles;
