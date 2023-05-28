import * as React from 'react';

import { View, Modal, Image, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import GlobalVars from '../../../global/globalVars';

/** Import Custom elements */
import ButtonComponent from '../../atoms/ButtonComponent';
import LabelTextComponent from '../../atoms/LabelText';

import Styles from './style';

const styles = Styles;

const ModalsSignup = ({navigation, visible = true, ...props }) => {

  const [modalVisible, setModalVisible] = React.useState(visible);

  const Action = () => {
    setModalVisible(!modalVisible);
    if( props.ToHome ){
      props.ToHome();
    }else if( props.Action ){
      props.Action();
    }else if( props.CloseApp ){
      props.CloseApp();
    }
  }

  const closeAppSignal = () => {
    if( props.CloseApp ){
      //
      AsyncStorage.removeItem('currentUserAcces');
      AsyncStorage.removeItem('currentUserShowName');
      AsyncStorage.removeItem('currentToken');
      navigation.navigate('Login');
      props.CloseApp();
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
            {/* Login error */}
            { props.isLogin && <Image style={styles.stretch} source={require('../../../../assets/images/login/erroraccount.png')} /> }
            { props.isLogin &&
              <LabelTextComponent text="¡Ha ocurrido un error, revisa tu usuario y contraseña!"
                                color={GlobalVars.grisText} 
                                size={14} />
            }
            { props.isLogin &&
              <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
            }

            {/* Singup Exitoso */}
            { props.isSignTrue && <Image style={styles.stretch} source={require('../../../../assets/images/login/sucessaccount.png')} /> }
            { props.isSignTrue &&
              <LabelTextComponent text="¡Tu cuenta ha sido creada exitosamente!"
                                color={GlobalVars.grisText} 
                                size={14} />
            }
            { props.isSignTrue &&
              <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
            }

            { props.isSignFalse && <Image style={styles.stretch} source={require('../../../../assets/images/login/sucessaccount.png')} /> }
            { props.isSignFalse &&
              <LabelTextComponent text="¡Ha ocurrido un error al crear tu cuenta, revisa el formulario!"
                                color={GlobalVars.grisText} 
                                size={14} />
            }
            { props.isSignFalse &&
              <ButtonComponent text="OK" iconName="arrowright" Action={Action} />
            }

            {/* Salir App */}
            { props.isSalirApp && <Image style={styles.stretch} source={require('../../../../assets/images/login/sucessaccount.png')} /> }
            { props.isSalirApp &&
              <LabelTextComponent text="¿Deseas salir de la App?"
                                color={GlobalVars.grisText} 
                                size={14} />
            }
            { props.isSalirApp &&
              <ButtonComponent text="Sí" Action={closeAppSignal} />
            }
            { props.isSalirApp &&
              <ButtonComponent text="No" Action={Action} />
            }
            
          </View>
        </View>
    </Modal>
  );
}

export default ModalsSignup;