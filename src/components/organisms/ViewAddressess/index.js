import * as React from "react";
import {
  View,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Componentes Custom */
import TitleComponent from "../../atoms/Titles";
import ButtonComponent from "../../atoms/ButtonComponent";
import AddressCard from "../../molecules/CardAddress";
import ModalAddAddress from "../../organisms/ModalAddAddress";
import ModalEditAddress from "../ModalEditAddress";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function AddressessProfile({
  lang = "es",
  userToken = null,
  result = [],
  loading = true,
  location,
  addressToEdit = {},
  updateAddressModal = false,
  ...props
}) {
  const [visibleMap, setVisibleMap] = React.useState(false);

  React.useEffect(() => {}, []);

  useFocusEffect(React.useCallback(() => {}, []));

  const setearAddress = (value) => {
    if (props.setearAddressToSelected) {
      props.setearAddressToSelected(value);
    }
  };

  const triggerGPS = () => {
    setVisibleMap(!visibleMap);
  };

  const changeCoords = (lat, long) => {
    if (props.setearLocation) {
      props.setearLocation(lat, long);
    }
  };

  const addAddressToApi = (name, description) => {
    if (props.addAddressToApi) {
      props.addAddressToApi(name, description);
      triggerGPS();
    }
  };

  const editAddress = (id, name, desc, coordinates) => {
    if (props.editAddress) {
      props.editAddress(id, name, desc, coordinates);
    }
  };

  const triggerUpdateAddressModal = () => {
    if (props.triggerUpdateAddressModal) {
      props.triggerUpdateAddressModal();
    }
  };

  const setEstatusScreen = (val) => {
    if (props.setearEstatusScreen) {
      props.setearEstatusScreen(val);
    }
  };

  const changeData = (id, name, desc, coords) => {
    if (props.changeData) {
      props.changeData(id, name, desc, coords);
    }
  };

  const dropData = (id) => {};

  let cards = result.map((item, i) => {
    let coordinates = {
      latitude: Platform.OS === "ios" ? item.lat : Number(item.lat),
      longitude: Platform.OS === "ios" ? item.lon : Number(item.lon),
    };
    return (
      <AddressCard
        key={"addresscard_" + i}
        lang={lang}
        id={item.id}
        name={item.name}
        dateAt={item.createAt}
        desc={item.description}
        coordinates={coordinates}
        setearAddress={setearAddress}
        editAddress={editAddress}
      />
    );
  });

  let setCoords = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
        {loading && (
          <ActivityIndicator
            style={{ alignSelf: "center", marginVertical: 30 }}
            size="large"
            color={GlobalVars.firstColor}
          />
        )}
        <AnimatedScrollView
          style={styles.stylesCarousel}
          contentContainerStyle={styles.contentCarousel}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setEstatusScreen(0)}
              style={styles.backAction}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color={GlobalVars.firstColor}
              />
            </TouchableOpacity>
            <TitleComponent
              title={TranslateText(lang, "Mis direcciones")}
              color={GlobalVars.azulOscuro}
              size={18}
            />
          </View>
          {!loading && cards}
          <ButtonComponent
            text={TranslateText(lang, "Add address")}
            color="empty"
            iconLeft="pluscircleo"
            Action={triggerGPS}
          />
        </AnimatedScrollView>
      </View>
      <ModalAddAddress
        visible={visibleMap}
        lang={lang}
        coords={setCoords}
        ctrlModal={triggerGPS}
        changeCoords={changeCoords}
        addAddressToApi={addAddressToApi}
      />
      {addressToEdit?.name &&
        addressToEdit?.desc &&
        addressToEdit?.coordinates && (
          <ModalEditAddress
            visible={updateAddressModal}
            lang={lang}
            addressToEdit={addressToEdit}
            ctrlModal={triggerUpdateAddressModal}
            changeData={changeData}
            dropData={dropData}
          />
        )}
    </View>
  );
}
