import * as React from 'react';
import { 
    View, Text, Animated,

} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

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

export default function CategoriesCarouselComponent({navigation, lang = "es", userToken = null}) {

    const [ result, setResult ] = React.useState([]);

    React.useEffect(() => {
        /** Get categories */
        getCategories();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            /** Refresh result components */
            /** Get categories */
            getCategories();
            return () => 1;
        }, [])
    );

    const redirectPage = (id, count) => {
        navigation.navigate('Categories', { itemCat: id, counter: count });
        // console.log( id );
    }

    const goToCats = () => {
        // console.log('------------');
        navigation.navigate('Categories');
    }

    const getCategories = () => {

        // console.log('------------');
        // console.log(userToken);
        
        var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTA4ZWI5ZDEzMDE0Mjc0NDA5NjU2NDZiNDFiOGE4YzQzODQ3ZjBjNGFlMjA2NTQ4ZmM5NGE1MWMwNWZlMGUzMzNmNWRjMTAwNTY3YWVmMTQiLCJpYXQiOiIxNjE4NTkwNzAxLjc5MDQ5NiIsIm5iZiI6IjE2MTg1OTA3MDEuNzkwNDk5IiwiZXhwIjoiMTY1MDEyNjcwMS43ODY2NDMiLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.3pyq5mM_TPvePXBea-zCNbY0Qg4EzPMpyfFcNzBtfA6TgHXULuoPnOcZGqO2EQAXFfmgQULk_EAAnSXreHKjiAW-0zMHeFVdpSR4Nk1lyKqiSH-G8SMak-mSO7n0zZxySmTGmh90SaCeLbJrUtugb_J6a8-8GTmcHBGcZMmD0mmmksXtw3ac180RYquWf6wegNDzZPWWLr-RRjs5SYtflAijGDJ_uzuOLGpfSx6jDAjqwG8v3STPiQvBbbPcv0X0a5sKoQ-M3rlj-RBj6tDYLTKJVIF3YB-2mEPzhbqOqkzxB-yzcfbBFv_YvOCAfD5DVOM5vUZliZ1jaeQf_8fECmihgshR1mxvN0aEYPZnxPGkFOtMEYOnOiqTAoyW4R7AX2YagyQABCXTknSD5pXquCkYbSpyC_YJ8feK4tfgJWDjt-TiVj5wjlqshzqO1XinZd-PeHQ2w-FegeO5Y_FWeNJ0gbokrvWCcSdqXapAmKyiGVSdDQnXKEEV9tQdk2oMGVv_MSRmIXsR5oY3M0jlGu90Qf3z_y-EuCeLE_8Ga147WgPYzFablDFOK1YcjS1p1k55aA8a2oCrtKm7tijfiaMfCD9rjqwetJ4qzY8fKY9Sjs3Fwm7asiLY8HaTVhIheyDKb-XfoW2UjCSSKKoQEnRCNIIY3VSJejmjs8kCQQk");
        myHeaders.append("Authorization", "Bearer " + userToken);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(GlobalVars.urlapi + "/categories", requestOptions)
        .then(response => response.json())
        .then(responseJson => { 
            if( responseJson.success && responseJson.data )
                setResult(responseJson.data) ;
            
        })
        .catch(error => {
            /* console.log('error', error) */
        });

    }

    let cards = result.map((item, i) =>
        <CategoryCard 
            key={i}
            uriimage={item.pictures} 
            categoria={item.name} 
            redirectid={item.id}
            countproducts={item.countProducts}
            redirectidMethod={redirectPage} />
    );

    return (
        <View style={ styles.rootView } >
            <View style={styles.viewContainer} > 
                <View style={styles.headerContent} >
                    <TitleComponent title={ TranslateText(lang, "Categorías") } color={GlobalVars.grisColor} size={22} />
                    <Text style={ styles.viewAllLabel } onPress={ () => goToCats() }>{ TranslateText(lang, "Ver todas") }</Text>
                </View>
                <AnimatedScrollView
                    style={ styles.stylesCarousel } 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    snapToInterval={2}
                    decelerationRate="fast"
                    bounces={ false }
                    bouncesZoom={ true }
                    pagingEnabled
                    contentContainerStyle={ styles.contentCarousel } >
                    { cards }
                </AnimatedScrollView>
            </View>
        </View>
    );
}