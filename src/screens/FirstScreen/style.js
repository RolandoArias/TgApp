import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';

import Constants from 'expo-constants';

import GlobalVars from '../../global/globalVars';

const Styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    viewHome: {
        backgroundColor: GlobalVars.fondoPrincipal,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 0,
        // paddingHorizontal: 20,
    },

    scrollView: {
        backgroundColor: 'transparent',
        width: '100%',
    },

    contentContainer: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 30, //TODO
        // paddingHorizontal: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center',
    },

});

export default Styles;