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

    titleMenu:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10
    },
    container0:{
        width: '100%',
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    container1:{
        flex:1,
        backgroundColor:'yellow',        
    },  
    container2:{
        flex:2,        
        backgroundColor:'green',
        
    }, 
    pictureProfile: {
        width:70,
        height:70,
        borderRadius: 33,
    },
    titleName:{
        fontSize:20,
    },
















    containerCard:{
        width: GlobalVars.windowWidth/2.3,
        height: GlobalVars.windowHeight/5,
        marginHorizontal: 5,
        marginTop:10,
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
    },

    headerCard: {
        backgroundColor: GlobalVars.bluePantone,
        height: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    contentCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: GlobalVars.white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    textTotal: {
        color: GlobalVars.grisColor,
        fontSize: 17,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: GlobalVars.fontFamily,
        marginBottom: 10,
    },

    footerCard: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 0,
    },

    textPriceFinal: {
        color: GlobalVars.bluePantone,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 25,
        width: '66%',
    },

    textPriceReal: {
        color: GlobalVars.grisIntermediate,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 20,
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
        textAlign: 'center',
        width: '33%',
    },

    iconView: {
        padding: 2,
        backgroundColor: GlobalVars.bluePantone,
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },

    date: {
        color: GlobalVars.white,
        fontFamily: GlobalVars.fontFamily,
        fontSize: 16
    },

    containerRow:{
        flex:1,
        flexDirection: 'row',

    }


});

export default Styles;