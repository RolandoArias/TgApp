import * as React from 'react';
import { 
    View, Text, Animated,

} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

/** Import Componentes Custom */
import TitleComponent from '../../atoms/Titles';
import BuyedCard from '../../molecules/BuyedCard';

/** Import Translations */
import TranslateText from '../../../utils/useTranslations';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function LatestBuyCarouselComponent({navigation, lang = "es", userToken = null}) {

    const [ result, setResult ] = React.useState([]);

    React.useEffect(() => {
        /** Get results */
        getResults();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            /** Refresh result components */
            /** Get Latest Buy */
            getResults();
            return () => 1;
        }, [])
    );

    const redirectPage = (id) => {
        // navigation.navigate('Category');
        // console.log( id );
    }

    const goToBuyedAlls = () => {
        // console.log('------------');
    }

    const getResults = () => {

        var myHeaders = new Headers();        
        myHeaders.append("Authorization", "Bearer " + userToken);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(GlobalVars.urlapi + "/orders/last-shopping", requestOptions)
        .then(response => response.json())
        .then(responseJson => { 
            if( responseJson.success && responseJson.data)
                setResult(responseJson.data) ;
            
        })
        .catch(error => {
            console.log('error', error);
        });

    }

    let cards = result.map((item, i) =>
        <BuyedCard 
            key={i}
            totalproducts={item.count_product} 
            totalpricefinal={item.total_price}
            totalpricereal={item.real || 0}
            date={item.created_at}
            redirectid={item.order_id}
            redirectidMethod={redirectPage} />
    );

    return (
        <View style={ styles.rootView } >
            <View style={styles.viewContainer} > 
                <View style={styles.headerContent} >
                    <TitleComponent title={ TranslateText(lang, "Últimas compras") } color={GlobalVars.grisColor} size={22} />
                    <Text style={ styles.viewAllLabel } onPress={ () => goToBuyedAlls() }>{ TranslateText(lang, "Ver todas") }</Text>
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