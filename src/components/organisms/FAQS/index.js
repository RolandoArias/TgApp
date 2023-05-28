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
import FAQOption from "../../molecules/FAQs";

/** Import Global Variables */
import GlobalVars from "../../../global/globalVars";

/** Import Styles for this Screen */
import Styles from "./style";

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function FAQSProfile({
  lang = "es",
  userToken = null,
  ...props
}) {
  // console.log( '--------------------------------' );

  // FAQ'S
  const [faqsResults, setFaqsResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // get FAQ's
    getFAQS();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // get FAQ's
      getFAQS();
    }, [])
  );

  const setEstatusScreen = (val) => {
    if (props.setearEstatusScreen) {
      props.setearEstatusScreen(val);
    }
  };

  const getFAQS = () => {
    setLoading(true);
    // console.log("------------");
    // console.log(userToken);

    var myHeaders = new Headers();
    //   myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
    myHeaders.append("Authorization", "Bearer " + userToken);

    var raw = "";
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ raw }),
      redirect: "follow",
    };

    fetch(GlobalVars.urlapi + "/faqs", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log( responseJson );
        if (responseJson.success && responseJson.data) {
          setFaqsResults(responseJson.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
        // console.log( responseJson.data );
      })
      .catch((error) => {
        /* console.log('error', error) */
        setLoading(false);
      });
  };

  const cards =
    faqsResults?.map(({ id, title, anwser }, i) => {
      if (i === 0) {
        return (
          <FAQOption
            key={"FAQ_" + i}
            option_id={id}
            title={title}
            text={anwser || "..."}
          />
        );
      } else {
        return (
          <FAQOption
            key={"FAQ_" + i}
            option_id={id}
            title={title}
            text={anwser || "..."}
            noLineTop
          />
        );
      }
    }) || null;

  return (
    <View style={styles.rootView}>
      <View style={styles.viewContainer}>
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
              title={TranslateText(lang, "FAQ's")}
              color={GlobalVars.azulOscuro}
              size={18}
            />
          </View>

          {loading && (
            <ActivityIndicator
              style={{ alignSelf: "center", marginVertical: 30 }}
              size="large"
              color={GlobalVars.firstColor}
            />
          )}
          {!loading && cards}
        </AnimatedScrollView>
      </View>
    </View>
  );
}
