import * as React from 'react';

import { TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons'; 

import GlobalVars from '../../../global/globalVars';

import Styles from './style';

const styles = Styles;

const Left = (props) => {

    const onPress = () => {
        if(props.onPress) {
            props.onPress();
        }
    }

    return(
        <TouchableOpacity style={styles.retrobtn} onPress={onPress} >
            <Entypo name="chevron-left" size={22} color={GlobalVars.firstColor} />
        </TouchableOpacity>
    );
}

export default Left;