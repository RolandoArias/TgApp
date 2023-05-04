import * as React from 'react';

import { 
    Text,
} from 'react-native';

import GlobalVars from '../../../global/globalVars';

import Styles from './style';

const styles = Styles;
const LabelTextComponent = ({text, color, size, ...props}) => {

    if( !text || !color || !size )
    {
        return null; 
    }

    let TextReturn = () => (
        <Text style={[styles.statusStyle, {
            color: color, fontSize: size, 
        }]} >
            {text}
        </Text>
    );        

    return <TextReturn />;
}

export default LabelTextComponent;