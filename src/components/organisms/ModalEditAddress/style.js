import * as React from "react";

import { StyleSheet, Platform } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    marginTop: 20,
    backgroundColor: GlobalVars.fondoPrincipal,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 15,
    // paddingHorizontal: 10,
    width: "100%",
    height: Platform.OS === "ios" ? "92%" : "100%",
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

  containerSearch: {
    backgroundColor: "transparent",
    width: "100%",
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 10,
    height: 44,
    padding: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },

  inputContainerStyle: {
    backgroundColor: GlobalVars.grisPlane,
    height: 44,
    padding: 0,
  },

  inputStyle: {
    backgroundColor: "transparent",
    color: GlobalVars.grisColor,
    height: 44,
    padding: 0,
  },

  leftIconContainerStyle: {
    color: GlobalVars.grisColor,
  },

  closeElement: {
    position: "absolute",
    right: 20,
    top: 20,
    borderColor: GlobalVars.firstColor,
    borderWidth: 2,
    borderRadius: 75,
    padding: 2,
  },

  stylesResult: {
    width: "100%",
  },

  contentResult: {
    paddingTop: 25,
    // paddingHorizontal: 10,
    paddingBottom: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  detailAddress: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewMap: {
    width: "100%",
    height: "100%",
  },

  map: {
    width: GlobalVars.windowWidth,
    height:
      GlobalVars.windowHeight > 400
        ? GlobalVars.windowHeight/2
        : GlobalVars.windowHeight/3,
    borderRadius: 7,
  },

  containerBottom: {
    width: '100%',
    height: '45%',
    backgroundColor: GlobalVars.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
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
    paddingHorizontal: 25,
    paddingVertical: GlobalVars.windowHeight < 400 ? 20 : 5,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column'
},
  
});

export default Styles;
