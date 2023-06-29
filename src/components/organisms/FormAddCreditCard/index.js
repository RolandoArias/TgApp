import * as React from "react";

import { View, Animated, ScrollView } from "react-native";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Global vars */
import GlobalVars from "../../../global/globalVars";

/** Import Custom elements */
import LabelTextComponent from "../../atoms/LabelText";
import ButtonComponent from "../../atoms/ButtonComponent";
import InputEntry from "../../molecules/InputEntry";
import CheckboxEntryIos from "../../molecules/iosEntryCheckbox";

import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const FormAddCreditCard = ({ lang = "es", ...props }) => {
  const [nameCard, setNameCard] = React.useState(null);
  const [titularCard, setTitularCard] = React.useState(null);
  const [numberCard, setNumberCard] = React.useState(null);
  const [typeCard, setTypeCard] = React.useState(null);
  const [ccvCard, setCcvCard] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [monthCard, setMonth] = React.useState(null);
  const [yearCard, setYear] = React.useState(null);

  const addCreditCard = () => {
    if (props.addCreditCard) {
      props.addCreditCard(
        nameCard,
        titularCard,
        numberCard,
        typeCard,
        ccvCard,
        endDate,
        2
      );
    }
  };

  const setearNameCard = (val) => {
    setNameCard(val);
  };

  const setearTitularCard = (val) => {
    setTitularCard(val);
  };

  const setearNumberCard = (val) => {
    setNumberCard(val);
  };

  const setearCCV = (val) => {
    setCcvCard(val);
  };

  const setearTypeCard = (val) => {
    setTypeCard(val);
  };

  const setearMonnth = (val) => {
    setMonth(val);
    setEndDate(val.concat(yearCard));
  };

  const setearYear = (val) => {
    setYear(val);
    setEndDate(monthCard.concat(val));
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.formView}>
        <AnimatedScrollView
          style={styles.stylesResult}
          contentContainerStyle={styles.contentResult}
        >
          <LabelTextComponent
            text={TranslateText(lang, "Agregar tarjeta")}
            color={GlobalVars.bluePantone}
            size={18}
          />

          <InputEntry
            label={TranslateText(lang, "Nombre de tarjeta")}
            iconName="align-center"
            textvariable={nameCard}
            setValue={setearNameCard}
          />
          <InputEntry
            label={TranslateText(lang, "Titular de tarjeta")}
            iconName="user"
            textvariable={titularCard}
            setValue={setearTitularCard}
          />

          <InputEntry
            label={TranslateText(lang, "Numero de tarjeta")}
            iconName="credit-card"
            textvariable={numberCard}
            setValue={setearNumberCard}
            type="creditCardNumber"
            keyboard="number-pad"
            maxlong={16}
          />

          <InputEntry
            label={TranslateText(lang, "CCV de tarjeta")}
            iconName="credit-card"
            textvariable={ccvCard}
            setValue={setearCCV}
            keyboard="number-pad"
            maxlong={3}
          />

          <InputEntry
            label={TranslateText(lang, "Mes de vencimiento tarjeta")}
            iconName="credit-card"
            textvariable={monthCard}
            setValue={setearMonnth}
            keyboard="number-pad"
            maxlong={2}
          />

          <InputEntry
            label={TranslateText(lang, "Año de vencimiento tarjeta")}
            iconName="credit-card"
            textvariable={yearCard}
            setValue={setearYear}
            keyboard="number-pad"
            maxlong={2}
          />

          <View style={styles.divider}></View>

          <View style={styles.viewSelecteType}>
            <LabelTextComponent
              text={TranslateText(lang, "Select your type card")}
              color={GlobalVars.bluePantone}
              size={15}
            />
            {typeCard === "mastercard" ? (
              <CheckboxEntryIos
                label={TranslateText(lang, "Mastercard")}
                setValue={() => setearTypeCard("mastercard")}
                statuscheck={true}
              />
            ) : (
              <CheckboxEntryIos
                label={TranslateText(lang, "Mastercard")}
                setValue={() => setearTypeCard("mastercard")}
              />
            )}
            {typeCard === "visa" ? (
              <CheckboxEntryIos
                label={TranslateText(lang, "Visa")}
                setValue={() => setearTypeCard("visa")}
                statuscheck={true}
              />
            ) : (
              <CheckboxEntryIos
                label={TranslateText(lang, "Visa")}
                setValue={() => setearTypeCard("visa")}
              />
            )}
          </View>

          <View style={styles.divider}></View>

          <ButtonComponent
            text={TranslateText(lang, "Agregar tarjeta")}
            iconName="arrowright"
            Action={addCreditCard}
          />
        </AnimatedScrollView>
      </View>
    </View>
  );
};

export default FormAddCreditCard;
