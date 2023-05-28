import { StyleSheet } from "react-native";

import GlobalVars from "../../../global/globalVars";

const Styles = StyleSheet.create({
  containerTab: {
    flex: 1,
    width: "100%",
  },

  content: {
    backgroundColor: GlobalVars.fondoPrincipal,
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderTopColor: GlobalVars.grisPlane,
    borderBottomColor: GlobalVars.grisPlane,
    borderBottomWidth: 1,
  },

  iconLeft: {
    marginRight: 20,
  },

  iconRight: {
    position: "absolute",
    right: 10,
  },
});

export default Styles;
