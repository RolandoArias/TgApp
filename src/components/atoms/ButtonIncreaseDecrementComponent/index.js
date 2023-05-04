import * as React from 'react';

import { 
    TouchableOpacity, Text
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import GlobalVars from '../../../global/globalVars';

import Styles from './style';

const styles = Styles;
const ButtonComponentIncDec = ({color = "blue", val, ...props}) => {

    const clickThisButton = () => {
        if( props.ToIncrease ){
            props.ToIncrease();
        }else if( props.ToDecrement ){
            props.ToDecrement();
        }else if( props.Action ){
            props.Action();
        }
    }

    const colorAround = ( color === 'blue' ) ? styles.simpleStyle : styles.blueStyle;
    const margin = ( val === "decrement" ) ? styles.marginr : styles.marginl;
    const iconBtn = ( props.iconName && props.iconName !== '' ) 
                    ? <AntDesign name={props.iconName} size={10} 
                                    color={ ( color === 'blue' ) ? GlobalVars.bluePantone : GlobalVars.white } 
                                    style={ [styles.icon] } /> 
                    : null ;

    let ButtonReturn = () => (
        <TouchableOpacity style={[colorAround, margin, styles.buttonStyle]}
                            onPress={ () => clickThisButton() } >
            { iconBtn }
        </TouchableOpacity>
    );        

    return <ButtonReturn />;
}

export default ButtonComponentIncDec;