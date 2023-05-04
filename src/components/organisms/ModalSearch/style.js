import * as React from 'react';

import { 
    StyleSheet, Platform,
} from 'react-native';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({ 

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalView: {
        marginTop: 20,
        backgroundColor: GlobalVars.fondoPrincipal,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: '100%',
        height: Platform.OS === 'ios' ? '92%' : '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    containerSearch: { 
        backgroundColor: 'transparent', 
        width: '100%', 
        marginTop: 50,
        marginBottom: 10, 
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
    },

    leftIconContainerStyle: {
        color: GlobalVars.grisColor
    },

    closeElement: {
        position: 'absolute',
        right: 20, top: 20,
        borderColor: GlobalVars.firstColor,
        borderWidth: 2,
        borderRadius: 75,
        padding: 2
    },

    stylesResult: {
        width: '100%',
    },

    contentResult: {
        paddingTop: 25,
        paddingHorizontal: 10,
        paddingBottom: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }

});

export default Styles;