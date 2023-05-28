import * as React from "react";

import { View, Modal, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

import GlobalVars from "../../../global/globalVars";

/** Import Custom elements */
import ButtonComponent from "../../atoms/ButtonComponent";
import LabelTextComponent from "../../atoms/LabelText";

import Styles from "./style";

const styles = Styles;

const ModalsCheckout = ({
  navigation,
  visible = true,
  lang = "es",
  ...props
}) => {
  const [modalVisible, setModalVisible] = React.useState(visible);

  const Action = () => {
    setModalVisible(!modalVisible);
    if (props.CloseModal) {
      if (props.isUpdateCheckout) {
        props.CloseModal(1);
      } else if (props.isDropCheckout) {
        props.CloseModal(2);
      } else if (props.isUpdateAddresses) {
        props.CloseModal(3);
      } else if (props.isNoSelectedAddress) {
        props.CloseModal(4);
      } else if (props.isUpdated) {
        props.CloseModal(5);
      } else if (props.isNoSelectedPayMethod) {
        props.CloseModal(6);
      } else if (props.isNoSelectedPayCard) {
        props.CloseModal(7);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        null;
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Agregado al carrito */}
          {props.isAddcheckout && (
            <Image
              style={styles.stretch}
              source={require("../../../../assets/images/Checkout/addCheckout.png")}
            />
          )}
          {props.isAddcheckout && (
            <LabelTextComponent
              text={TranslateText(lang, "¡Producto agregado al carrito!")}
              color={GlobalVars.grisText}
              size={14}
            />
          )}
          {props.isAddcheckout && (
            <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
          )}

          {/* Actualizando del carrito */}
          {props.isUpdateCheckout && (
            <Image
              style={styles.stretch}
              source={require("../../../../assets/images/Checkout/addCheckout.png")}
            />
          )}
          {props.isUpdateCheckout && (
            <LabelTextComponent
              text={TranslateText(lang, "¡Carrito actualizado!")}
              color={GlobalVars.grisText}
              size={14}
            />
          )}
          {props.isUpdateCheckout && (
            <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
          )}

          {/* Eliminando del carrito */}
          {props.isDropCheckout && (
            <Image
              style={styles.stretch}
              source={require("../../../../assets/images/Checkout/addCheckout.png")}
            />
          )}
          {props.isDropCheckout && (
            <LabelTextComponent
              text={TranslateText(lang, "¡Producto eliminado!")}
              color={GlobalVars.grisText}
              size={14}
            />
          )}
          {props.isDropCheckout && (
            <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
          )}

          {/* Actualizando las direcciones */}
          {props.isUpdateAddresses && (
            <Image
              style={styles.stretch}
              source={require("../../../../assets/images/Checkout/addCheckout.png")}
            />
          )}
          {props.isUpdateAddresses && (
            <LabelTextComponent
              text={TranslateText(lang, "¡Direcciones actualizadas!")}
              color={GlobalVars.grisText}
              size={14}
            />
          )}
          {props.isUpdateAddresses && (
            <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
          )}

          {/* Dirección no seleccionada aún */}
          {props.isNoSelectedAddress && (
            <Image
              style={styles.stretch}
              source={require("../../../../assets/images/Checkout/addCheckout.png")}
            />
          )}
          {props.isNoSelectedAddress && (
            <LabelTextComponent
              text={TranslateText(
                lang,
                "¡No ha seleccionado una dirección de envío!"
              )}
              color={GlobalVars.grisText}
              size={14}
            />
          )}
          {props.isNoSelectedAddress && (
            <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
          )}

          {/* Metodo de pago no seleeccionado */}
          {props.isNoSelectedPayMethod && (
            <Image
              style={styles.stretch}
              source={require("../../../../assets/images/Checkout/addCheckout.png")}
            />
          )}
          {props.isNoSelectedPayMethod && (
            <LabelTextComponent
              text={TranslateText(lang, "Pay method no selected")}
              color={GlobalVars.grisText}
              size={14}
            />
          )}
          {props.isNoSelectedPayMethod && (
            <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
          )}

          {/* Tarjeta de pago no seleeccionada */}
          {props.isNoSelectedPayCard && (
            <Image
              style={styles.stretch}
              source={require("../../../../assets/images/Checkout/addCheckout.png")}
            />
          )}
          {props.isNoSelectedPayCard && (
            <LabelTextComponent
              text={TranslateText(lang, "Card no selected")}
              color={GlobalVars.grisText}
              size={14}
            />
          )}
          {props.isNoSelectedPayCard && (
            <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
          )}

          {/* Algo se actualiza */}
          {props.isUpdated && (
            <Image
              style={styles.stretch}
              source={require("../../../../assets/images/Checkout/addCheckout.png")}
            />
          )}
          {props.isUpdated && (
            <LabelTextComponent
              text={TranslateText(lang, "Updated")}
              color={GlobalVars.grisText}
              size={14}
            />
          )}
          {props.isUpdated && (
            <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalsCheckout;
