import React from 'react';
import { Text, StyleSheet } from 'react-native';

/** 
 * @description to have a customised text with open-sans font-family
 * @alternate check constants\default-styles.js
*/
const BodyText = props => <Text style={{...styles.text, ...props.style}}>{props.children}</Text>;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
});

export default BodyText;