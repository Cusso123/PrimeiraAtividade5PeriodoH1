import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const[nome, setNome] = useState<string>('');
  const[idade, setIdade] = useState<number>(0);
  const [peso, setPeso] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);
  const [resultado, setResultado] = useState<string>('');

  function calcularIMC() {
    const imc = peso / (altura * altura);
    let resultadoIMC = '';

    if (imc < 18.5) {
      resultadoIMC = 'Abaixo do peso';
    } else if (imc < 24.9) {
      resultadoIMC = 'Peso normal';
    } else if (imc < 29.9) {
      resultadoIMC = 'Sobrepeso';
    } else if (imc < 34.9) {
      resultadoIMC = 'Obesidade grau I';
    } else if (imc < 39.9) {
      resultadoIMC = 'Obesidade grau II';
    } else {
      resultadoIMC = 'Obesidade grau III';
    }

    setResultado(`IMC: ${imc.toFixed(2)} - ${resultadoIMC}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, vamos verificar seu IMC!</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite seu nome'
        onChangeText={(txtNome) => setNome(txtNome)}
      />
      <TextInput
        style={styles.input}
        placeholder='Digite sua idade'
        onChangeText={(txtIdade) => setIdade(parseInt(txtIdade))}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Digite seu peso (kg)'
        onChangeText={(txtPeso) => setPeso(parseFloat(txtPeso))}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Digite sua altura (m)'
        onChangeText={(txtAltura) => setAltura(parseFloat(txtAltura))}
        keyboardType='numeric'
      />
      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
      <Text style={styles.resultado}>{resultado}</Text>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  },
  text: {
      fontSize: 24, 
      marginBottom: 10
  },
  input: {
      borderWidth: 1,
      borderColor: '#264653',
      padding: 10,
      width: 300,
      marginBottom: 10
  },
  button: {
      backgroundColor: 'midnightblue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10
  },
  buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
  },
  resultado: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

