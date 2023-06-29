import * as React from "react";
import { View, Animated, ActivityIndicator, ScrollView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Componentes Custom */
import TitleComponent from "../../atoms/Titles";
import ButtonComponent from "../../atoms/ButtonComponent";
import CardPay from "../../molecules/CardPay";
import CardPayMethod from "../../molecules/PayMethodCard";
import ModalAddCreditCard from "../ModalAddCreditCard";
import ModalUpdateCreditCard from "../ModalUpdateCreditCard";
import FormAddCreditCard from "../FormAddCreditCard";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function PayComponent({
  lang = "es",
  userToken = null,
  result = [],
  payMethodSelected = null,
  loading = true,
  selectedCreditCard = null,
  cardToEdit = {},
  updateModal = false,
  visibleModalAddCard = false,
  ...props
}) {
  // console.log( '--------------------------------' );

  const arrMethods = [
    { id: 1, name: "Pay with Card", value: "credit_card", icon: "credit-card" },
    { id: 2, name: "Pay cash", value: "cash", icon: "credit" },
  ];

  React.useEffect(() => {}, []);

  useFocusEffect(React.useCallback(() => {}, []));

  const setSeleccionable = (value) => {
    if (props.setSeleccionable) {
      props.setSeleccionable(value);
    }
  };

  const setSeleccionableCreditCard = (val) => {
    if (props.setSeleccionableCreditCard) {
      props.setSeleccionableCreditCard(val);
    }
  };

  const setEditCreditCard = (val) => {
    if (props.setEditCreditCard) {
      props.setEditCreditCard(val);
    }
  };

  const triggerModalAddCard = () => {
    if (props.triggerModalAddCard) {
      props.triggerModalAddCard();
    }
  };

  const addCreditCard = (name, titular, number, type, ccv, endDate, where) => {
    if (props.addCreditCard) {
      props.addCreditCard(name, titular, number, type, ccv, endDate, where);
    }
  };

  const triggerModalUpdateCard = () => {
    if (props.triggerModalUpdateCard) {
      props.triggerModalUpdateCard();
    }
  };

  const updateCreditCard = (id, name, ccv, type, titular, endDate, number) => {
    if (props.updateCreditCard) {
      props.updateCreditCard(id, name, ccv, type, titular, endDate, number);
    }
  };

  let cardsMethods = arrMethods.map((item, i) => {
    if (item.value === payMethodSelected) {
      return (
        <CardPayMethod
          key={"paymethod_" + i}
          lang={lang}
          icon={item.icon}
          name={item.name}
          value={item.value}
          setSeleccionable={setSeleccionable}
          isSelected
        />
      );
    } else {
      return (
        <CardPayMethod
          key={"paymethod_" + i}
          lang={lang}
          icon={item.icon}
          name={item.name}
          value={item.value}
          setSeleccionable={setSeleccionable}
        />
      );
    }
  });

  let cards = result.map((item, i) => {
    if (item.id === selectedCreditCard) {
      return (
        <CardPay
          key={"carpay_" + i}
          id={item.id}
          name={item.name}
          titular={item.titular}
          type={item.type}
          ccv={item.ccv}
          numberCard={item.numberCard}
          createAt={item.createAt}
          endDate={item.endDate}
          setSeleccionableCreditCard={setSeleccionableCreditCard}
          setEditCreditCard={setEditCreditCard}
          isSelected
        />
      );
    } else {
      return (
        <CardPay
          key={"carpay_" + i}
          id={item.id}
          name={item.name}
          titular={item.titular}
          type={item.type}
          ccv={item.ccv}
          numberCard={item.numberCard}
          createAt={item.createAt}
          endDate={item.endDate}
          setSeleccionableCreditCard={setSeleccionableCreditCard}
          setEditCreditCard={setEditCreditCard}
        />
      );
    }
  });

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        <AnimatedScrollView
          style={styles.stylesCarousel}
          contentContainerStyle={styles.contentCarousel}
        >
          <TitleComponent
            title={TranslateText(lang, "Pay method")}
            color={GlobalVars.azulOscuro}
            size={18}
          />
          {cardsMethods}
          <TitleComponent
            title={TranslateText(lang, "Select card")}
            color={GlobalVars.azulOscuro}
            size={18}
          />
          {loading && (
            <ActivityIndicator
              style={{ alignSelf: "center", marginVertical: 30 }}
              size="large"
              color={GlobalVars.firstColor}
            />
          )}
          {!loading && cards}
          {!result.length ? (
            <FormAddCreditCard lang={lang} addCreditCard={addCreditCard} />
          ) : (
            <ButtonComponent
              text={TranslateText(lang, "Agregar tarjeta")}
              color="empty"
              iconLeft="pluscircleo"
              Action={triggerModalAddCard}
            />
          )}
        </AnimatedScrollView>
      </View>
      <ModalAddCreditCard
        visible={visibleModalAddCard}
        lang={lang}
        ctrlModal={triggerModalAddCard}
        addCreditCard={addCreditCard}
      />
      {cardToEdit?.id && (
        <ModalUpdateCreditCard
          visible={updateModal}
          lang={lang}
          cardToEdit={cardToEdit}
          ctrlModal={triggerModalUpdateCard}
          updateCreditCard={updateCreditCard}
        />
      )}
    </View>
  );
}
