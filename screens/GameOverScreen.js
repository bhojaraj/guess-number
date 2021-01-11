import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    Dimensions,
    ScrollView } from 'react-native';
import Colors  from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width),
    [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>GAME OVER!</TitleText>
                <View style={{...styles.imageContainer, ...{
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: availableDeviceWidth * 0.7 / 2,
                    marginVertical: availableDeviceHeight / 30,}}} >
                    <Image 
                        // using local image
                        source={require('../assets/success.png')} 
                        // using web image
                        // source={{uri: 'https://image.shutterstock.com/image-photo/evening-view-ama-dablam-on-260nw-258841592.jpg'}}
                        style={styles.image} 
                        resizeMode='cover'
                        fadeDuration= {300} // for fade transition effect, automatically is there, buif need to control it
                    />
                </View>
                <View style={{...styles.resultContainer, marginVertical: availableDeviceHeight / 60}}>
                    <BodyText style={{...styles.resultText, fontSize: availableDeviceWidth < 400 ? 16 : 20}}>
                        Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text> 
                        rounds to guess the number <Text style={styles.highlight}>{props.userChoice}</Text> 
                    </BodyText>
                </View>
                <MainButton onPress={props.onRestart} > NEW GAME </MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: Colors.primary,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30
    },
    resultText: {
        textAlign: 'center'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;