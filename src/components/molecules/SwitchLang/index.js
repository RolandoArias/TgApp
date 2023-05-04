import * as React from 'react';
import { 
    View, Text, TouchableOpacity,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';
import { set } from 'react-native-reanimated';

const styles = Styles;
const SwitchEntryLang = ({lang = "es", ...props}) => {

    React.useEffect(() => {
        
    }, []);

    const setValue = () => {
        let value = lang === 'es' ? 'en' : 'es';
        // console.log( value );
        if( props.setLanguage ){
            props.setLanguage(value);
        }
    }

    return (
        <View style={ styles.rootView } >
            <TouchableOpacity style={styles.button} onPress={ () => setValue() } > 
                { lang === 'es' && <Text style={styles.texto} >EN</Text> }
                { lang === 'en' && <Text style={styles.texto} >ES</Text> }
            </TouchableOpacity>
        </View>
    );
}

export default SwitchEntryLang;