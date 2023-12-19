import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = Styles;
const InputEntry = ({
  iconName,
  label,
  textvariable,
  pass = false,
  type = "none",
  keyboard = "default",
  maxlong = 2000,
  ...props
}) => {
  if (props.noVisible) return null;
  const visibility = props.visibility ? true : null;
  const IconRender = (
    <Feather
      style={styles.iconstyle}
      name={iconName}
      size={20}
      color={GlobalVars.firstColor}
    />
  );

  const [hiddenstatus, setHiddenstatus] = useState(false);

  const setValue = (value) => {
    if (props.setValue) {
      props.setValue(value);
    }
  };

  const setearShowDate = () => {
    if (props.setearShowDate) {
      props.setearShowDate();
    }
  };

  let iconeye = null;
  if (visibility) {
    iconeye = hiddenstatus ? (
      <Feather
        style={styles.eye}
        name="eye"
        color={GlobalVars.grisIntermediate}
        onPress={() => setHiddenstatus(!hiddenstatus)}
        size={25}
      />
    ) : (
      <Feather
        style={styles.eye}
        name="eye-off"
        color={GlobalVars.grisIntermediate}
        onPress={() => setHiddenstatus(!hiddenstatus)}
        size={25}
      />
    );
  }

  if (props.isInputTouchDate) {
    return (
      <View style={styles.rootView}>
        <TouchableOpacity
          style={styles.touchCalendar}
          onPress={() => setearShowDate()}
        >
          <View style={styles.inner}>
            {IconRender}
            <View style={styles.innerCalendar}>
              <Text
                style={[
                  styles.textCalendar,
                  {
                    color: !textvariable
                      ? GlobalVars.grisOscuro
                      : GlobalVars.grisOscuro,
                  },
                ]}
              >
                {textvariable || label}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.rootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {IconRender}
            {!hiddenstatus && pass ? (
              <TextInput
                placeholder={label}
                style={styles.textInput}
                onChangeText={(text) => setValue(text)}
                value={textvariable}
                secureTextEntry={true}
                keyboardType={keyboard}
                autoCapitalize="none"
                textContentType={type}
                maxLength={maxlong}
              />
            ) : (
              <TextInput
                placeholder={label}
                style={styles.textInput}
                onChangeText={(text) => setValue(text)}
                value={textvariable}
                secureTextEntry={false}
                keyboardType={keyboard}
                autoCapitalize="none"
                textContentType={type}
                maxLength={maxlong}
              />
            )}

            {iconeye}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default InputEntry;
