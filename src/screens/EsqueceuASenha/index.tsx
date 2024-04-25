import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';

const EsqueceuASenha = () => {
  const [email, setEmail] = useState<string>('');
  
  const navigation = useNavigation<StackTypes>();
  const userService = new UserService();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleEsqueceuASenha = async () => {
    try {
      const accountActive = await userService.accountExists(email);

      if (accountActive) {
        const passwordSent = await userService.sendTemporaryPassword(email);

        if (passwordSent) {
          Alert.alert('Email enviado', 'Uma senha temporária foi enviada para o seu e-mail.');
        } else {
          Alert.alert('Erro', 'Não foi possível enviar o e-mail. Tente novamente mais tarde.');
        }
      } else {
        Alert.alert('Erro', 'E-mail não encontrado ou conta inativa.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Esqueceu sua senha?</Text>
      <Text style={styles.description}>Não se preocupe! Acontece. Por favor, insira o e-mail associado à sua conta.</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o seu endereço de email"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity onPress={handleEsqueceuASenha} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
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
  backText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#784212',
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
    fontWeight: 'bold',
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


export default EsqueceuASenha;