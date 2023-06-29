import React from "react";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Componentes Custom */
import UserSettingOption from "../../molecules/userSettingsTab";

import Styles from "./style";

const styles = Styles;

const UserOptions = ({ lang = "es", ...props }) => {
  const setSeleccionableOption = (id) => {
    if (props.setSeleccionableOption) {
      props.setSeleccionableOption(id);
    }
  };

  const CloseScreen = () => {
    if (props.CloseScreen) {
      props.CloseScreen();
    }
  };

  return (
    <>
      <UserSettingOption
        option_id={1}
        icon="settings"
        text={TranslateText(lang, "Mi cuenta")}
        setSeleccionableOption={setSeleccionableOption}
      />

      <UserSettingOption
        option_id={2}
        icon="map-pin"
        text={TranslateText(lang, "Mis direcciones")}
        setSeleccionableOption={setSeleccionableOption}
        noLineTop
      />

      <UserSettingOption
        option_id={3}
        icon="credit-card"
        text={TranslateText(lang, "Pago por tarjeta")}
        setSeleccionableOption={setSeleccionableOption}
        noLineTop
      />

      <UserSettingOption
        option_id={4}
        icon="help-circle"
        text={TranslateText(lang, "FAQs")}
        setSeleccionableOption={setSeleccionableOption}
        noLineTop
      />

      <UserSettingOption
        option_id={5}
        icon="arrow-left-circle"
        text={TranslateText(lang, "Salir de mi cuenta")}
        returnBack={CloseScreen}
        noLineTop
        noArrowRight
      />
    </>
  );
};

export default UserOptions;
