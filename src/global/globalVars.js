import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const GlobalVars = {

	/** Tracking & Register Config */
    firebaseConfig: {
		apiKey: "AIzaSyC1ISCOYOBk3nYjtWKXUgsAx4m1ONNra1Q",
		authDomain: "tgapp-7efa3.firebaseapp.com",
		projectId: "tgapp-7efa3",
		storageBucket: "tgapp-7efa3.appspot.com",
		messagingSenderId: "361900939499",
		appId: "1:361900939499:web:cf384ac0cec1098e3946ae",
		measurementId: "G-SCJJWXP4L2"
	    
	},

	/** OAuth Android Client */
	androidClientId: '879554585787-rvci6rgla52te0d6ce6kghq1mnmn9gbt.apps.googleusercontent.com',

	/** OAuth adicional */
	expoClientIDGoogleSign: '879554585787-mvlakf0c4dth9cpaauo98235tff9lg5v.apps.googleusercontent.com',


	/** SHA1 */
	SHA1: '36:08:51:29:F7:B7:96:B7:66:77:E6:56:90:93:7C:DD:2D:44:D2:4B',

	/** SHA256 */
	SHA256: 'CA:00:0E:FB:60:A3:04:AD:33:75:3C:54:C8:23:B7:F2:B5:4F:BE:4F:BB:F5:E9:D4:D7:E2:85:18:27:DA:48:21',


	/** API PATH **/
	urlapi: 'http://137.184.17.33/api',


	/** KEY REQUEST **/
	keyres: 'oifuypreh9034h0nxcbyrey8dhuphdipbufe88pfq8gcsfadr',


	/** Fonts generals fields */
	fontFamily: 'Montserrat',


	/** View Configurations */
	fondoPrincipal: '#FFF',
	white: '#FFF',
	black: '#000',
	googleColor: '#DC1327',
	facebookColor: '#003B8B',
	firstColor: '#BA0E18',
	grisColor: '#3C3C3C',
	grisOscuro: '#BABABA',
	grisIntermediate: '#717171',
	grisPlane: 'rgba(117, 117, 117, 0.2)', 
	grisText: 'rgba(60, 60, 60, 1)',
	bluePantone: 'rgba(0, 32, 91, 1)',
	azulOscuro: '#3F3D56',


	/** ViewPort Dimensions */
	windowWidth: windowWidth,
	windowHeight: windowHeight,


	/** Default Language */
	defaultLang: 'es',

};

export default GlobalVars;