import * as React from 'react';

import { 
    StyleSheet,
} from 'react-native';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    buttonStyle: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // paddingVertical: 10,
        borderRadius: 75,
    },

    blueStyle: {
        backgroundColor: GlobalVars.bluePantone,
        color: GlobalVars.white,
    },

    simpleStyle: {
        backgroundColor: 'transparent',
        color: GlobalVars.bluePantone,
        borderColor: GlobalVars.bluePantone,
        borderWidth: 2,
    },

    icon: {
        fontWeight: 'bold'
    },

    marginr: {
        marginRight: 10,
    },

    marginl: {
        marginLeft: 10,
    }

});

export default Styles;