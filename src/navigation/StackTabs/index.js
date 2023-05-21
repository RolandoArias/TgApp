import React, {useState, useEffect} from 'react';

import MainStack from './MainStack';
import LoadStack from './LoadStack';

import AsyncStorage from '@react-native-community/async-storage';

const AppNavigator = ({TabBottom}) => {

    const [ redirect, setRedirect ]= useState('Initial');
    const [ finished, setFinished ] = useState(false);

    useEffect( () => {
        VerifySession();
    }, []);

    const VerifySession = async () => {
        try {
            let token = JSON.parse( await AsyncStorage.getItem('currentToken') );
            let response = (token != null && token.length > 0 ) ? true : false;
            // console.log( {token}, {response} );
            if( response ){
                setRedirect('Home');
                setFinished(true);
            }else{
                setFinished(true);
            }
        } catch (error) {
            // Error retrieving data
            // console.log(error);
            setFinished(true);
        }
    }

    if( !finished ){

        return <LoadStack />;

    }

    return <MainStack TabBottom={TabBottom} redirect={redirect} />;
    
};

export default AppNavigator;