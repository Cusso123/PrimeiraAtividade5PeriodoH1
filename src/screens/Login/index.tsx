import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';
import { MaterialIcons } from '@expo/vector-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const navigation = useNavigation<StackTypes>();
  const userService = new UserService();

  const handleLogin = async () => {
    if (attempts >= 10) {
      Alert.alert("Bloqueado", "Você excedeu o número de tentativas de login.");
      return;
    }

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
      <Image source={require('../../../assets/Entrar.png')} style={styles.logo} />
      <Text style={styles.title}>Conecte-se</Text>
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      <Text style={styles.label}>Senha:</Text>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <TextInput
            style={styles.input}
            placeholder=""
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
            <MaterialIcons name={passwordVisible ? 'visibility' : 'visibility-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.forgotPassword} onPress={handleEsqueceuASenha}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={handleCadastro}>
        <Text style={styles.signUpButtonText}>Não tem uma conta? <Text style={styles.signUpButtonText1}>Inscrever-se</Text></Text>
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
    fontWeight: 'bold',
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
    borderRadius: 10,
    marginBottom: 10,
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
  label: {
    fontSize: 16,
    color: '#784212',
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
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
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '70%'
  },
  forgotPassword: {
    marginVertical: 10,
    width: '80%',
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#784212',
    fontSize: 16,
    textAlign: 'right'
  },
  loginButton: {
    width: '80%',
    height: 40,
    borderRadius: 10,
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
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#784212',
    fontSize: 16,
  },  
    signUpButtonText1: {
    color: '#784212',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});

export default Login;
