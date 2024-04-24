import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [username, setNome] = useState('');
  const [nomeCompleto, setSobrenome] = useState('');
  const [password, setPassword] = useState('');
  const [confirmaPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const userService = new UserService();
  const navigation = useNavigation<StackTypes>();

  const validarPassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const handleCadastro = async () => {
    if (!email || !username || !nomeCompleto || !password || !confirmaPassword) {
      setFormError('Todos os campos são obrigatórios');
      return;
    }

    if (password !== confirmaPassword) {
      setFormError('As senhas não correspondem');
      return;
    }

    if (!validarPassword(password)) {
      setFormError('A senha deve ter no mínimo 8 caracteres, incluir pelo menos uma letra maiúscula e um número');
      return;
    }
    
    try {
      const user = await userService.addUser({
        email,
        username: '',
        nomeCT: nomeCompleto,
        password,

      });

      if (user) {
        Alert.alert('Cadastro realizado com sucesso!', `Bem-vindo(a) ${username}`);
        navigation.navigate('Login'); 
      } else {
        setFormError('Erro ao criar a conta. Tente novamente mais tarde.');
      }
    } catch (error) {
      setFormError('Erro ao criar a conta. Tente novamente mais tarde.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Criar uma conta</Text>

      <Image source={require('../../../assets/favicon.png')} style={styles.profileImage} />
      <TouchableOpacity style={styles.imageUploadButton}>
        <Text style={styles.imageUploadButtonText}>Adicionar imagem</Text>
      </TouchableOpacity>

      <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="Username" onChangeText={setNome} value={username} />
      <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="Nome Completo" onChangeText={setSobrenome} value={nomeCompleto} />
      <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="Senha" secureTextEntry={true} onChangeText={setPassword} value={password} />
      <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="Confirma a Senha" secureTextEntry={true} onChangeText={setConfirmPassword} value={confirmaPassword} />

      {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>Ao criar uma conta ou assinar você concorda com nossos Termos e Condições</Text>
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
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  backText: {
    fontSize: 24,
    color: '#784212',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageUploadButton: {
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
  marginBottom: 20,
  },
  imageUploadButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Cadastro;