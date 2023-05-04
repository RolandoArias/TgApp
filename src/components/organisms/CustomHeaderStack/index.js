import React, { useEffect, useState } from 'react';

import { View, Platform, } from 'react-native';

import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';

/** Import Translations */
import TranslateText from '../../../utils/useTranslations';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Left Header button Stack */
import Left from '../../atoms/ReturnButton';
import TitleComponent from '../../atoms/Titles';

import Styles from './style';

const styles = Styles;

const CustomHeaderStack = ({ scene, previous, navigation, ...props }) => {

  // Language
  const [ lang, setLang ] = useState(GlobalVars.defaultLang);

  useEffect( () => {
      /** Recover Language */
      getLang();
  }, []);

  const getLang = async () => {
    try{
        const language = JSON.parse(await AsyncStorage.getItem("currentLang"));
        // console.log( {language} );
        if( language ){
            setLang( language );
        }
    }catch(e){
        //   console.log(e);
        null;
    }
  }

  return(
    <View style={ [styles.root, { paddingTop: props.isCustomTop ? Constants.statusBarHeight + 30 : Constants.statusBarHeight + 10, }] } >
      <View style={ [styles.viewItem, styles.viewExtreme] } >
        {
          Platform.OS === 'ios'
          ?
          <Left onPress={ () => navigation.goBack() } />
          :
          <Left onPress={ () => navigation.goBack() } />
        }
      </View>
      <View style={ [styles.viewItem, styles.viewMedium] } >
        {
          props.isCategorie && <TitleComponent color={GlobalVars.azulOscuro} size={25} title={ TranslateText(lang, 'Categorias') } />
        }
      </View>
      <View style={ [styles.viewItem, styles.viewExtreme] } ></View>
    </View>
  );

};

export default CustomHeaderStack;