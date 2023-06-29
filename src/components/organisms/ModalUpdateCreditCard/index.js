import * as React from "react";

import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

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

const ModalUpdateCreditCard = ({
  visible = true,
  lang = "es",
  cardToEdit = {},
  ...props
}) => {
  const prevCard = React.useRef({ cardToEdit }).current;

  if (!cardToEdit) return null;

  const [idCard, setIdCard] = React.useState(cardToEdit.id || null);
  const [nameCard, setNameCard] = React.useState(cardToEdit.name || null);
  const [titularCard, setTitularCard] = React.useState(
    cardToEdit.titular || null
  );
  const [numberCard, setNumberCard] = React.useState(
    cardToEdit.numberCard || null
  );
  const [typeCard, setTypeCard] = React.useState(cardToEdit.type || null);
  const [ccvCard, setCcvCard] = React.useState(cardToEdit.ccv || null);
  const [endTime, setEndTime] = React.useState(cardToEdit.endDate || null);

  const [monthCard, setMonth] = React.useState(null);
  const [yearCard, setYear] = React.useState(null);

  React.useEffect(() => {
    // console.log( '--------------------------------' );
    // console.log( {prevCard}, {cardToEdit} );
    setIdCard(cardToEdit.id);
    setNameCard(cardToEdit.name);
    setNumberCard(cardToEdit.numberCard);
    setTitularCard(cardToEdit.titular);
    setCcvCard(cardToEdit.ccv);
    setTypeCard(cardToEdit.type);
    setEndTime(cardToEdit.endDate);
    setMonth(cardToEdit.endDate.substring(0, 2));
    setYear(cardToEdit.endDate.substring(2, 4));
  }, []);

  React.useEffect(() => {
    if (prevCard.cardToEdit !== cardToEdit) {
      // console.log( '--------------------------------' );
      // console.log( {prevCard}, {cardToEdit} );
      setIdCard(cardToEdit.id);
      setNameCard(cardToEdit.name);
      setNumberCard(cardToEdit.numberCard);
      setTitularCard(cardToEdit.titular);
      setCcvCard(cardToEdit.ccv);
      setTypeCard(cardToEdit.type);
      setEndTime(cardToEdit.endDate);
      setMonth(cardToEdit.endDate.substring(0, 2));
      setYear(cardToEdit.endDate.substring(2, 4));
    }
    return () => {
      prevCard.cardToEdit = cardToEdit;
    };
  }, [cardToEdit]);

  const Action = () => {
    if (props.ctrlModal) {
      props.ctrlModal();
    }
  };

  const updateCreditCard = () => {
    if (props.updateCreditCard) {
      props.updateCreditCard(
        idCard,
        nameCard,
        ccvCard,
        typeCard,
        titularCard,
        endTime,
        numberCard
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
    setEndTime(val.concat(yearCard));
  };

  const setearYear = (val) => {
    setYear(val);
    setEndTime(monthCard.concat(val));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        null;
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AnimatedScrollView
            style={styles.stylesResult}
            contentContainerStyle={styles.contentResult}
          >
            <LabelTextComponent
              text={TranslateText(lang, "Editar tarjeta")}
              color={GlobalVars.bluePantone}
              size={18}
            />

            {/** Close Element */}
            <TouchableOpacity style={styles.closeElement} onPress={Action}>
              <AntDesign name="close" size={20} color={GlobalVars.firstColor} />
            </TouchableOpacity>

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
              text={TranslateText(lang, "Editar tarjeta")}
              iconName="arrowright"
              Action={updateCreditCard}
            />
          </AnimatedScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUpdateCreditCard;
