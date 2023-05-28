import * as React from 'react';

import { 
  View, Image, TouchableOpacity, Text,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalVars from '../../../global/globalVars';

/** Import Custom elements */

import Styles from './style';

const styles = Styles;

const ResultSearchCard = ({ name, imageuri, price, idproduct, ...props }) => {

    const returnAction = (id) => {
        if( props.redirectToProduct ) props.redirectToProduct(id);
    }
    let uriimage = '';

    if( imageuri && imageuri[0] )
        uriimage = imageuri[0].url ? imageuri[0].url : '' ;
    
    return(
        <View style={ styles.container } >
            <TouchableOpacity style={ styles.rootContainer } onPress={ () => returnAction(idproduct) } >
                <View style={ styles.viewcontainer} >
                    <View style={ styles.leftcontent } >
                        <Image
                            style={styles.tinyLogo}
                            resizeMode="cover"
                            source={{ uri: uriimage }} 
                            />
                    </View>
                    <View style={ styles.rightcontent } >
                        <View style={styles.headercard} ></View>
                        <View style={styles.contentcard} >
                            <Text style={ styles.nameproduct } >{name.length > 15 ? name.slice(0, 15) + '...' : name}</Text>
                            <Text style={ styles.priceproduct } >{price}</Text>
                            <TouchableOpacity style={ styles.iconView } >
                                <AntDesign name="shoppingcart" size={24} color={GlobalVars.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default ResultSearchCard;