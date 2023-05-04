import * as React from 'react';

import { 
    TouchableOpacity, Text
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

import GlobalVars from '../../../global/globalVars';

import Styles from './style';

const styles = Styles;
const ButtonFB = ({text, ...props}) => {

    const clickThisButton = () => {
        if( props.FacebookSign ){
            props.FacebookSign();
        }else if( props.FacebookLogin ){
            props.FacebookLogin();
        }
    }

    const iconBtn = <FontAwesome style={styles.icon} name="facebook" color={GlobalVars.white} size={20} />;
    let ButtonReturn = () => (
        <TouchableOpacity style={styles.buttonStyle}
                            onPress={ () => clickThisButton() } >
            { iconBtn }
            <Text style={styles.textbtn} >
                Facebook
            </Text>
        </TouchableOpacity>
    );        

    return <ButtonReturn />;
}

export default ButtonFB;