import * as React from 'react';
import { 
    View, Text,
    ImageBackground, TouchableOpacity,

} from 'react-native';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;

export default function CategoryCard({uriimage, categoria, countproducts, ...props}) {

    const returnAction = (id, count) => {
        if( props.redirectidMethod && props.redirectid ){
            props.redirectidMethod(id, count);
        }
    }

    if( props.redirectid === undefined || props.redirectid === null )
        return null;

    return (
        <TouchableOpacity 
            style={styles.containerCard}
            onPress={ () => returnAction(props.redirectid, countproducts) } >
            <ImageBackground 
                source={{ uri: uriimage }}
                style={styles.imageBg} 
                imageStyle={styles.imageStyles} >
                    <View style={ styles.contentCard } >
                        <Text style={styles.textCategorie}>{categoria}</Text>
                        <Text style={styles.textInfo}>{countproducts}</Text>
                    </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}