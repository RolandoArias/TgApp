import * as React from 'react';
import { 
    View, Text, Animated,
    Image, ActivityIndicator
} from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

/** Import Componentes Custom */
import TitleComponent from '../../atoms/Titles';
import CategoryCard from '../../molecules/CategoryCard';

/** Import Translations */
import TranslateText from '../../../utils/useTranslations';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ProductsWish({navigation, lang = "es", userToken = null, ...props}) {

    const [ result, setResult ] = React.useState([]);
    const [ empty, setEmpty ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);

    React.useEffect(() => {
        getProducts();
    }, [userToken]);

    const goToCats = () => {
        // console.log('------------');
        navigation.navigate('Categories');
    }

    const getProducts = () => {

        // console.log('------------');
        //   console.log(userToken);

        setLoading( true );
        
        var myHeaders = new Headers();
        //   myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
        myHeaders.append("Accept", 'application/json');
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Authorization", "Bearer " + userToken);
        var raw = "";
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({raw}),
            redirect: 'follow'
        };
        

        fetch(GlobalVars.urlapi +'/products/my-favorite-products', requestOptions)
        .then(response => response.json())
        .then(responseJson => { 
                // console.log( responseJson );
                if( responseJson.success && responseJson.data )
                    setResult(responseJson.data) ;
                    // console.log( responseJson.data );
            
        })
        .catch(error => {
            // console.log('error', error);
            setLoading( false );
        })
        .finally(() => setLoading(false));

    }
    const handleDelete = () => {

    }
    const redirectPage = (id) => {
        navigation.navigate('Product', { itemProduct: id });
        // console.log( id );
    }
     
    let Cardss = result.map((item, i) => { 
        // console.log("get Cards");  
        let uriimage = '';
        if( item.images && item.images[0] )
            uriimage = item.images[0].url ? item.images[0].url : '' ;
        else 
            uriimage = null;
            return(
                <View style={ styles.root } key={i} >
                    <TouchableOpacity  style={ styles.touchable } onPress={ () => redirectPage(item.id) } >
                    <View style={ styles.imageWrapper } >
                        <Image style={styles.tinyImage} source={{ uri: uriimage}} />
                    </View>
                    <View style={ styles.wrapperContent }>
                        <Text style={ styles.titleCard  }>{item.name}   </Text>
                        <Text style={ styles.priceCard  }>${item.price} </Text>
                        <View style={ styles.ctrlWrapper}>
    
                        </View>
                    </View>
                    </TouchableOpacity>
                    <View style={ styles.iconWrapper } >
                        <TouchableOpacity onPress={ () => handleDelete() } atyle={ styles.wrapperDelete } >
                            <AntDesign name="delete" size={20} color={GlobalVars.bluePantone} />
                        </TouchableOpacity>
                    </View>
                    
                </View>
            );
    });

    return (
        <View style={ styles.rootMain } >

                <Text style={ styles.titleWishProduct } >{ TranslateText(lang, 'Mis Productos Favoritos') }</Text>
                { loading && <ActivityIndicator style={{ alignSelf: 'center', marginVertical: 30 }} size="large" color={GlobalVars.firstColor} /> }
                { loading && <Text style={ styles.loadingText }>{TranslateText(lang, 'cargando...')}</Text> }   
                { !empty && !loading
                    && 
                         Cardss 
                }
                { empty && !loading
                    && <Text style={ styles.titleWishProduct } >{TranslateText(lang,'No tiene productos favoritos')}</Text>
                }
            </View>

        
            
    );
}