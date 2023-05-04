import React, {useState} from 'react';

import { 
    View, Animated, Text,
} from 'react-native';
import Constants from 'expo-constants';

import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

/** Import Translations */
import TranslateText from '../../../utils/useTranslations';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles; 

const HasAccount = ({lang = "es", ...props}) => {

    const nothasaccount = props.nothasaccount ? true : undefined;

    const handleTextBold = () => {
        if( props.hasaccount ){
            props.hasaccount();
        }
    }

    return(

        <View style={styles.container} >
            <Text style={ [styles.texto, styles.textoSimple] } >{ nothasaccount ? TranslateText(lang, '¿No tienes una cuenta?') :  TranslateText(lang, '¿Ya tienes cuenta?') }</Text>
            <Text style={ [styles.texto, styles.textoNegrita] } onPress={() => handleTextBold()} >{ nothasaccount ? TranslateText(lang, 'Crea una cuenta') : TranslateText(lang, 'Inicia Sesión') }</Text>
        </View>
    );
    
}

export default HasAccount;