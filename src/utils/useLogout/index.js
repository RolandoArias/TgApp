import AsyncStorage from "@react-native-async-storage/async-storage";
const processingLogout = async () => {
  try {
    AsyncStorage.removeItem("currentUserAcces");
    AsyncStorage.removeItem("currentUserShowName");
    AsyncStorage.removeItem("currentToken");
    return "complete";
  } catch (e) {
    return "error";
  }
};

export default processingLogout;
