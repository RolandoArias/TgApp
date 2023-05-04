import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';

import Constants from 'expo-constants';

import GlobalVars from '../../global/globalVars';

const Styles = StyleSheet.create({

    viewHome: {
        backgroundColor: GlobalVars.fondoPrincipal,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },

});

export default Styles;