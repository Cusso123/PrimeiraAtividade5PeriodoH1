import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { User } from '../../types/types';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import UserService from '../../services/UserService/UserService';
import { StackTypes } from '../../routes/stack';


interface Convite {
  id: string;
  nome: string;
}

const Convites = () => {
  const [convites, setConvites] = useState<Convite[]>([]);
  const navigation = useNavigation<StackTypes>();
  const userService = new UserService();

  const fetchConvites = async () => {
    try {
      const response = await userService.getConvites();
      setConvites(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os convites.');
    }
  };

  useEffect(() => {
    fetchConvites();
  }, []);
    
    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
        </TouchableOpacity>
        <Text style={styles.title}>Ola</Text>
        <TouchableOpacity onPress={() => {}}>
        <MaterialIcons name="notifications" size={24} color='#F5CBA7'/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>Convites</Text>
      </View>
      <View style={styles.buttonContainer}>

      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <MaterialIcons name="menu" size={35} color='#F5CBA7' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CriarGrupo', {groupId: '0'})} style={styles.addButton}>
        <MaterialIcons name="add-circle" size={35} color='#F5CBA7' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="account-circle" size={35} color='#F5CBA7' />        
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
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
  title: {
    color: '#F5CBA7',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    paddingVertical: 10,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#784212',
    textAlign:'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    alignItems:'center',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#784212',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '45%',
  },
  buttonText: {
    fontSize: 18,
    color: '#F5CBA7',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#784212',
    paddingVertical: 20,
    paddingHorizontal: 50,
    position:'absolute',
    bottom: 0
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 35,
    padding: 0,
  },
});

export default Convites;