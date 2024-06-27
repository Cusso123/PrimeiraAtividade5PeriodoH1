import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Dimensions, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import UserService from '../../services/UserService/UserService';
import { StackTypes } from '../../routes/stack';
import { User } from '../../types/Usuario';

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
    const navigation = useNavigation<StackTypes>();
    const route = useRoute();
    // const { grupoId } = route.params;
  
    const fetchMembros = async () => {
        try {
          const userService = new UserService();
          const response = await userService.getMembros(props.grupoId);
          await setMembros(response.data);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar os membros do grupo.');
        }
      };
  
      useEffect(() => {
        fetchMembros();
      }, []);
    
      const handleExpulsar = async (userId : string) => {
        try {
          const userService = new UserService();
          await userService.expulsarMembro(props.grupoId, userId);
          Alert.alert('Sucesso', 'Membro expulso com sucesso.');
          fetchMembros();
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível expulsar o membro.');
        }
      };
    
      const handleCompartilhar = () => {
        // Lógica para compartilhar o grupo
      };
    
      const handleExcluir = async () => {
        try {
          const userService = new UserService();
          await userService.excluirGrupo(props.grupoId);
          Alert.alert('Sucesso', 'Grupo excluído com sucesso.');
          navigation.navigate('Home');
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível excluir o grupo.');
        }
      };
    
      const handleSortear = async () => {
        try {
          const userService = new UserService();
          const result = await userService.sortear(props.grupoId);
          if (result.success) {
            Alert.alert('Sorteio realizado', 'Os resultados foram enviados para cada participante.');
          } else {
            Alert.alert('Erro', result.message || 'Ocorreu um erro durante o sorteio.');
          }
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível realizar o sorteio.');
        }
      };
    

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
            keyExtractor={(item) => (item.id ?? 0).toString()}
            renderItem={({ item }) => (
                <View style={styles.userContainer}>
                <MaterialIcons name="person" size={24} color='#F5CBA7' />
                <Text style={styles.userName}>{item.nome}</Text>
                <TouchableOpacity onPress={() => handleExpulsar((item.id ?? 0).toString())}>
                    <MaterialIcons name="close" size={24} color='#000' />
                </TouchableOpacity>
                </View>
            )}
            />
            </View>
            <Text style={styles.footerText}>Sorteio não realizado</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Compartilhar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sortear</Text>
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
