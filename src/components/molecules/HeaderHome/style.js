import * as React from 'react';
import { 
    StyleSheet, Platform,
} from 'react-native';
import Constants from 'expo-constants';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    wrapper: {
    },

    rootView: {
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center',
        flex: 1,
        marginBottom: 10,
        paddingHorizontal: 20,
    },  

    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    touchableStyle: {
        width: '100%',
    },

    containerSearch: { 
        backgroundColor: 'transparent', 
        width: '100%', 
        marginVertical: 10, 
        borderRadius: 10, 
        height: 44, 
        padding: 0, 
        borderTopColor: 'transparent', 
        borderBottomColor: 'transparent',
    },

    inputContainerStyle: {
        backgroundColor: GlobalVars.grisPlane, 
        height: 44, 
        padding: 0, 
    },

    inputStyle: { 
        backgroundColor: 'transparent', 
        color: GlobalVars.grisColor, 
        height: 44, 
        padding: 0, 
        display: Platform.OS === 'ios' ? 'none' : 'flex',
    },

    textSearch: {
        color: GlobalVars.grisPlane,
        position: 'absolute',
        left: 50,
        top: 24,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 16
    },

    leftIconContainerStyle: {
        color: GlobalVars.grisColor
    }

});

export default Styles;