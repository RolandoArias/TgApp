import * as React from 'react';
import { 
    View, TouchableOpacity,
} from 'react-native';

/** Import Translations */
import TranslateText from '../../../utils/useTranslations';

/** Import Componentes Custom */
import TitleComponent from '../../atoms/Titles';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
export default function SwicthPurchasingProcess({status, lang = "es", ...props}) {

    React.useEffect( () => {
        // console.log(name);
    }, []);

    const returnAction = (value) => {
        if( props.Action){
            props.Action(value);
        }
    }

    return (
        <View style={ styles.rootView } >
            <View style={styles.container} > 
                <TouchableOpacity 
                    style={ [ styles.touchableStyle, {
                        backgroundColor: GlobalVars.bluePantone, borderBottomLeftRadius: 15, 
                        borderTopLeftRadius: 15, borderBottomRightRadius: status === 1 ? 15 : 0, 
                        borderTopRightRadius: status === 1 ? 15 : 0,
                    } ] }
                    onPress={ () => { returnAction(1) }} >
                    <TitleComponent title={ TranslateText(lang, "Envio") } color={GlobalVars.white} size={12} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={ [ styles.touchableStyle, {
                        backgroundColor: status === 2 || status === 3 ? GlobalVars.bluePantone : 'transparent', 
                        borderBottomRightRadius: status === 2 ? 15 : 0, 
                        borderTopRightRadius: status === 2 ? 15 : 0, 
                    } ] }
                    onPress={ () => { returnAction(2) }} >
                    <TitleComponent title={ TranslateText(lang, "Pago") } 
                        color={status === 2 || status === 3 ? GlobalVars.white : GlobalVars.grisIntermediate } size={12} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={ [ styles.touchableStyle, {
                        backgroundColor: status === 3 ? GlobalVars.bluePantone : 'transparent', 
                        borderBottomRightRadius: status === 3 ? 15 : 0, 
                        borderTopRightRadius: status === 3 ? 15 : 0, 
                    } ] }
                    onPress={ () => { returnAction(3) }} >
                    <TitleComponent title={ TranslateText(lang, "Confirmacion") } 
                        color={status === 3 ? GlobalVars.white : GlobalVars.grisIntermediate} size={12} />
                </TouchableOpacity>
            </View>
        </View>
    );
}