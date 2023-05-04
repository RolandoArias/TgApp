import * as React from 'react';

import { 
    StyleSheet,
} from 'react-native';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    buttonStyle: {
        marginVertical: 10,
        width: '100%',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: GlobalVars.googleColor,
    },

    textbtn: {
        fontWeight: '600',
        fontFamily: GlobalVars.fontFamily,
        fontSize: 16,
        color: GlobalVars.white,
    },

    icon: {
        marginRight: 10
    }

});

export default Styles;