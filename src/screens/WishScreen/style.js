import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';

import Constants from 'expo-constants';

import GlobalVars from '../../global/globalVars';

const Styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    viewHome: {
        backgroundColor: GlobalVars.fondoPrincipal,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 0,
        // paddingHorizontal: 20,
    },

    containerScroll: {
        width: '100%',
        height: '90%',
    },

    scrollView: {
        backgroundColor: 'transparent',
        width: '100%',
    },

    contentContainer: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 30, //TODO
        // paddingHorizontal: 20,
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        alignContent: 'center',
    },

    containerBottom: {
        width: '100%',
        height: '10%',
        backgroundColor: GlobalVars.white,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.65,
        shadowRadius: 10.84,
        elevation: 20,
        textShadowColor: "#000",
        textShadowOffset: { width: 2, height: 50 },
        textShadowRadius: 10,
        paddingHorizontal: 20,
    },

    loadingText: {
        color: GlobalVars.firstColor,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 20
    },

});

export default Styles;