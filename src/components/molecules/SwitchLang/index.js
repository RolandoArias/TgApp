import * as React from "react";
import { Text, TouchableOpacity } from "react-native";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const SwitchEntryLang = ({ lang = "es", ...props }) => {
  React.useEffect(() => {}, []);

  const setValue = () => {
    let value = lang === "es" ? "en" : "es";
    // console.log( value );
    if (props.setLanguage) {
      props.setLanguage(value);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={() => setValue()}>
      {lang === "es" && <Text style={styles.texto}>EN</Text>}
      {lang === "en" && <Text style={styles.texto}>ES</Text>}
    </TouchableOpacity>
  );
};

export default SwitchEntryLang;
