import { StyleSheet } from 'react-native';

/** 
 * @description to have style for components which need similar css properties and manage globally
 * I prefer component wise like components\BodyText.js since React is all about component structure
 * @alternate check components\BodyText.js
*/

export default StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});