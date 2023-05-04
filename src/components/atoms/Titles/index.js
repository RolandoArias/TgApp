import * as React from 'react';

import { 
    StyleSheet, Text,
} from 'react-native';

import GlobalVars from '../../../global/globalVars';

import Styles from './style';

const styles = Styles;
const TitleComponent = ({title, color, size, ...props}) => {

    if( !title || !color || !size )
    {
        return null; 
    }

    let TextReturn = () => (
        <Text style={[styles.statusStyle, {
            color: color, fontSize: size, 
        }]} >
            {title}
        </Text>
    );        

    return <TextReturn />;
}

export default TitleComponent;