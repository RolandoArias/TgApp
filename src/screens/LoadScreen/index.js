import * as React from 'react';

import { 
    View, Image, StyleSheet, ActivityIndicator,
} from 'react-native';

import { 
    Text, 
} from 'native-base';

import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';

/** Import Global Variables */
import GlobalVars from '../../global/globalVars';

/** Import Componentes Custom */
import StatusBarComponent from '../../components/atoms/StatusBar';
import TitleComponent from '../../components/atoms/Titles';

import Styles from './style';

const styles = Styles;
const LoadScreen = ({navigation}) => {

    return (
        <View style={styles.viewHome} >
            <StatusBarComponent />

            <TitleComponent color={GlobalVars.firstColor} size={18} title="Cargando..." />
            <ActivityIndicator size="large" color={GlobalVars.firstColor} style={{ marginTop: 30 }} />
        </View>
    );
}

export default LoadScreen;