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
    },  

    viewContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    headerContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20
    },

    stylesCarousel: {
        width: '100%',
    },

    contentCarousel: {
        paddingTop: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }

});

export default Styles;