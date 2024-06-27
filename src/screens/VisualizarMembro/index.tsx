import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Dimensions, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import UserService from '../../services/UserService/UserService';
import { StackTypes } from '../../routes/stack';
import { User } from '../../types/types';
import Sorteio from '../Sorteio';

type RootStackParamList = {
    Home: { username: string };
    CriarGrupo: undefined;
    Perfil: undefined;
  };
  
type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

type MembroProps = {
    grupoId: string;
};

const Membros = (props : MembroProps) => {
    const [membros, setMembros] = useState<User[]>([]);
    const [startsorteio, setStartSorteio] = useState<boolean>(false);
    const navigation = useNavigation<StackTypes>();
    const route = useRoute();  
    const fakeMembros: User[] = [
      { id: 1, nome: 'Membro 1', foto: '', email: '', senha: '' },
      { id: 2, nome: 'Membro 2', foto: '', email: '', senha: '' },
      { id: 3, nome: 'Membro 3', foto: '', email: '', senha: '' },
      { id: 4, nome: 'Membro 4', foto: '', email: '', senha: '' },
    ];

    const fetchMembros = async () => {
        try {
          const userService = new UserService();
          const response = await userService.getMembros(props.grupoId);
          setMembros(fakeMembros);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar os membros do grupo.');
        }
    };

    useEffect(() => {
        setMembros(fakeMembros);
    }, []);

    const handleExpulsar = (userId: number) => {
        const updatedMembros = membros.filter(membro => membro.id !== userId);
        setMembros(updatedMembros);
        Alert.alert('Sucesso', 'Membro expulso com sucesso.');
    };
    
    const handleCompartilhar = () => {
        Alert.alert('Compartilhar', 'Grupo compartilhado com sucesso!');
    };

    const excluirGrupo = async () => {
      try {
          console.log(`Tentando excluir o grupo com ID: ${props.grupoId}`);
          const userService = new UserService();
          const success = await userService.excluirGrupo(props.grupoId);
          if (success) {
              Alert.alert('Sucesso', 'Grupo excluído com sucesso.');
              navigation.navigate('Home');
          } else {
              Alert.alert('Erro', 'Não foi possível excluir o grupo.');
          }
      } catch (error) {
          Alert.alert('Erro', 'Não foi possível excluir o grupo.');
      }
  };

    if(startsorteio) {
      return(
        <Sorteio/>
      )
    }
    else {
      return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Olá</Text>
                <TouchableOpacity onPress={() => {}}>
                    <MaterialIcons name="notifications" size={24} color='#F5CBA7'/>
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
            </View>
            <View style={styles.userListContainer}>
                <FlatList
                    data={membros}
                    keyExtractor={(item) => item.id?.toString() ?? ''}
                    renderItem={({ item }) => (
                        <View style={styles.userContainer}>
                            <MaterialIcons name="person" size={24} color='#F5CBA7' />
                            <Text style={styles.userName}>{item.nome}</Text>
                            <TouchableOpacity onPress={() => item.id && handleExpulsar(item.id)}>
                                <MaterialIcons name="close" size={24} color='#000' />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <Text style={styles.footerText}>Sorteio não realizado</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCompartilhar}>
                    <Text style={styles.buttonText}>Compartilhar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={excluirGrupo}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setStartSorteio(true)}>
                    <Text style={styles.buttonText}>Sorteio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  };
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
    titleContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
    },
    headerText: {
        color: '#F5CBA7',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign:'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#784212',
        textAlign:'center'
    },
    userListContainer: {
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 18,
        justifyContent:'center',
        alignSelf:'center',
    },
    userContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#784212',
        fontSize: 18,
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
        marginTop: 20,
        marginBottom: 10,
        alignItems:'center'    
    },
    userName: {
        textAlign:'left',
        fontSize: 18,
        color: '#FFF',
    },
    footerText: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        color: '#784212',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    button: {
        width: '80%',
        backgroundColor: '#784212',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default Membros;
