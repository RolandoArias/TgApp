import * as React from 'react';

import { Icon, Fab } from 'native-base';

/** Import Global Variables */
import GlobalVars from '../../../global/globalVars';

const FABCheckout = () => {

    return(
        <Fab
            active={true}
            direction="up"
            position="absolute"
            containerStyle={{ }}
            style={{ backgroundColor: GlobalVars.firstColor }}
            onPress={ () => navigation.navigate('Cart') } >
                <Icon name="cart" />
        </Fab>
    );
}

export default FABCheckout;