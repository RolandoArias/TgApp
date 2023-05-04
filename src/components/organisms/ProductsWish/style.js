import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    rootMain: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },

    titleWishProduct: {
        color: GlobalVars.bluePantone,
        fontSize: 24,
        fontFamily: GlobalVars.fontFamily,
        textAlign: 'left',
        marginBottom: 35,
    },

    root: {
        width: '100%',
        // height: 250,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 20,
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
    touchable: {
        width: '95%',
        // height: 250,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: GlobalVars.white,
    },
    imageWrapper: {
        width: '20%',

    },

    tinyImage: {
        width: '100%',
        height: 65,
    },

    wrapperContent: {
        width: '65%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 15
    },

    titleCard: {
        color: GlobalVars.grisIntermediate,
        fontSize: 15,
        fontFamily: GlobalVars.fontFamily,
    },

    priceCard: {
        color: GlobalVars.bluePantone,
        fontSize: 13,
        fontFamily: GlobalVars.fontFamily,
    },

    ctrlWrapper: {

    },

    iconWrapper: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrapperDelete: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    rootTotalCard: {
        width: '100%',
        marginBottom: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
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

    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    col1: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    col2: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    textcol1: {
        color: GlobalVars.bluePantone,
        fontSize: 14,
        fontFamily: GlobalVars.fontFamily,
    },

    textcol2: {
        color: GlobalVars.grisIntermediate,
        fontSize: 14,
        fontFamily: GlobalVars.fontFamily,
    }

});

export default Styles;