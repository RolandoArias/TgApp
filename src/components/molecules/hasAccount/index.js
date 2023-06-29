import React from "react";

import { View, Text } from "react-native";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;

const HasAccount = ({ lang = "es", ...props }) => {
  const nothasaccount = props.nothasaccount ? true : undefined;

  const handleTextBold = () => {
    if (props.hasaccount) {
      props.hasaccount();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.texto, styles.textoSimple]}>
        {nothasaccount
          ? TranslateText(lang, "¿No tienes una cuenta?")
          : TranslateText(lang, "¿Ya tienes cuenta?")}
      </Text>
      <Text
        style={[styles.texto, styles.textoNegrita]}
        onPress={() => handleTextBold()}
      >
        {nothasaccount
          ? TranslateText(lang, "Crea una cuenta")
          : TranslateText(lang, "Inicia Sesión")}
      </Text>
    </View>
  );
};

export default HasAccount;
