import * as React from 'react';
import { 
    View, Text, Animated,
    Image
} from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

/** Import Componentes Custom */

/** Import Translations */
import TranslateText from '../../../utils/useTranslations';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function PopBoxesCheckout({navigation, lang = "es", userToken = null, ...props}) {

    const [ result, setResult ] = React.useState([]);

    React.useEffect(() => {
        /** Get categories */
        getBoxes();
    }, []);

    const redirectPage = (id, count) => {
        navigation.navigate('Categories', { itemCat: id, counter: count });
        // console.log( id );
    }

    const goToCats = () => {
        // console.log('------------');
        navigation.navigate('Categories');
    }

    const getBoxes = () => {

        var myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + userToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(GlobalVars.urlapi + "/banners/shoping", requestOptions)
        .then(response => response.json())
        .then(responseJson => { 
            if( responseJson.success && responseJson.data && responseJson.data ){
                setResult(responseJson.data) ;
                // console.log( responseJson.data );
            }
            
        }).catch(error => {
            // console.log('error', error) 
        });
        
    }

    let Cards = result.map((item, i) => {

        return(
            <View style={ styles.root } key={i} >
                <View style={ styles.imageWrapper } >
                    <Image style={styles.tinyImage} 
                            source={{ uri: item.url }} />
                </View>
                <View style={ styles.wrapperContent } >
                    <Text style={ styles.titleCard } >{ item.title }</Text>
                    <Text style={ styles.textCard } >
                        { item.description }
                    </Text>
                </View>
            </View>
        );

    });

    if ( !Array.isArray(result) || result.length < 1) return null;

    return (
        <View style={ styles.rootMain } >
            { Cards }
        </View>
    );
}