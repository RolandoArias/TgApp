import * as React from 'react';

import { 
    Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import globalVars from '../../../global/globalVars';

const StatusBarComponent = (props) => {

    return (
        <StatusBar 
            backgroundColor={ globalVars.firstColor } 
            style={ Platform.OS !== 'ios' ? "light" : "dark" } />
    );
}

export default StatusBarComponent;