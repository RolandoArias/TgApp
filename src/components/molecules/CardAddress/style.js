import * as React from 'react';
import { 
    StyleSheet
} from 'react-native';

import GlobalVars from '../../../global/globalVars';

const Styles = StyleSheet.create({

    containerCard:{
        width: '100%',
        backgroundColor: GlobalVars.white,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.84,
        elevation: 5,
        textShadowColor: "black",
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 10,
        marginVertical: 20,
    },

    contentCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: GlobalVars.white,
        borderRadius: 10,
    },

    textName: {
        color: GlobalVars.grisIntermediate,
        fontSize: 17,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: GlobalVars.fontFamily,
        marginBottom: 10,
    },

    textDesc: {
        color: GlobalVars.grisIntermediate,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 14,
        width: '70%',
        marginBottom: 10,
    },

    viewDate: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },

    editBtn:{
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: GlobalVars.firstColor,
        paddingVertical: 3,
        paddingHorizontal: 10
    },

    textEdit:{
        color: GlobalVars.white,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 12
    },

    date: {
        color: GlobalVars.grisIntermediate,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 12
    },

    iconTop: {
      position: 'absolute',
      top: 20,
      right: 20,
    },

    iconBottom:{
     position: 'absolute',
     bottom: 20,
     right: 20, 
    }

});

export default Styles;