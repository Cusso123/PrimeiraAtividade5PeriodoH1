import React, { useState } from 'react';
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

const Sorteio = () => {
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();

    const nome = route.params?.username || 'Visitante';
    const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1);
    
    const names = ['Lucas', 'Rodrigo', 'Luana', 'Carlos'];

    const handleSelect = (name: string) => {
        setSelectedName(name);
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
            <View style={styles.namesContainer}>
                {names.map((name) => (
                    <TouchableOpacity key={name} onPress={() => handleSelect(name)}>
                        <View style={styles.profileContainer}>
                            <MaterialIcons name="person" size={24} color='#F5CBA7' />
                            <Text style={styles.label}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            {selectedName && (
                <Text style={styles.footerText}>Você saiu com {selectedName}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5CBA7',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#784212',
        width: '100%',
    },
    titleContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    namesContainer: {
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        color: '#F5CBA7',
        fontWeight: 'bold',
        fontSize: 18,
    },
    profileContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#784212',
        fontSize: 18,
        fontWeight: 'bold',
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
    },
    label: {
        fontSize: 16,
        color: '#F5CBA7',
        marginBottom: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    footerText: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 30,
        color: '#784212',
        fontWeight: 'bold',
    },
});

export default Sorteio;
