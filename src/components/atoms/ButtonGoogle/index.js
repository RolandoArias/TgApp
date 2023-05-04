import * as React from 'react';

import { 
    TouchableOpacity, Text
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import GlobalVars from '../../../global/globalVars';

import Styles from './style';

const styles = Styles;
const ButtonGoogle = ({text, ...props}) => {

    const clickThisButton = () => {
        if( props.GoogleSign ){
            props.GoogleSign();
        }else if( props.GoogleLogin){
            props.GoogleLogin();
        }
    }

    const iconBtn = <AntDesign style={styles.icon} name="google" color={GlobalVars.white} size={20} />;
    let ButtonReturn = () => (
        <TouchableOpacity style={styles.buttonStyle}
                            onPress={ () => clickThisButton() } >
            { iconBtn }
            <Text style={styles.textbtn} >
                Google
            </Text>
        </TouchableOpacity>
    );        

    return <ButtonReturn />;
}

export default ButtonGoogle;