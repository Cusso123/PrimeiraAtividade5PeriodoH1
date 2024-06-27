import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import UserService from '../../services/UserService/UserService';
import { User } from '../../types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackTypes } from '../../routes/stack';

type RootStackParamList = {
  Home: { username: string };
  CriarGrupo: undefined;
  Perfil: undefined;
};

type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

type ConviteProps = {
  conviteId: string;
};
const Convite = (props: ConviteProps) => {
  const navigation = useNavigation<StackTypes>();
  // const route = useRoute<RouteProp<RootStackParamList, 'Convite'>>();
  // const { conviteId } = route.params;
  const userService = new UserService();

  const handleAcceptInvite = async () => {
    try {
      const response = await userService.acceptInvite(props.conviteId);
      if (response.success) {
        Alert.alert('Convite Aceito', 'Você entrou no grupo!', [
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ]);
      } else {
        Alert.alert('Erro', response.message || 'Erro ao aceitar convite.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const handleDeclineInvite = async () => {
    try {
      const response = await userService.declineInvite(props.conviteId);
      if (response.success) {
        Alert.alert('Convite Recusado', 'Você recusou o convite para o grupo.', [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Erro', response.message || 'Erro ao recusar convite.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Olá</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.inviteText}>Você foi convidado para o grupo </Text>
        <TouchableOpacity style={styles.button} onPress={handleAcceptInvite}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeclineInvite}>
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5CBA7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#784212',
  },
  headerIcon: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#F5CBA7',
  },
  headerTitle: {
    color: '#F5CBA7',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inviteText: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    color: '#784212',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#784212',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '40%',
  },
  buttonText: {
    fontSize: 18,
    color: '#F5CBA7',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#784212',
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 35,
    padding: 0,
  }
});

export default Convite;
