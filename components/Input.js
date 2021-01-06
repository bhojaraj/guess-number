import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    // ...props - to make TextInput depend on the reuirement as props passing from custom component
    return (
        <TextInput { ...props } style={{ ...styles.input, ...props.style }}/>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;