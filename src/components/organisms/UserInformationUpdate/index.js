import React, { useState, useEffect } from "react";

import { View, ActivityIndicator, Image } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

/** Import Translations */
import TranslateText from "../../../utils/useTranslations";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Components */
import TitleComponent from "../../atoms/Titles";
import InputEntry from "../../molecules/InputEntry";
import ButtonComponent from "../../atoms/ButtonComponent";

/** Import Styles */
import Styles from "./style";

const styles = Styles;

export default function UserInformationUpdate({
  lang = "es",
  userToken = null,
  ...props
}) {
  const [completeName, setCompleteName] = useState("");
  const [completeMail, setCompleteMail] = useState("");
  const [dateSelect, setDateSelect] = useState(new Date(1980, 0, 1));
  const [birthday, setBirthday] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [mode, setMode] = useState("date");
  const [showDateCalendar, setShowDateCalendar] = useState(false);

  // Sending data
  const [loadingSend, setLoadingSend] = useState(false);
  const [activeMsgNoPassEqual, setActiveMsgNoPassEqual] = useState(false);
  const [activeMsgNoInputsFill, setActiveMsgNoInputsFill] = useState(false);
  const [complete, setComplete] = useState("");

  useEffect(() => {
    setBirthday(formatDate(dateSelect));
  }, [dateSelect]);

  const setearName = (val) => {
    setCompleteName(val);
  };

  const setearMail = (val) => {
    setCompleteMail(val);
  };

  const setearBirthday = (event, selectedDate) => {
    const currentDate = selectedDate || dateSelect;
    setDateSelect(currentDate);
    setShowDateCalendar(false);
  };

  const setearPass = (val) => {
    setPass(val);
  };

  const setearConfirmPass = (val) => {
    setConfirmPass(val);
  };

  const BackAction = () => {
    if (props.backScreen) {
      props.backScreen();
    }
  };

  const formatDate = (param) => {
    let month = "" + (param.getMonth() + 1),
      day = "" + param.getDate(),
      year = param.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const result = [year, month, day].join("-");

    return result;
  };

  const SetNewData = (dataSet) => {
    if (props.SetNewData) {
      props.SetNewData(dataSet);
    }
  };

  const ToUpdateDataUser = () => {
    setLoadingSend(true);
    // console.log("------------");
    // console.log(userToken);

    if (pass !== confirmPass) {
      setActiveMsgNoPassEqual(true);
      setActiveMsgNoInputsFill(false);
      setLoadingSend(false);
      return null;
    } else if (!completeName || !completeMail || !pass || !confirmPass) {
      setActiveMsgNoInputsFill(true);
      setActiveMsgNoPassEqual(false);
      setLoadingSend(false);
      return null;
    }

    var myHeaders = new Headers();
    //   myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
    myHeaders.append("Authorization", "Bearer " + userToken);

    var raw = JSON.stringify({
      name: completeName,
      email: completeMail,
      password: pass,
      password_c: confirmPass,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(GlobalVars.urlapi + "/user/update", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log( responseJson );
        if (responseJson.success && responseJson.data) {
          SetNewData(responseJson.data);
          setLoadingSend(false);
          setActiveMsgNoInputsFill(false);
          setActiveMsgNoPassEqual(false);
          setComplete("success");
        }
        // console.log( responseJson.data );
      })
      .catch((error) => {
        /* console.log('error', error) */
        setLoadingSend(false);
        setActiveMsgNoInputsFill(false);
        setActiveMsgNoPassEqual(false);
        setComplete("error");
      });
  };

  if (loadingSend) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={GlobalVars.firstColor}
          style={{ marginVertical: 30 }}
        />
      </View>
    );
  }

  if (complete === "success") {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageSuccess}
          source={require("../../../../assets/images/user/sucessUpdate.png")}
        />
      </View>
    );
  }

  if (complete === "error") {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageError}
          source={require("../../../../assets/images/user/errorAccount.png")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <InputEntry
        iconName="user"
        label={TranslateText(lang, "Nombre completo")}
        textvariable={completeName}
        setValue={setearName}
      />
      <InputEntry
        iconName="mail"
        label={TranslateText(lang, "Direccion de correo electronico")}
        textvariable={completeMail}
        setValue={setearMail}
      />
      <InputEntry
        iconName="calendar"
        label={TranslateText(lang, "Fecha de nacimiento")}
        textvariable={birthday}
        setearShowDate={() => setShowDateCalendar(!showDateCalendar)}
        isInputTouchDate
        noVisible
      />
      {showDateCalendar && (
        <DateTimePicker
          testID="dateTimePickerBirthday"
          value={dateSelect}
          mode={mode}
          display="default"
          onChange={(event, selectedDate) =>
            setearBirthday(event, selectedDate)
          }
        />
      )}
      <InputEntry
        iconName="key"
        label={TranslateText(lang, "Contraseña")}
        textvariable={pass}
        setValue={setearPass}
      />
      <InputEntry
        iconName="key"
        label={TranslateText(lang, "Confirmar contraseña")}
        textvariable={confirmPass}
        setValue={setearConfirmPass}
      />

      {activeMsgNoPassEqual && (
        <TitleComponent
          title={TranslateText(lang, "Passwords do not match")}
          color={GlobalVars.firstColor}
          size={18}
        />
      )}

      {activeMsgNoInputsFill && (
        <TitleComponent
          title={TranslateText(lang, "Campos incompletos")}
          color={GlobalVars.firstColor}
          size={18}
        />
      )}

      <View style={styles.buttonsCollection}>
        <ButtonComponent
          text={TranslateText(lang, "Actualizar datos")}
          Action={ToUpdateDataUser}
        />

        <ButtonComponent
          color="empty"
          text={TranslateText(lang, "Regresar")}
          Action={BackAction}
        />
      </View>
    </View>
  );
}
