import * as React from "react";
import { View, Animated, ScrollView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Componentes Custom */
import TitleComponent from "../../atoms/Titles";
import CardPay from "../../molecules/CardPay";
import CardPayMethod from "../../molecules/PayMethodCard";
import AddressCard from "../../molecules/CardAddress";
import Carretilla from "../../organisms/Carretilla";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ConfirmationComponent({
  lang = "es",
  userToken = null,
  navigation,
  payMethodSelected,
  resultPayCards,
  creditCard,
  cart,
  amount,
  resultAddresses,
  addres,
  ...props
}) {
  // console.log( '--------------------------------' );

  const findCard = resultPayCards.find((element) => element.id === creditCard);
  const findAddress = resultAddresses.find((element) => element.id === addres);
  // console.log({ findAddress });

  React.useEffect(() => {}, []);

  useFocusEffect(React.useCallback(() => {}, []));

  const changeTotal = (newval) => {
    if (props.changeTotal) {
      props.changeTotal(newval);
    }
  };

  const IncrementProduct = (idp) => {
    if (props.IncrementProduct) {
      props.IncrementProduct(idp);
    }
  };

  const DecrementProduct = (idp) => {
    if (props.DecrementProduct) {
      props.DecrementProduct(idp);
    }
  };

  const handleDrop = (id) => {
    if (props.handleDrop) {
      props.handleDrop(id);
    }
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        <AnimatedScrollView
          style={styles.stylesCarousel}
          contentContainerStyle={styles.contentCarousel}
        >
          <TitleComponent
            title={TranslateText(lang, "Envio text")}
            color={GlobalVars.azulOscuro}
            size={18}
          />

          <AddressCard
            id={findAddress.id}
            name={findAddress.name}
            dateAt={findAddress.createAt}
            desc={findAddress.description}
            coordinates={findAddress.coordinates}
            isSelected
            noEdit
          />

          <TitleComponent
            title={TranslateText(lang, "Pago text")}
            color={GlobalVars.azulOscuro}
            size={18}
          />

          <CardPayMethod
            lang={lang}
            icon={
              payMethodSelected === "credit_card" ? "credit-card" : "credit"
            }
            name={
              payMethodSelected === "credit_card" ? "Pay with Card" : "Pay cash"
            }
            value={payMethodSelected === "credit_card" ? "credit_card" : "cash"}
            isSelected
          />

          {payMethodSelected === "credit_card" && (
            <CardPay
              id={findCard.id}
              name={findCard.name}
              titular={findCard.titular}
              type={findCard.type}
              ccv={findCard.ccv}
              numberCard={findCard.numberCard}
              createAt={findCard.createAt}
              isSelected
              noEdit
            />
          )}

          <TitleComponent
            title={TranslateText(lang, "Productos text")}
            color={GlobalVars.azulOscuro}
            size={18}
          />

          {userToken && (
            <Carretilla
              lang={lang}
              userToken={userToken}
              navigation={navigation}
              changeTotal={changeTotal}
              cart={cart}
              handleDrop={handleDrop}
              IncrementProduct={IncrementProduct}
              DecrementProduct={DecrementProduct}
              noTitle
            />
          )}
        </AnimatedScrollView>
      </View>
    </View>
  );
}
