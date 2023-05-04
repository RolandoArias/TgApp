import * as React from 'react';

import { View, Modal, Image, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import GlobalVars from '../../../global/globalVars';

/** Import Custom elements */
import ButtonComponent from '../../atoms/ButtonComponent';
import LabelTextComponent from '../../atoms/LabelText';

import Styles from './style';

const styles = Styles;

const ModalsCheckout = ({navigation, visible = true, ...props }) => {

  const [modalVisible, setModalVisible] = React.useState(visible);

  const Action = () => {
    setModalVisible(!modalVisible);
    if( props.CloseModal ){
      if( props.isUpdateCheckout ){
        props.CloseModal(1);
      }else if( props.isDropCheckout ){
        props.CloseModal(2);
      }
    }
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {/* Agregado al carrito */}
            { props.isAddcheckout && <Image style={styles.stretch} source={require('../../../../assets/images/Checkout/addCheckout.png')} /> }
            { props.isAddcheckout &&
              <LabelTextComponent text="¡Producto agregado al carrito!"
                                color={GlobalVars.grisText} 
                                size={14} />
            }
            { props.isAddcheckout &&
              <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
            }

            {/* Actualizando del carrito */}
            { props.isUpdateCheckout && <Image style={styles.stretch} source={require('../../../../assets/images/Checkout/addCheckout.png')} /> }
            { props.isUpdateCheckout &&
              <LabelTextComponent text="¡Carrito actualizado!"
                                color={GlobalVars.grisText} 
                                size={14} />
            }
            { props.isUpdateCheckout &&
              <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
            }

            {/* Eliminando del carrito */}
            { props.isDropCheckout && <Image style={styles.stretch} source={require('../../../../assets/images/Checkout/addCheckout.png')} /> }
            { props.isDropCheckout &&
              <LabelTextComponent text="Producto eliminado!"
                                color={GlobalVars.grisText} 
                                size={14} />
            }
            { props.isDropCheckout &&
              <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
            }
            
          </View>
        </View>
    </Modal>
  );
}

export default ModalsCheckout;