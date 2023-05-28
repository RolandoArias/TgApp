import * as React from "react";

import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";

import { AntDesign } from "@expo/vector-icons";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Global vars */
import GlobalVars from "../../../global/globalVars";

/** Import Custom elements */
import LabelTextComponent from "../../atoms/LabelText";
import InputEntry from "../../molecules/InputEntry";
import ButtonComponent from "../../atoms/ButtonComponent";

import Styles from "./style";

const LATITUD_DELTA = 0.0922;
const LONGITUDE_DELTA =
  LATITUD_DELTA + GlobalVars.windowWidth / GlobalVars.windowHeight;

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ModalEditAddress = ({
  visible = true,
  lang = "es",
  addressToEdit = {},
  ...props
}) => {
  const [idAdd, setIdAdd] = React.useState(addressToEdit.id);
  const [nameAddress, setNameAddres] = React.useState(addressToEdit.name);
  const [descriptionAddress, setearDescriptionAddress] = React.useState(
    addressToEdit.desc
  );
  const [coords, setCoords] = React.useState(addressToEdit.coordinates);

  const Action = () => {
    if (props.ctrlModal) {
      props.ctrlModal();
    }
  };

  const setearNameAddress = (val) => {
    setNameAddres(val);
  };

  const setearDescAddress = (val) => {
    setearDescriptionAddress(val);
  };

  const changeData = () => {
    if (props.changeData) {
      props.changeData(idAdd, nameAddress, descriptionAddress, coords);
    }
  };

  const dropData = () => {};

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
          {/** Close Element */}
          <TouchableOpacity style={styles.closeElement} onPress={Action}>
            <AntDesign name="close" size={20} color={GlobalVars.firstColor} />
          </TouchableOpacity>

          <LabelTextComponent
            text={TranslateText(lang, "Update address")}
            color={GlobalVars.bluePantone}
            size={18}
          />

          <AnimatedScrollView
            style={styles.stylesResult}
            contentContainerStyle={styles.contentResult}
          >
            <View style={styles.detailAddress}>
              <LabelTextComponent
                text={nameAddress}
                color={GlobalVars.grisIntermediate}
                size={12}
              />
              {nameAddress !== "" && (
                <LabelTextComponent
                  text={`${coords.latitude}, ${coords.longitude}`}
                  color={GlobalVars.grisIntermediate}
                  size={12}
                />
              )}
            </View>
            <View style={styles.viewMap}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  latitudeDelta: LATITUD_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                provider="google"
              >
                <Marker
                  coordinate={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                  }}
                  title={TranslateText(lang, "Your position")}
                  pinColor={GlobalVars.bluePantone}
                  draggable={true}
                  onDragStart={(e) => {}}
                  onDragEnd={(e) => {
                    setCoords({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    });
                  }}
                >
                  <Callout>
                    <LabelTextComponent
                      text={TranslateText(lang, "Your position")}
                      color={GlobalVars.black}
                      size={15}
                    />
                  </Callout>
                </Marker>
                <Circle
                  center={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                  }}
                  radius={5000}
                ></Circle>
              </MapView>
            </View>
          </AnimatedScrollView>
          <View style={styles.containerBottom}>
            <InputEntry
              label={TranslateText(lang, "Nombre o dirección")}
              iconName="map-pin"
              textvariable={nameAddress}
              setValue={setearNameAddress}
            />
            <InputEntry
              label={TranslateText(lang, "Descripcion")}
              iconName="align-center"
              textvariable={descriptionAddress}
              setValue={setearDescAddress}
            />
            <ButtonComponent
              text={TranslateText(lang, "Update address")}
              iconName="arrowright"
              Action={changeData}
            />
            <ButtonComponent
              text={TranslateText(lang, "Delete")}
              color="white"
              iconName="delete"
              Action={dropData}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditAddress;
