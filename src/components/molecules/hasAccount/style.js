import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },

    texto: {
        color: GlobalVars.grisColor,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 12
    },

    textoSimple: {
        fontWeight: '300'
    },

    textoNegrita: {
        fontWeight: 'bold',
        marginLeft: 5
    }

});

export default Styles;