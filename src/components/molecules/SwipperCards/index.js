import * as React from "react";
import { View, Image } from "react-native";

import Swiper from "react-native-swiper";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Componentes Custom */
import TitleComponent from "../../atoms/Titles";
import BlueTextComponent from "../../atoms/BlueText";
import LabelTextComponent from "../../atoms/LabelText";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
export default function SwiperComponent({ lang = "es" }) {
  return (
    <View style={styles.rootView}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        activeDotColor={GlobalVars.bluePantone}
      >
        <View style={styles.slide1}>
          <Image
            style={styles.stretch}
            source={require("../../../../assets/images/login/logo.jpg")}
          />
          <TitleComponent
            title={TranslateText(lang, "Bienvenido a TG App")}
            color={GlobalVars.grisColor}
            size={26}
          />
          <Image
            style={styles.normal}
            source={require("../../../../assets/images/login/img_01_cart.png")}
          />
          <BlueTextComponent
            text={TranslateText(lang, "Compra en línea")}
            color={GlobalVars.bluePantone}
            size={18}
          />
          <LabelTextComponent
            text={TranslateText(lang, "Accede a miles de productos")}
            color={GlobalVars.grisText}
            size={14}
          />
        </View>
        <View style={styles.slide2}>
          <Image
            style={styles.stretch}
            source={require("../../../../assets/images/login/logo.jpg")}
          />
          <TitleComponent
            title={TranslateText(lang, "Bienvenido a TG App")}
            color={GlobalVars.grisColor}
            size={26}
          />
          <Image
            style={styles.normal}
            source={require("../../../../assets/images/login/img_02_user.png")}
          />
          <BlueTextComponent
            text={TranslateText(lang, "Detalles de productos")}
            color={GlobalVars.bluePantone}
            size={18}
          />
          <LabelTextComponent
            text={TranslateText(lang, "Te gusta revisar a detalle")}
            color={GlobalVars.grisText}
            size={14}
          />
        </View>
      </Swiper>
    </View>
  );
}
