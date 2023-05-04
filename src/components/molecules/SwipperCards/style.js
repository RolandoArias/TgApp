import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    wrapper: {
    },

    rootView: {
        width: '100%',
        height: GlobalVars.windowHeight < 600 ? 600 : GlobalVars.windowHeight/1.2,
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center',
        flex: 1,
    },  

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    stretch: {
        width: 100,
        height: 100,
        borderRadius: 15,
        resizeMode: 'stretch',
        marginBottom: 20,
    },

    normal: {

    },

});

export default Styles;