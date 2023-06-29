import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    containerCard:{
        width: '100%',
        backgroundColor: GlobalVars.white,
        borderRadius: 10,
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
        marginVertical: 15,
    },

    contentCard: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: GlobalVars.white,
        borderRadius: 10,
    },

    payicon: {
        marginRight: 20,
    },

    textName: {
        color: GlobalVars.grisIntermediate,
        fontSize: 17,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: GlobalVars.fontFamily,
    },

    iconSelected:{
     position: 'absolute',
     bottom: 20,
     right: 20, 
    }

});

export default Styles;