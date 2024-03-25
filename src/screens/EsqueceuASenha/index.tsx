import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';

const EsqueceuSenha = () => {
  const [email, setEmail] = useState<string>('');

  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();

  const handleNavegarLogin = () => {
    navigation.navigate('Login');
  };

  const handleEsqueceuSenha = async () => {

    const user = await userService.forgotPassword(email);

    if (user) {
      alert('Email de recuperação de senha enviado com sucesso ');
    } else {
      alert('Email inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu sua senha?</Text>
      <Text style={styles.description}>Não se preocupe! Acontece. Por favor, insira o e-mail associado à sua conta.</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o seu endereço de email"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity onPress={handleEsqueceuSenha} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavegarLogin} style={styles.button}>
        <Text style={styles.buttonText}>Lembra da senha? Conecte-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5CBA7', 
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#784212', 
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#784212', 
    paddingHorizontal: 30, 
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#784212', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  }
});


export default EsqueceuSenha;