import React, {useState} from 'react';
import { 
    View, TouchableOpacity,
} from 'react-native';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Components */
import LabelTextComponent from '../../atoms/LabelText';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
const LabelTab = ({label, id = null, available, ...props}) => {

    const returnAction = (value, available) => {
        if( props.returnAction ){
            props.returnAction(value, available);
        }
    }

    if( !id )
        return null;

    return (
        <View style={ [styles.rootView, {
                            borderBottomColor: props.border ? GlobalVars.firstColor : 'transparent',
                            borderBottomWidth: props.border ? 5 : 0,
                        }] } >
            <TouchableOpacity style={styles.pressable} onPress={ () => returnAction(id, available) } >
                <LabelTextComponent text={label} color={GlobalVars.firstColor} size={20} />
            </TouchableOpacity>
        </View>
    );
}

export default LabelTab;