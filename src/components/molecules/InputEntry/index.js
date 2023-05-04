import React, {useState} from 'react';
import { 
    View, KeyboardAvoidingView, TouchableWithoutFeedback,
    TextInput, Keyboard, Platform, 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

/** Import Styles for this Screen */
import Styles from './style';

const styles = Styles;
const InputEntry = ({iconName, label, textvariable, pass = false, ...props}) => {

    const visibility = props.visibility ? true : null;
    const IconRender = <Feather style={styles.iconstyle} name={iconName} size={20} color={GlobalVars.firstColor} />;

    const [ hiddenstatus, setHiddenstatus ] = useState(false);

    const setValue = (value) => {
        if( props.setValue ){
            props.setValue(value);
        }
    }

    let iconeye = null;
    if( visibility ){
        iconeye = hiddenstatus 
                    ? <Feather style={styles.eye} name="eye" color={GlobalVars.grisIntermediate} onPress={ () => setHiddenstatus( !hiddenstatus ) } size={25} /> 
                    : <Feather style={styles.eye} name="eye-off" color={GlobalVars.grisIntermediate} onPress={ () => setHiddenstatus( !hiddenstatus ) } size={25} /> ;
    }

    return (
        <View style={ styles.rootView } >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={styles.inner} >
                        { IconRender }
                        {
                            !hiddenstatus && pass
                            ?
                            <TextInput 
                                placeholder={label} 
                                style={styles.textInput}
                                onChangeText={ text => setValue(text) }
                                value={textvariable}
                                secureTextEntry={true} />
                            :
                            <TextInput 
                                placeholder={label} 
                                style={styles.textInput}
                                onChangeText={ text => setValue(text) }
                                value={textvariable}
                                secureTextEntry={false} />
                        }
                        
                        { iconeye }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}

export default InputEntry;