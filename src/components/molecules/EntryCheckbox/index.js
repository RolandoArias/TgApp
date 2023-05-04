import React from 'react';
import { 
    View, Text, 
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
const CheckboxEntry = ({label, statuscheck = false, ...props}) => {

    const setValue = () => {
        if( props.setValue ){
            props.setValue();
        }
    }

    return (
        <View style={ styles.rootView } >
            <View style={styles.inner} >
                <View style={styles.checkview} >
                    <Checkbox 
                        style={styles.checkbox} 
                        value={statuscheck} 
                        onValueChange={ () => setValue() }
                        color={statuscheck ? GlobalVars.firstColor : undefined} />
                    <Text style={styles.texto}>{label}</Text>
                </View>
            </View>
        </View>
    );
}

export default CheckboxEntry;