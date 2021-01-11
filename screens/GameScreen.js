import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Alert, 
    ScrollView, 
    FlatList, 
    Dimensions
 } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import defaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if( rndNum === exclude ) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>); 

const renderFlatListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {

    // to lock this component in portrait mode (if necessary)
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice),
    [currentGuess, setCurrentGuess] = useState(initialGuess),
    [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width),
    [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height),
    currentLow = useRef(1), currentHigh = useRef(100),
    // [rounds, setRounds] = useState(0);
    [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const {userChoice, onGameOver} = props;

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

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if( 
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice) 
        ){
            Alert.alert(
                'Don\'t lie!', 
                'You know that is wrong...', 
                [{text: 'Sorry!', style: 'cancel'}]
            );
            return;
        }
        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess  + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [ nextNumber, ...curPastGuesses ]);
    };

    let gameControls = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{...styles.buttonContainer, marginTop: availableDeviceHeight > 600 ? 20 : 10}} >
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
        </React.Fragment>
    );
    if( availableDeviceHeight < 500 ) {
        gameControls = (
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
        );
    };

    return(
        <View style={styles.screen}>
            <Text style={defaultStyles.title}>Opponent's guess</Text>
            {gameControls}
            <View style={{...styles.listContainer, width: availableDeviceWidth > 350 ? '60%' : '80%'}}>
                {/* <ScrollView contentContainerStyle={styles.list} >
                    {pastGuesses.map(( guess, index ) => renderListItem(guess, pastGuesses.length - index ))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderFlatListItem.bind( this, pastGuesses.length )} 
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>

    );
};

// Can't use availableDeviceWidth and availableDeviceHeight inside stylesheet, can be used in in-line style
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1
    },
    list: {
        flexGrow: 1,
        //alignItems: 'center', needed for scrollview style when width of listItem needed to be controlled
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }

});

export default GameScreen;