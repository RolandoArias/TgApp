import React, {useEffect, useState} from 'react';

import { 
    View, BackHandler, Alert,
    SafeAreaView, Animated,
} from 'react-native';

import Constants from 'expo-constants';

import { useFocusEffect } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

/** Import Translations */
import TranslateText from '../../utils/useTranslations';

/** Import Global Variables */
import GlobalVars from '../../global/globalVars';

/** Import Componentes Custom */
import ButtonCarritoComponent from '../../components/atoms/ButtonCarritoComponent';
import StatusBarComponent from '../../components/atoms/StatusBar';

import Styles from './style';

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const PurchasingScreen = ({navigation}) => {

    const [ salirApp, setSalirapp ] = useState(false);
    const [ userApp, setUserapp ] = useState('');
    const [ userToken, setUserToken ] = useState(false);

    // Language
    const [ lang, setLang ] = useState(GlobalVars.defaultLang);

    // Screen Vars
    const [ cart, setCart ] = useState([]);
    const [ totalPrice, setTotalprice ] = useState(0);   

    useEffect( () => {
        /** Recover Language */
        getLang();

        /** Recover user data */
        recoveringDataUsaer();

        /** Recover Data Cart */
        getDataCart();

        // clearAll();

        /** Android return back */
        const backAction = () => {
            CloseScreen();
            return true;
        };
      
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            /** Recover Language */
            getLang();

            /** Refresh recover cart */
            getDataCart();

            /** Recover user data */
            recoveringDataUsaer();

            /** Android return back */
            const backAction = () => {
                CloseScreen();
                return true;
            };
        
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => backHandler.remove();
        }, [])
    );

    const CloseScreen = () => {
        navigation.goBack();
    }

    const recoveringDataUsaer = async () => {
        try{
            const usernametoapp = JSON.parse(await AsyncStorage.getItem("currentUserShowName"));
            const usertokentoapp = JSON.parse(await AsyncStorage.getItem("currentToken"));
            // console.log( {usernametoapp} );
            // console.log( {usertokentoapp} );
            setUserapp( usernametoapp );
            setUserToken( usertokentoapp );
        }catch(e){
            //   console.log(e);
            null;
        }
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

    const getDataCart = async () => {
        try{
            const checkoutlistcurrent = JSON.parse(await AsyncStorage.getItem("currentCheckoutList"));
            if( checkoutlistcurrent && checkoutlistcurrent.list ){
                let recovercart = checkoutlistcurrent.list;
                let cartsize = checkoutlistcurrent.size;
                setCart( recovercart );
                // console.log( {recovercart}, {cartsize} );
            }else{
                setCart([]);
            }
        }catch(e){
            null;
        }
    }

    const ToDo = () => {
        
    }

    return(
        <SafeAreaView style={styles.container} >
            <View style={styles.viewHome} >
                <StatusBarComponent />

                <View style={ styles.containerScroll} >
                    <AnimatedScrollView 
                        style={styles.scrollView}     
                        pagingEnabled
                        bounces={ false }
                        snapToInterval={2}
                        bouncesZoom={ true }
                        decelerationRate="fast" 
                        scrollEventThrottle={200}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainer} >

                    </AnimatedScrollView>
                </View>

                <View style={ styles.containerBottom } >
                    <ButtonCarritoComponent color="blue" text={TranslateText(lang, "Procesar compra")} alternText={totalPrice} iconName="arrowright" Action={ToDo} />
                </View>

            </View>
        </SafeAreaView>
    );

}

export default PurchasingScreen;