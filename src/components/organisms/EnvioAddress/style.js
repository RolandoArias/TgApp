import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';

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

    stylesCarousel: {
        width: '100%',
    },

    contentCarousel: {
        paddingTop: 15,
        paddingHorizontal: 10,
        flexDirection: 'column',
        flexWrap: 'wrap'
    }

});

export default Styles;