import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    containerCard: {
        width: GlobalVars.windowWidth/1.3,
        height: GlobalVars.windowHeight/4,
        marginRight: 25,
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
    },

    imageStyles: { 
        borderRadius: 15
    },

    contentCard: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        alignContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 35,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15,
    },

    textCategorie: {
        color: GlobalVars.white,
        fontSize: 17,
        fontFamily: GlobalVars.fontFamily,
    },

    textInfo: {
        color: GlobalVars.white,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 15,
    }

});

export default Styles;