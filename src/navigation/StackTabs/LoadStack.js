import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/** Import Load Screen */
import LoadScreen from '../../screens/LoadScreen';

/** Import Theme */
import { MyTheme } from './style';

const Stack = createStackNavigator();

const LoadStack = () => {

    return(
        <NavigationContainer theme={MyTheme} >
            <Stack.Navigator initialRouteName="Load" >
                <Stack.Screen
                    name="Load"
                    component={ LoadScreen }
                    options={{ headerShown: false }}
                /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
    
};

export default LoadStack;