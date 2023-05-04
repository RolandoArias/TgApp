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

    viewSignup: {
        backgroundColor: GlobalVars.fondoPrincipal,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    scrollView: {
        backgroundColor: 'transparent',
        width: '100%',
    },

    contentContainer: {
        paddingTop: Constants.statusBarHeight + 70,
        paddingBottom: 30,
        paddingHorizontal: 50,
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center',
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