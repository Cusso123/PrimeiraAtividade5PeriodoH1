import React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Dimensions, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type RootStackParamList = {
    Home: { username: string };
    CriarGrupo: undefined;
    Perfil: undefined;
};
type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

const users = [
  { id: '1', name: 'Lucas' },
  { id: '2', name: 'Rodrigo' },
  { id: '3', name: 'Luana' },
  { id: '4', name: 'Carlos' },
];

const Membros = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();

    const nome = route.params?.username || 'Visitante';
    const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1);

    const handleNavigate = (screenName: keyof RootStackParamList) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Olá, {nomeCapitalizado}</Text>
                <TouchableOpacity onPress={() => {}}>
                    <MaterialIcons name="notifications" size={24} color='#F5CBA7'/>
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Aniversário</Text>
            </View>
            <View style={styles.userListContainer}>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userContainer}>
                            <MaterialIcons name="person" size={24} color='#F5CBA7' />
                            <Text style={styles.userName}>{item.name}</Text>
                            <TouchableOpacity>
                                <MaterialIcons name="close" size={24} color='#F5CBA7' />
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
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign:'center'
    },
    userListContainer: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 18,
        justifyContent:'center',
    },
    userContainer: {
        width: '80%',
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
        marginBottom: 10
    },
    userName: {
        fontSize: 18,
        color: '#000',
    },
    footerText: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 30,
        color: '#784212',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#F5CBA7',
        alignItems:'center',
        padding: 10,

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
        fontSize: 18,
        color: '#F5CBA7',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Membros;
