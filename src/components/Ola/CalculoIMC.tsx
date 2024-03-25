import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

interface CalculoIMC {
    Peso:number
    Altura:number
}

const Calculo : React.FC<CalculoIMC> = ({Peso,Altura}) => {

    const[imc,setImc] = useState('')
    const[estado,setEstado] = useState<string>('')

    const calcularIMC = () => {

        const calculoIMC = Peso / (Altura * Altura);
        setImc(calculoIMC.toFixed(1));
        if (calculoIMC  < 18.5) {
            setEstado('Abaixo do peso');
          } else if (calculoIMC  < 24.9) {
            setEstado('Peso normal');
          } else if (calculoIMC  < 29.9) {
            setEstado('Sobrepeso');
          } else if (calculoIMC  < 34.9) {
            setEstado('Obesidade grau I');
          } else if (calculoIMC  < 39.9) {
            setEstado('Obesidade grau II');
          } else {
            setEstado('Obesidade grau III');
          }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={calcularIMC}
            >
                <Text style={styles.buttonText}>Olá, vamos verificar seu IMC!</Text>
            </TouchableOpacity>
            <Text style={[styles.result, styles.margin]}>Resultado IMC: {imc}</Text> 
            <Text style={[styles.result, styles.margin]}>Estado: {estado}</Text> 
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize:24,
        color: 'white', 
    },
    textInput:{
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 24,
        width:10,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'white', 
    },
    button: {
        backgroundColor: 'blue', 
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    result: {
        color: 'white', 
    },
    margin: {
        marginTop: 10,
    }
});

export default Calculo;
