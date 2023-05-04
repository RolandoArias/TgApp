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
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        alignContent: 'center',
        marginVertical: 15,
        borderBottomColor: GlobalVars.grisPlane,
        borderBottomWidth: 2,
    },  

    viewContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    viewAllLabel: {
        position: 'absolute', 
        right: 0,
        top: 10,
        color: GlobalVars.bluePantone, 
        fontSize: 13, 
        fontFamily: GlobalVars.fontFamily,
    },

    stylesCarousel: {
        width: '100%',
    },

    contentCarousel: {
        paddingTop: 15,
        // paddingBottom: 25,
        paddingLeft: 10,
        paddingRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }

});

export default Styles;