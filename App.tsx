
import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Calculo from '../AtividadeHumberto2/Component/CalculoIMC'
import Ola from '../AtividadeHumberto2/Component/Ola'

export default function App() {
  const [Peso, setPeso] = useState('');
  const [Altura, setAltura] = useState('');
  return (
    <View style={styles.container}>
      <Ola nomeExe='Exercicio2'/>
      <Text style={styles.title}>Calculadora de IMC</Text>
        <TextInput
        style={styles.input}
        placeholder='Peso em Kilogramas'
        keyboardType='numeric'
        value={Peso}
        onChangeText={setPeso}
        />
        <TextInput
        style={styles.input}
        placeholder='Altura em Centímetros'
        keyboardType='numeric'
        value={Altura}
        onChangeText={setAltura}
        />  
        <Calculo Peso={parseFloat(Peso)} Altura={parseFloat(Altura)}/>
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
  title: {
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  input: {
    color: 'white', 
    fontSize: 18, 
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    height: 40,
    paddingLeft: 10, 
    marginBottom: 10, 
  },
});
