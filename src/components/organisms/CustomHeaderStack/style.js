import * as React from 'react';

import { 
    StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({ 

    root:{
        flexDirection: 'row',
        width: '100%',
        paddingTop: Constants.statusBarHeight + 10 ,
        backgroundColor: 'transparent',
    },

    viewItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
        backgroundColor: 'transparent',
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
    },

});

export default Styles;