import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    rootView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%'
    },
    
    container: {
        flex: 1,
        width: '100%',
    },

    inner: {
        paddingVertical: 15,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkview: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        textAlign: 'justify'
    },
    
    texto: {
        fontSize: 13,
        textAlign: 'justify',
        fontFamily: GlobalVars.fontFamily
    },

    checkbox: {
        marginRight: 10,
    },

});

export default Styles;