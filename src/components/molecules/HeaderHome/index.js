import * as React from 'react';
import { 
    View, TouchableOpacity, Text,
    Platform,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';

/** Import Translations */
import TranslateText from '../../../utils/useTranslations';

/** Import Componentes Custom */
import TitleComponent from '../../atoms/Titles';
import BlueTextComponent from '../../atoms/BlueText';
import LabelTextComponent from '../../atoms/LabelText';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
export default function HeaderHomeComponent({name, question = "", searchlabel = "Buscar", lang = "es", ...props}) {

    const [ printLabel, setPrintlabel ] = React.useState('');

    React.useEffect( () => {
        // console.log(name);
    }, []);

    const setearDayLabel = () => {
        var today = new Date();
        var curHr = today.getHours();
        
        if (curHr < 12) {
            // console.log('good morning');
            return ( TranslateText(lang, 'buenos dias') + ' ' + name + ',' );

        } else if (curHr < 18) {
            // console.log('good afternoon');
            return ( TranslateText(lang, 'buenas tardes') + ' ' + name + ',' );
        } else {
            // console.log('good evening');
            return( TranslateText(lang, 'buenas noches') + ' ' + name + ',' );
        }
    }

    const returnAction = () => {
        if( props.Action){
            props.Action();
        }
    }

    return (
        <View style={ styles.rootView } >
            <View style={styles.container} > 
                { <TitleComponent title={ setearDayLabel() } color={GlobalVars.grisColor} size={20} /> }
                <BlueTextComponent text={question} color={GlobalVars.bluePantone} size={16} />
                <TouchableOpacity 
                    style={ styles.touchableStyle }
                    onPress={ () => { returnAction() }} >
                    <SearchBar
                        placeholder={searchlabel}
                        value=""
                        underlineColorAndroid="transparent"
                        editable={false}
                        lightTheme={true}
                        containerStyle={ styles.containerSearch }
                        inputContainerStyle={ styles.inputContainerStyle }
                        inputStyle={ styles.inputStyle }
                        leftIconContainerStyle={ styles.leftIconContainerStyle } />
                        {
                            Platform.OS !== 'ios'
                            ?
                            null
                            :
                            <Text style={ styles.textSearch }>{searchlabel}</Text>
                        }
                </TouchableOpacity>
            </View>
        </View>
    );
}