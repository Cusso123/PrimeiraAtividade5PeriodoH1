import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StackTypes } from '../../routes/stack';
import UserService from '../../services/UserService/UserService';
import { User } from '../../types/types';

type RootStackParamList = {
    Sorteio: { membros: { id: number, nome: string, sorteadoCom: string}[] };
};
type SorteioProps = RouteProp<RootStackParamList, 'Sorteio'>;

const SortearAmigoSecreto = () => {
    const navigation = useNavigation<StackTypes>();
    const route = useRoute<SorteioProps>();
    const [membros, setMembros] = useState<User[]>([]);
    const [sorteioResult, setSorteioResult] = useState<{ id: number, nome: string, sorteadoCom: string}[]>([]);

    const fakeMembros: User[] = [
        { id: 1, nome: 'Membro 1', foto: '', email: '', senha: '' },
        { id: 2, nome: 'Membro 2', foto: '', email: '', senha: '' },
        { id: 3, nome: 'Membro 3', foto: '', email: '', senha: '' },
        { id: 4, nome: 'Membro 4', foto: '', email: '', senha: '' },
    ];

    const fetchMembros = async () => {
        try {
            setMembros(fakeMembros);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os membros do grupo.');
        }
    };

    useEffect(() => {
        setMembros(fakeMembros);
    }, []);

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleSortear = () => {
        const shuffledMembros = shuffleArray([...membros]);
        const sorteio = shuffledMembros.map((membro, index) => ({
            ...membro,
            sorteadoCom: shuffledMembros[(index + 1) % shuffledMembros.length].nome
        }));
        setSorteioResult(sorteio);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Sorteio de Amigo Secreto</Text>
                <TouchableOpacity onPress={() => {}}>
                    <MaterialIcons name="notifications" size={24} color='#F5CBA7' />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Resultados do Sorteio</Text>
            </View>
            <FlatList
                data={sorteioResult}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.profileContainer}>
                        <MaterialIcons name="person" size={24} color='#F5CBA7' />
                        <Text style={styles.label}>{item.nome} saiu com {item.sorteadoCom}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={handleSortear}>
                <Text style={styles.buttonText}>Sortear</Text>
            </TouchableOpacity>
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
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 18,
        justifyContent: 'center',
        alignSelf: 'center',
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
        alignItems: 'center'
    },
    label: {
        textAlign: 'left',
        fontSize: 18,
        color: '#FFF',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#784212',
        textAlign: 'center'
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

export default SortearAmigoSecreto;
