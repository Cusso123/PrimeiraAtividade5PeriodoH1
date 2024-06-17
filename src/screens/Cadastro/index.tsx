import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [username, setNome] = useState('');
  const [nomeCompleto, setSobrenome] = useState('');
  const [password, setPassword] = useState('');
  const [confirmaPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);


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
        username,
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
      <MaterialIcons name="arrow-back" size={24} color='#784212' />
      </TouchableOpacity>
      <Text style={styles.title}>Criar uma conta</Text>
      <Image source={require('../../../assets/Cadastrar.png')} style={styles.profileImage} />
      <TouchableOpacity style={styles.imageUploadButton}>
        <Text style={styles.imageUploadButtonText}>Adicionar imagem</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
      <View style={styles.form}>
        <Text style={styles.label}>Username:</Text>
        <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="" onChangeText={setNome} value={username} />
        <Text style={styles.label}>Nome Completo:</Text>
        <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="" onChangeText={setSobrenome} value={nomeCompleto} />
        <Text style={styles.label}>Email:</Text>
        <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="" onChangeText={setEmail} value={email} />
        <Text style={styles.label}>Senha:</Text>
        <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="" secureTextEntry={true} onChangeText={setPassword} value={password} />
        <Text style={styles.label}>Confirmar Senha:</Text>
        <View style={{justifyContent:'center', alignItems:'center', width: '100%' }}>
        <TextInput style={[styles.input, formError ? styles.errorInput : null]} placeholder="" onChangeText={setConfirmPassword} value={confirmaPassword} secureTextEntry={!passwordVisible} />

        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
        <MaterialIcons name={passwordVisible ? 'visibility' : 'visibility-off'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      </View>
      {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

      <TouchableOpacity onPress={handleCadastro} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>Ao criar uma conta ou assinar você concorda com nossos <Text style={styles.termsText1}>Termos e Condições</Text></Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5CBA7', 
    paddingHorizontal: 20,
  },
  icon: {
    fontWeight: 'bold',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#784212', 
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#784212',
    marginBottom: 5,
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
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '70%'
  },
  errorInput: {
    borderColor: 'red', 
  },
  button: {
    width: '100%',
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  termsText: {
    fontSize: 16,
    color: '#784212',
    marginTop: 10,
    textAlign: 'center',
  },
  termsText1: {
    fontSize: 16,
    color: '#784212',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  backText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#784212',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageUploadButton: {
    width: '30%',
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
    marginBottom: 10
  },
  imageUploadButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  form: {
    width: '100%',
    alignItems: 'flex-start',
  },
});

export default Cadastro;
