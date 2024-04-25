import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import UserService from '../../services/UserService/UserService';
import { StackTypes } from '../../routes/stack';
import { User } from '../../types/types';


const Convite = () => {
    const navigation = useNavigation<StackTypes>();
    const route = useRoute<RouteProp<{ params: User }, 'params'>>();
    const userService = new UserService();
    const conviteId = 'ID_DO_CONVITE'; 
      
    const nome = route.params?.username || 'Visitante';
    const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1);

    interface ServerResponse {
        ok: boolean;
        mensagem?: string;
        grupoId?: string;
    }

    const handleNavigate = (screenName: string) => {
        navigation.navigate(screenName as never);
    };
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
          <Text style={styles.headerIcon}>←</Text>
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

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleNavigate('Home')}>
          <Text style={styles.footerText}>🏠 Início</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('CriarGrupo')}>
          <Text style={styles.footerText}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Perfil')}>
          <Text style={styles.footerText}>👤 Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8D7B4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8D7B4',
  },
  headerIcon: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#784212',
  },
  headerTitle: {
    color: '#784212',
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
  },
  button: {
    backgroundColor: '#784212',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F8D7B4',
  },
  footerText: {
    fontSize: 24,
    color: '#784212',
  },
});

export default Convite;
