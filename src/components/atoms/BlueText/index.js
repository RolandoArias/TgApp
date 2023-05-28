import * as React from 'react';

import { 
    Text,
} from 'react-native';

import Styles from './style';

const styles = Styles;
const BlueTextComponent = ({text, color, size, ...props}) => {

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

export default BlueTextComponent;