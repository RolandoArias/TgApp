import * as React from 'react';
import { 
    View, TouchableOpacity, Text, Image,
    Platform,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

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
export default function HeaderMenuComponent({name, lang = "es", ...props}) {

    const [ printLabel, setPrintlabel ] = React.useState('');

    React.useEffect( () => {
        // console.log(name);
    }, []);

    
    const returnAction = () => {
        if( props.Action){
            props.Action();
        }
    }

    return (
        <View style={ styles.rootView } >

            <View style={styles.container} > 
                <Text style={ styles.titleMenu } >{ TranslateText(lang, 'Menu') }</Text>                
            </View>

            <View style={styles.container0} >  
                <View style={styles.container1}>
                    <Text  style={styles.titleName}>{name}</Text>                
                </View>              
                <View style={styles.container2}>
                    <Image style={styles.pictureProfile} source={require('../../../../assets/images/login/logo.jpg')} />
                </View>
            </View>
            <View style={styles.containerRow}>
                <TouchableOpacity 
                    style={styles.containerCard}
                    onPress={ () => returnAction(props.redirectid) } >
                    <View style={styles.headerCard} >
                        <Text style={ styles.date }>Mis Compras</Text>
                    </View>
                    <View style={ styles.contentCard } >
                        <Text style={styles.textTotal}>1313123</Text>
                        <View style={styles.footerCard} >
                            <Text style={styles.textPriceFinal}>asdasd</Text>                        
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.containerCard}
                    onPress={ () => returnAction(props.redirectid) } >
                    <View style={styles.headerCard} >
                        <Text style={ styles.date }>Mis Direcciones</Text>
                    </View>
                    <View style={ styles.contentCard } >
                        <Text style={styles.textTotal}>1313123</Text>
                        <View style={styles.footerCard} >
                            <Text style={styles.textPriceFinal}>asdasd</Text>                        
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.containerRow}>
                <TouchableOpacity 
                    style={styles.containerCard}
                    onPress={ () => returnAction(props.redirectid) } >
                    <View style={styles.headerCard} >
                        <Text style={ styles.date }>Mis mensajes</Text>
                    </View>
                    <View style={ styles.contentCard } >
                        <Text style={styles.textTotal}>1313123</Text>
                        <View style={styles.footerCard} >
                            <Text style={styles.textPriceFinal}>asdasd</Text>                        
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.containerCard}
                    onPress={ () => returnAction(props.redirectid) } >
                    <View style={styles.headerCard} >
                        <Text style={ styles.date }>FAQ's</Text>
                    </View>
                    <View style={ styles.contentCard } >
                        <Text style={styles.textTotal}>1313123</Text>
                        <View style={styles.footerCard} >
                            <Text style={styles.textPriceFinal}>asdasd</Text>                        
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.containerRow}>
                <TouchableOpacity 
                    style={styles.containerCard}
                    onPress={ () => returnAction(props.redirectid) } >
                    <View style={styles.headerCard} >
                        <Text style={ styles.date }>Cerrar Sesion</Text>
                    </View>
                    <View style={ styles.contentCard } >
                        <Text style={styles.textTotal}>1313123</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}