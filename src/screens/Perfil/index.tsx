import React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type RootStackParamList = {
    Home: { username: string };
    CriarGrupo: undefined;
    Perfil: undefined;
};
type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

const Perfil = () => {

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
            <Text style={styles.title}>Perfil</Text>
            </View>
            <View style={styles.profileContainer}>
            <View style={styles.imageUploadContainer}>
                <Image source={require('../../../assets/Grupo.png')} style={styles.profileImage} />
                <TouchableOpacity style={styles.editImageButton}>
                    <Text style={styles.editImageButtonText}>Editar Imagem</Text>
                </TouchableOpacity>
            </View>
                <Text style={styles.label}>Username:</Text>
                <TextInput style={styles.input} placeholder="" />
                <Text style={styles.label}>Nome Completo:</Text>
                <TextInput style={styles.input} placeholder="" />
                <Text style={styles.label}>Email:</Text>
                <TextInput style={styles.input} placeholder="" />
                <Text style={styles.label}>Senha:</Text>
                <TextInput style={styles.input} placeholder="" secureTextEntry />
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
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
        alignItems: 'center',
      },
    imageUploadContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
    },
    headerText: {
        color: '#F5CBA7',
        fontWeight: 'bold',
        fontSize: 18,
    },
    notificationButton: {
        padding: 10,
    },
    profileContainer: {
        backgroundColor: '#F5CBA7',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    form: {
        width: '100%',
        alignItems: 'flex-start',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#784212',
        marginBottom: 5,
    },
    editImageButton: {
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
    editImageButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
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
    saveButton: {
        width: '100%',
        backgroundColor: '#784212',
        borderRadius: 5,
        padding: 10,
    },
    saveButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default Perfil;
