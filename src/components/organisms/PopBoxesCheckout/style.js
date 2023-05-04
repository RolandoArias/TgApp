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

    root: {
        width: '100%',
        // height: 250,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 35,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: 'transparent',
        // borderRadius: 15,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 10.84,
        // elevation: 5,
        // textShadowColor: "black",
        // textShadowOffset: { width: 2, height: 1 },
        // textShadowRadius: 10,
    },

    imageWrapper: {
        width: '20%',

    },

    tinyImage: {
        width: '100%',
        height: 45,
    },

    wrapperContent: {
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 15
    },

    titleCard: {
        color: GlobalVars.bluePantone,
        fontSize: 15,
        fontFamily: GlobalVars.fontFamily,
    },

    textCard: {
        fontSize: 13,
        fontFamily: GlobalVars.fontFamily,
        textAlign: 'justify',
        color: GlobalVars.grisIntermediate,
    },

});

export default Styles;