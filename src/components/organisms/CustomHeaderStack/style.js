import * as React from 'react';

import { 
    StyleSheet, Platform,
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({ 

    root:{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 1
    },

    viewItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: Platform.OS === "ios" ? 35 : '100%',
        backgroundColor: 'transparent',
        zIndex: 2
        // borderColor: GlobalVars.black,
        // borderWidth: 1
    },

    viewMedium: {
        width: '70%',
        backgroundColor: 'transparent',
    },

    viewExtreme: {
        width: '15%',
        backgroundColor: 'transparent',
        zIndex: 3
    },

});

export default Styles;