import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    contenedorView: {
        width: GlobalVars.windowWidth/2.2,
        // marginBottom: 40,
        paddingHorizontal: 5,
        marginRight: 20
    },

    containerCard:{
        width: '100%',
        backgroundColor: GlobalVars.white,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.84,
        elevation: 5,
        textShadowColor: "black",
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 10,
    },

    imageBg: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: GlobalVars.windowHeight/6.2,
    },

    imageStyles: { 
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    headerCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    floatWishIcon: {
        position: 'absolute',
        top: 10,
        right: 15,
    },

    contentCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: GlobalVars.white,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    textName: {
        color: GlobalVars.grisColor,
        fontSize: 18,
        fontFamily: GlobalVars.fontFamily,
        marginBottom: 10,
    },

    footerCard: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 2,
    },

    textPriceFinal: {
        color: GlobalVars.bluePantone,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 23,
        width: '65%',
    },

    textPriceReal: {
        color: GlobalVars.grisIntermediate,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 15,
        fontWeight:'bold',
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
        textAlign: 'center',
        width: '53%'
    },

    iconView: {
        padding: 2,
        backgroundColor: GlobalVars.bluePantone,
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },

});

export default Styles;