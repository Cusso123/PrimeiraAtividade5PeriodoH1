import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<StackTypes>();

  const handleEsqueceuASenha = async () => {
    try {
      const userService = new UserService();
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
      <MaterialIcons name="arrow-back" size={24} color='#784212' />
      </TouchableOpacity>
      <Text style={styles.title}>Esqueceu sua senha?</Text>
      <View style={styles.inputContainer}>
      <Text style={styles.description}>Não se preocupe! Acontece. Por favor, insira o e-mail associado à sua conta.</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity onPress={handleEsqueceuASenha} style={styles.button}>
        <Text style={styles.buttonText2}>Enviar</Text>
      </TouchableOpacity>
    </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.connectButton}>
        <Text style={styles.buttonText}>Lembra da senha? <Text style={styles.buttonText1}>Conecte-se</Text></Text>
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
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  label: {
    fontSize: 16,
    color: '#784212',
    marginBottom: 5,
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
  inputContainer: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#784212', 
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    textAlign: 'left',
    marginBottom: 20,
    color: '#784212', 
    fontSize: 16, 
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
    color: '#784212',
    fontSize: 16,
  },
  buttonText1: {
    color: '#784212',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonText2: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  connectButton: {
    marginTop: 20,
  }
});


export default RecuperarSenha;