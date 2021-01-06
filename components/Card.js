import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    // ...styles.card for adding styles from this component (... - spread operator)
    // ...props.style for adding / overriding style from props passed
    return ( <View style={{ ...styles.card, ...props.style }}> 
                { props.children }
             </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
    }
});

export default Card;