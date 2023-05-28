import { Platform, StyleSheet } from "react-native";

import Constants from "expo-constants";

import GlobalVars from "../../global/globalVars";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewRoot: {
    backgroundColor: GlobalVars.fondoPrincipal,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    paddingBottom: 0,
    // paddingHorizontal: 20,
  },

  containerScroll: {
    width: "100%",
    height: "100%",
  },

  topContainer: {
    width: "100%",
    height: "70%",
  },

  imageTopBG: {
    flex: 1,
    resizeMode: "cover",
  },

  textIndicatorTop: {
    position: "absolute",
    top: 40,
    left: 25,
  },

  bottomContainer: {
    width: "100%",
    height: "65%",
    position: "absolute",
    bottom: 0,
    backgroundColor: GlobalVars.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    // paddingHorizontal: 20,
  },

  backAction: {
    position: "absolute",
    left: 30,
    top: 50,
    zIndex: 10,
  },

  containerImg: {
    width: "100%",
    height: 1,
    position: "relative",
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  imgProfile: {
    width: 150,
    height: 150,
    borderRadius: 100,
    position: "absolute",
    top: -75,
  },

  separationHead: {
    width: "100%",
    height: 80,
    backgroundColor: "transparent",
    zIndex: 9,
  },

  scrollView: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },

  contentContainer: {
    paddingTop: 10,
    paddingBottom: 30, //TODO
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default Styles;
