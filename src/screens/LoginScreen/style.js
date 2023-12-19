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

    viewLogin: {
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
        paddingHorizontal: 20,
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

    rememberpass: {
        color: GlobalVars.firstColor,
        fontSize: 13,
        fontWeight: '700',
        textAlign: 'right',
        width: '100%',
        marginBottom: 20
    },

    customInputStyle: {
        fontSize: 15,
        marginBottom: 20,
        // Aquí puedes agregar estilos específicos para el input del componente InputEntry
        textTransform: 'lowercase',
        // Otros estilos específicos para el input si es necesario
      },

});

export default Styles;