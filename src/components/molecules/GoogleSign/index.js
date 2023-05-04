import React, {useState, useEffect} from 'react';

/** Expo Auth */
//import firebase from 'firebase';
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from 'expo-auth-session/providers/google';

/** Global Vars */
import GlobalVars from '../../../global/globalVars';

/** Import FB Button Component */
import ButtonGoogle from '../../../components/atoms/ButtonGoogle';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(
        /** Config */
        GlobalVars.firebaseConfig
    );
}

/** WebBrowser Auth */
WebBrowser.maybeCompleteAuthSession();

const GooSign = (props) => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ uid, setUid ] = useState('');
    const [ token, setToken ] = useState('');
    const [ returning, setReturning ] = useState('');

    /** Enviroment To Google Auth */
    const [request, response = null, promptAsync] = Google.useIdTokenAuthRequest({
        // expoClientId: GlobalVars.expoClientIDGoogleSign,
        // iosClientId: GlobalVars.expoClientIDGoogleSign,
        // androidClientId: GlobalVars.expoClientIDGoogleSign,
        // webClientId: GlobalVars.expoClientIDGoogleSign,
        clientId: GlobalVars.expoClientIDGoogleSign,
    });
    
    useEffect( () => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            firebase.auth().signInWithCredential(credential);

            setToken( id_token );

            // console.log( id_token );
            // console.log(response);

            var user = firebase.auth().currentUser;
            // console.log(user);
            if (user) {
                // User is signed in.
                // setName( user.displayName );
                // setEmail( user.email );
                // setUid( user.uid );
                // setToken( response.params.id_token );

                // console.log({name}, {email}, {token});
                console.log( response.params.id_token.length );

            } else {
                // No user is signed in.
            }
        }
    }, [response]);

    // Hooke de returning To Screen
    useEffect(() => {

        if(props.GoogleAction){
            // console.log('---------------');
            props.GoogleAction( 'sucess' );
        }
        // console.log(11111);

    }, [token]);

    const GoogleSign = () => {
        
        promptAsync();
    
    }

    return(
        <ButtonGoogle GoogleSign={GoogleSign} />
    );

}

export default GooSign;