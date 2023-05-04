import * as React from 'react';
import { 
    View
} from 'react-native';

import {
    TouchableOpacity,
  } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons'; 

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
export default function SearchButtonIconComponent(props) {

    const handlebutton = () => {
        if( props.changeModalSearch ){
            props.changeModalSearch();
        }
    }

    return(
        <View style={ styles.rootview } >
            <TouchableOpacity style={styles.container} onPress={ () => handlebutton() } >
                <Feather name="search" size={24} color={GlobalVars.azulOscuro} />
            </TouchableOpacity> 
        </View>
    );
}