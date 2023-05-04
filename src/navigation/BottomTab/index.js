import * as React from 'react';
import { View } from 'react-native';

import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FirstScreen from '../../screens/FirstScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import WishScreen from '../../screens/WishScreen';
import MenuScreen from '../../screens/MenuScreen';

import GlobalStyles from '../../global/globalVars';
import Styles from './style';

const styles = Styles;

const Tab = createBottomTabNavigator();
function TabBottom() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#EEEEEE',
          tabBarInactiveTintColor: GlobalStyles.firstColor,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) =>
            screenOptions(route, color, focused),
        })}
        barStyle={{ backgroundColor: '#000' }}
      >
        
     
        <Tab.Screen name="Inicio" component={FirstScreen} />
        <Tab.Screen name="Cart" component={CheckoutScreen} />
        <Tab.Screen name="Wish" component={WishScreen} />
        <Tab.Screen name="User" component={FirstScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
      </Tab.Navigator>
    );
}

function screenOptions(route, color, focused) {

    let iconName, type;
    switch (route.name) {
        case 'Inicio':
            iconName = 'home-variant-outline';
            type = 'materialcomm';
            break;
        case 'Cart':
            iconName = 'cart-outline';
            type = 'materialcomm';
            break;
        case 'Wish':
            iconName = 'heart-outline';
            type = 'materialcomm';
            break;
        case 'User':
              iconName = 'user';
              type = 'feather';
              break;
        case 'Menu':
            iconName = 'menu';
            type = 'feather';
            break;
        default:
            null;
            break;
    }
    
    if( type === 'materialcomm' ){

      if(focused){
        return (
          <View style={styles.viewOptions} >
              <View style={styles.viewContent} >
                  <MaterialCommunityIcons name={iconName} size={28} color={ GlobalStyles.firstColor } />
              </View>
          </View>
        )
      }else{
        return <MaterialCommunityIcons name={iconName} size={24} color={ GlobalStyles.grisIntermediate } />
      }

    }

    if( type === 'feather' ){

      if(focused){
        return (
          <View style={styles.viewOptions} >
              <View style={styles.viewContent}>
                  <Feather name={iconName} size={28} color={ GlobalStyles.firstColor } />
              </View>
          </View>
        )
      }else{
        return <Feather name={iconName} size={24} color={ GlobalStyles.grisIntermediate } />
      }

    }
  
}

export default TabBottom;