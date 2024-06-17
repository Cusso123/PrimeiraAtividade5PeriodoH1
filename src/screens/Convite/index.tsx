import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import UserService from '../../services/UserService/UserService';
import { User } from '../../types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type RootStackParamList = {
  Home: { username: string };
  CriarGrupo: undefined;
  Perfil: undefined;
};

type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

const Convite = () => {
    const userService = new UserService();
    const conviteId = 'ID_DO_CONVITE'; 
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();

    const nome = route.params?.username || 'Visitante';
    const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1);

    const handleNavigate = (screenName: keyof RootStackParamList) => {
      navigation.navigate(screenName);
    }
    
    interface ServerResponse {
        ok: boolean;
        mensagem?: string;
        grupoId?: string;
    }
        
    const handleAcceptInvite = async () => {
        try {
          const axiosResponse = await userService.acceptInvite(conviteId);
          const response: ServerResponse = {
            ok: axiosResponse.data.ok,
            mensagem: axiosResponse.data.mensagem,
            grupoId: axiosResponse.data.grupoId,
          };
      
          if (response.ok) {
            Alert.alert('Convite Aceito', 'Você entrou no grupo!', [
              { text: "OK", onPress: () => navigation.navigate('Grupo', { groupId: response.grupoId }) }
            ]);
          } else {
            Alert.alert('Erro', response.mensagem || 'Erro ao aceitar convite.');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
      };
      
      const handleDeclineInvite = async () => {
        try {
          const axiosResponse = await userService.declineInvite(conviteId);
          const response: ServerResponse = {
            ok: axiosResponse.data.ok,
            mensagem: axiosResponse.data.mensagem,
            grupoId: axiosResponse.data.grupoId, 
          };
      
          if (response.ok) {
            Alert.alert('Convite Recusado', 'Você recusou o convite para o grupo.', [
              { text: "OK", onPress: () => navigation.goBack() }
            ]);
          } else {
            Alert.alert('Erro', response.mensagem || 'Erro ao recusar convite.');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
        }
      };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Olá, {nomeCapitalizado}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.inviteText}>Você foi convidado para o grupo Bingo de Lucas</Text>
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
    width: '48%',
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
