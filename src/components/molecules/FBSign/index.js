import React, {useState, useEffect} from 'react';

/** Expo Auth */
//import firebase from 'firebase';
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";

/** Global Vars */
import GlobalVars from '../../../global/globalVars';

/** Import FB Button Component */
import ButtonFB from '../../../components/atoms/ButtonFacebook';

/** WebBrowser Auth */
WebBrowser.maybeCompleteAuthSession();

const FBSign = () => {

    /** Enviroment To Facebook Auth */
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: GlobalVars.FB_APP_ID,
        responseType: ResponseType.Code,
    });
    
    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log(response);
        }
    }, [response]);

    const FacebookSign = () => {
        
        promptAsync();

        // if(props.FacebookSign){
        //     props.FacebookSign(response?.type, )
        // }
    
    }

    return(
        <ButtonFB FacebookSign={FacebookSign} />
    );

} 

export default FBSign;