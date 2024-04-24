import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);

  const navigation = useNavigation<StackTypes>();
  const userService = new UserService();

  const handleLogin = async () => {
    if (attempts >= 10) {
      Alert.alert("Bloqueado", "Você excedeu o número de tentativas de login.");
      return;
    }

    //const isValidEmail = /\S+@\S+\.\S+/.test(email);
    //const isValidPassword = password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);

    // if (!isValidEmail || !isValidPassword) {
    //   setAttempts((prev) => prev + 1);
    //   Alert.alert("Erro", "E-mail ou senha inválidos.");
    //   return;
    // }

    try {
      const user = await userService.login(username, password);
      if (user) {
        navigation.navigate('Home');
      } else {
        setAttempts((prev) => prev + 1);
        Alert.alert("Erro", "Credenciais incorretas ou usuário não encontrado.");
      }
    } catch (error) {
      setAttempts((prev) => prev + 1);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  const handleEsqueceuASenha = () => {
    navigation.navigate('EsqueceuASenha');
  };

  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };


  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/favicon.png')} style={styles.logo} />
      <Text style={styles.title}>Conecte-se</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.forgotPassword} onPress={handleEsqueceuASenha}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={handleCadastro}>
        <Text style={styles.signUpButtonText}>Não tem uma conta? Inscrever-se</Text>
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
  logo: {
    width: 100,
    height: 100, 
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    color: '#784212', 
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    width: '100%',
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
  forgotPassword: {
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
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  loginButton: {
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
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signUpButton: {
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
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  }
});



export default Login;