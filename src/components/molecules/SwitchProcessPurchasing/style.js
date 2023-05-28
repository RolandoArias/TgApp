import * as React from 'react';
import { 
    StyleSheet, Platform,
} from 'react-native';

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
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: GlobalVars.grisPlane,
    },

    touchableStyle: {
        width: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },

});

export default Styles;