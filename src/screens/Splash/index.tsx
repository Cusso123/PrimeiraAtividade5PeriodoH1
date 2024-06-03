import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/stack';

const Splash = () => {
        const navigation = useNavigation<StackTypes>();

const animacao = require('../../../assets/Splash1.json')
    return(
        <View style={styles.container}>
            <LottieView
            autoPlay
            loop= {false}
            speed={0.5}
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#784212',
            }}
            source={animacao}
            onAnimationFinish={() => navigation.navigate('Login')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Splash;
