import * as React from 'react';
import { 
    Platform,
    StyleSheet
} from 'react-native';

import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    rootview: {
        zIndex: 98,
        flex: 1,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        position: 'absolute',
        right: 30,
        top: Platform.OS === "ios" ? (GlobalVars.windowHeight*0.182) : -(GlobalVars.windowHeight*0.038),
    },

    container: {
        zIndex: 99,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        position: 'relative',
        // borderColor: '#000',
        // borderWidth: 1
    },

    icon: {

    },

});

export default Styles;