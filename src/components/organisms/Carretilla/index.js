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

export default function Carretilla({navigation, lang = "es", userToken = null, cart = [], ...props}) {

    // console.log( {cart} );

    React.useEffect(() => {
        /** Return to Screen Cart */
        getReverse();
    }, []);

    // Hook change to cart
    React.useEffect(() => {
        /** Return to Screen Cart */
        getReverse();
    }, [cart]);

    const redirectPage = (id, count) => {
        navigation.navigate('Categories', { itemCat: id, counter: count });
        // console.log( id );
    }

    const goToCats = () => {
        // console.log('------------');
        navigation.navigate('Categories');
    }

    const handleDelete = (id) => {
        if( props.handleDrop ){
            props.handleDrop(id);
        }
    }

    const getReverse = () => {
        let total = 0;
        let subtotal = 0;
        if( Array.isArray(cart) && cart.length > 0 ){
            cart.map((item, i) => {
                subtotal = subtotal + (item.unitprice * item.qty);

                if( i === cart.length - 1 ){

                    if( !envio ){ envio = 'Gratis'; }
                    total = ( envio && typeof envio === 'number' && envio !== 0 ) ? (subtotal + envio) : subtotal;
                }
            });
        }
        // console.log( {total} );
        
        if( props.changeTotal ){
            props.changeTotal(total);
        }
    }

    const IncrementProduct = (idp) => {
        if( props.IncrementProduct ){
            props.IncrementProduct(idp);
        }
    }

    const DecrementProduct = (idp) => {
        if( props.DecrementProduct ){
            props.DecrementProduct(idp);
        }
    }

    let subtotal = 0;
    let total = 0;
    let envio = '';
    let Cards = cart.map((item, i) => {

        subtotal = subtotal + (item.unitprice * item.qty);

        if( i === cart.length - 1 ){

            if( !envio ){ envio = 'Gratis'; }
            total = ( envio && typeof envio === 'number' && envio !== 0 ) ? (subtotal + envio) : subtotal;

            return(
                <View style={{ width: '100%',  }} key={i} >
                    <View style={ styles.root } id={item.id} >
                        <View style={ styles.imageWrapper } >
                            <Image style={styles.tinyImage} 
                                    source={{ uri: item.image }} />
                        </View>
                        <View style={ styles.wrapperContent } >
                            <Text style={ styles.titleCard } >{item.name}</Text>
                            <Text style={ styles.priceCard } >${item.unitprice * item.qty}</Text>
                            <View style={ styles.ctrlWrapper } >
                                <TouchableOpacity style={ styles.plusIcon } onPress={ () => IncrementProduct(item.id) } >
                                    <AntDesign name="plus" size={15} color={GlobalVars.bluePantone} />
                                </TouchableOpacity>
                                <View style={ styles.countProducts } > 
                                    <Text style={styles.qtyText} >{item.qty}</Text>
                                </View>
                                <TouchableOpacity style={ styles.minusIcon } onPress={ () => DecrementProduct(item.id) } >
                                    <AntDesign name="minus" size={15} color={GlobalVars.bluePantone} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={ styles.iconWrapper } >
                            <TouchableOpacity onPress={ () => handleDelete(item.id) } atyle={ styles.wrapperDelete } >
                                <AntDesign name="delete" size={20} color={GlobalVars.grisIntermediate} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={ styles.rootTotalCard } >
                        <View style={ styles.row } >
                            <View style={ styles.col1 } ><Text style={ styles.textcol1 } >{ TranslateText(lang, 'Subtotal') }</Text></View>
                            <View style={ styles.col2 } ><Text style={ styles.textcol2 } >${subtotal}</Text></View>
                        </View>
                        <View style={ styles.row } >
                            <View style={ styles.col1 } ><Text style={ styles.textcol1 } >{ TranslateText(lang, 'Envío') }</Text></View>
                            <View style={ styles.col2 } ><Text style={ styles.textcol2 } >{envio}</Text></View>
                        </View>
                        <View style={ styles.row } >
                            <View style={ styles.col1 } ><Text style={ styles.textcol1 } >{ TranslateText(lang, 'Total') }</Text></View>
                            <View style={ styles.col2 } ><Text style={ styles.textcol2 } >${total}</Text></View>
                        </View>
                    </View>
                </View>
            );
        }else{
            return(
                <View style={ styles.root } key={i} id={item.id} >
                    <View style={ styles.imageWrapper } >
                        <Image style={styles.tinyImage} 
                                source={{ uri: item.image }} />
                    </View>
                    <View style={ styles.wrapperContent } >
                        <Text style={ styles.titleCard } >{item.name}</Text>
                        <Text style={ styles.priceCard } >${item.unitprice * item.qty}</Text>
                        <View style={ styles.ctrlWrapper } >
                            <TouchableOpacity style={ styles.plusIcon } onPress={ () => IncrementProduct(item.id) } >
                                <AntDesign name="plus" size={15} color={GlobalVars.bluePantone} />
                            </TouchableOpacity>
                            <View style={ styles.countProducts } > 
                                <Text style={styles.qtyText} >{item.qty}</Text>
                            </View>
                            <TouchableOpacity style={ styles.minusIcon } onPress={ () => DecrementProduct(item.id) } >
                                <AntDesign name="minus" size={15} color={GlobalVars.bluePantone} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={ styles.iconWrapper } >
                        <TouchableOpacity onPress={ () => handleDelete(item.id) } atyle={ styles.wrapperDelete } >
                            <AntDesign name="delete" size={20} color={GlobalVars.grisIntermediate} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

    });

    if ( !Array.isArray(cart) || cart.length < 1) return null;

    return (
        <View style={ styles.rootMain } >
            <Text style={ styles.titleCarretilla } >{ TranslateText(lang, 'Mi Carretilla') }</Text>
            { Cards }
            { cart.length === 0 && <Text style={ styles.titleCarretilla }>Sin productos agregados</Text> }
        </View>
    );
}