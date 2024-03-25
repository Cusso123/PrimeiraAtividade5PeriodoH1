import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';

const Cadastro = () => {
  const [email, setEmail] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [sobrenome, setSobrenome] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);

  const userService = new UserService();

  const navigation = useNavigation<StackTypes>();

  const handleNavegarLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogin = async () => {

    const user = await userService.addUser({
      email,
      firstName: nome,
      lastName: sobrenome,
      password,
      username: '',
    });

    if (user) {
      alert('Usuário autenticado com sucesso ' + nome);
      setEmail('');
      setPassword('');
      setNome('');
      setSobrenome('');
    } else {
      alert('Usuário e/ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar uma conta</Text>
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]}
        placeholder="Seu Nome"
        onChangeText={setNome}
        value={nome}
      />
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]}
        placeholder="Seu Sobrenome"
        onChangeText={setSobrenome}
        value={sobrenome}
      />
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]}
        placeholder="Seu Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Text style={styles.termsText}>
        Ao criar uma conta ou assinar você concorda com nossos Termos e Condições
      </Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavegarLogin} style={styles.button} activeOpacity={0.1}>
        <Text style={styles.buttonText}>Conectar-se</Text>
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
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#784212', 
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorInput: {
    borderColor: 'red', 
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#784212', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#784212',
    marginTop: 10,
    textAlign: 'center',
  }
});



export default Cadastro;