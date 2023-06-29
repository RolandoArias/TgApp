import React from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const CheckboxEntryIos = ({ label, statuscheck = false, ...props }) => {
  const setValue = () => {
    if (props.setValue) {
      props.setValue();
    }
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.inner}>
        <View style={styles.checkview}>
          <CheckBox
            title={label}
            style={styles.checkbox}
            checked={statuscheck}
            onPress={() => setValue()}
            checkedColor={statuscheck ? GlobalVars.firstColor : undefined}
            containerStyle={styles.containerroot}
            fontFamily={GlobalVars.fontFamily}
            textStyle={styles.textolabel}
          />
        </View>
      </View>
    </View>
  );
};

export default CheckboxEntryIos;
