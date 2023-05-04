import * as React from 'react';

import { 
  View, Modal, Image, TouchableOpacity,
  Animated,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { AntDesign } from '@expo/vector-icons'; 

import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

/** Import Translations */
import TranslateText from '../../../utils/useTranslations';

/** Import Global vars */
import GlobalVars from '../../../global/globalVars';

/** Import Custom elements */
import ButtonComponent from '../../atoms/ButtonComponent';
import LabelTextComponent from '../../atoms/LabelText';
import ResultSearchCard from '../../molecules/ResultSearchCard';

import Styles from './style';

const styles = Styles;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ModalSearch = ({ visible = true, searchlabel = "Buscar", lang = "es", ...props }) => {

  /** Caption results to search */
  const results = (Array.isArray(props.searchProducts) && props.searchProducts) ? props.searchProducts : [];

  const [modalVisible, setModalVisible] = React.useState(visible);

  const Action = () => {
    setModalVisible(!modalVisible);
    if( props.ctrlModal ){
      props.ctrlModal();
    }
  }

  const updateSearch = (search) => {
    if( props.changeText ){
      props.changeText(search);
    }
  }

  const redirectToProductID = (id) => {
    if( props.redirectToProduct ){
      props.redirectToProduct(id);
    }
  }

  const ResultsToSearch = (param) => {

    // render results
    let respo = results.map((item, i) => {      
      return <ResultSearchCard key={i} name={item.name} price="3.3" imageuri={item.images} idproduct={item.id} redirectToProduct={redirectToProductID} />;

    });

    return respo;
  }

  return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          null;
        }}
    >
        <View style={styles.centeredView} >
          <View style={styles.modalView} >

            { /** Close Element */ }
            <TouchableOpacity style={ styles.closeElement } onPress={Action} >
              <AntDesign name="close" size={20} color={GlobalVars.firstColor} />
            </TouchableOpacity>
            {/* Search Bar */}
            <SearchBar
              placeholder={searchlabel}
              value={ props.searchText ? props.searchText : '' }
              onChangeText={(text) => updateSearch(text)}
              underlineColorAndroid="transparent"
              // editable={false}
              lightTheme={true}
              containerStyle={ styles.containerSearch }
              inputContainerStyle={ styles.inputContainerStyle }
              inputStyle={ styles.inputStyle }
              leftIconContainerStyle={ styles.leftIconContainerStyle } />   

            <LabelTextComponent text={ TranslateText(lang, 'Resultados para tu busqueda') } color={GlobalVars.bluePantone} size={18} />

            <AnimatedScrollView
                    style={ styles.stylesResult } 
                    contentContainerStyle={ styles.contentResult } >
                      { ResultsToSearch() }
            </AnimatedScrollView>     
            
          </View>
        </View>
    </Modal>
  );
}

export default ModalSearch;