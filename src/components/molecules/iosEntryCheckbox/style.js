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
        width: '100%',
        height:35
    },
    
    container: {
        flex: 1,
        width: '100%',
    },

    inner: {
        paddingVertical:0,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        
    },

    checkview: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        textAlign: 'justify',
        
    },
    
    textolabel: {
        fontSize: 15,
        textAlign: 'justify',
        fontFamily: GlobalVars.fontFamily,
    },

    checkbox: {
        marginRight: 10,
    },

    containerroot: {
        backgroundColor: GlobalVars.white,
        borderColor: 'transparent',
        borderWidth: 0,
        
    }

});

export default Styles;