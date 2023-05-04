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

    viewProduct: {
        zIndex: 1,
        backgroundColor: GlobalVars.fondoPrincipal,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // paddingTop: Constants.statusBarHeight,
        paddingBottom: 0,
        // paddingHorizontal: 20,
        width: '100%',
    },

    scrollView: {
        backgroundColor: 'transparent',
        width: '100%',
    },

    contentContainer: {
        paddingTop: Constants.statusBarHeight + 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center',
    },

    loadingText: {
        color: GlobalVars.firstColor,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 20
    },

    positiontitle: {
        position: 'absolute',
        top: -(GlobalVars.windowHeight*0.038),
    },

    title: {
        fontSize: 24,
        fontFamily: GlobalVars.fontFamily,
        color: GlobalVars.bluePantone,
    },

    image: {
        width: GlobalVars.windowWidth/2,
        height: GlobalVars.windowWidth/2,
        resizeMode: 'contain',
    }

});

export default Styles;