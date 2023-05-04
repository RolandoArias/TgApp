import React, {useState, useEffect} from 'react';

import { 
    View, Animated, SafeAreaView,
    BackHandler,
} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

/** Import Translations */
import TranslateText from '../../utils/useTranslations';

/** Import Global Variables */
import GlobalVars from '../../global/globalVars';

/** Import Componentes Custom */
import StatusBarComponent from '../../components/atoms/StatusBar';
import ButtonComponent from '../../components/atoms/ButtonComponent';
import SwiperComponent from '../../components/molecules/SwipperCards';
import SwitchEntryLang from '../../components/molecules/SwitchLang';
import ModalsSignup from '../../components/organisms/ModalsSignup';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;  
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const InitialScreen = ({ navigation }) => {

    const [ salirApp, setSalirapp ] = useState(false);

    // Language
    const [ lang, setLang ]= React.useState(GlobalVars.defaultLang);

    useEffect( () => {
        /** Recover Language */
        getLang();

        /** Android no return Login */
        const backAction = () => {
            setSalirapp(!salirApp);
            return true;
        };
      
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    const CloseApp = (response = false) => {
        if ( response )
            BackHandler.exitApp();
        else
            setSalirapp(!salirApp);
    }

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

    const setLanguage = (value) => {
        // console.log({value});
        try {
            AsyncStorage.removeItem('currentLang');
            AsyncStorage.setItem( 'currentLang', JSON.stringify(value) );
            // console.log( value );
            setLang( value );
        } catch (error) {
            // Error saving data
            // console.error();
            null;
        }
    }

    const ToLogin = () => {
        navigation.navigate('Login');
    }

    const ToSignUp = () => {
        navigation.navigate('Signup');
    }

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.viewLogin} >
                <StatusBarComponent />

                <ScrollView 
                    style={styles.scrollView} 
                    contentContainerStyle={styles.contentContainer} >

                    <SwitchEntryLang lang={lang} setLanguage={setLanguage} />
                    
                    <SwiperComponent lang={lang} />
                    <ButtonComponent text={ TranslateText(lang, 'Crear Cuenta') } iconName="arrowright" ToSignUp={ToSignUp} />
                    <ButtonComponent text={ TranslateText(lang, 'Iniciar Sesión') } color="transparent" iconName="arrowright" ToLogin={ToLogin} />

                </ScrollView>

                { salirApp && <ModalsSignup CloseApp={CloseApp} isSalirApp /> }

            </View>
        </SafeAreaView>
    );
}

export default InitialScreen;