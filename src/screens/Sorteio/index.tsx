import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import UserService from '../../services/UserService/UserService';
import { StackTypes } from '../../routes/stack';

type RootStackParamList = {
    Sorteio: { grupoId: string };
  };
  type SorteioProps = {
    grupoId: string;
  };
  const SortearAmigoSecreto = (props : SorteioProps) => {
    const navigation = useNavigation<StackTypes>();
    const route = useRoute<RouteProp<RootStackParamList, 'Sorteio'>>();
    // const { grupoId } = route.params;
    const [names, setNames] = useState<string[]>([]);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const userService = new UserService();
  
    useEffect(() => {
      const fetchNames = async () => {
        try {
          const response = await userService.getMembros(props.grupoId);
          const memberNames = response.data.map(member => member.nome);
          setNames(memberNames);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar os membros do grupo.');
        }
      };
  
      fetchNames();
    }, [props.grupoId]);
  
    const handleSortear = async () => {
      try {
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
  
    const handleSelect = (name: string) => {
      setSelectedName(name);
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
                <Text style={styles.title}>Sorteios</Text>
            </View>
            <View style={styles.namesContainer}>
                {names.map((name) => (
                    <TouchableOpacity key={name} onPress={() => handleSelect(name)}>
                        <View style={styles.profileContainer}>
                            <MaterialIcons name="person" size={24} color='#F5CBA7' />
                            <Text style={styles.label}>{name}</Text>
                            <Text> </Text>
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
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 18,
        justifyContent:'center',
        alignSelf:'center',
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
        alignItems:'center'  
    },
    label: {
        textAlign:'left',
        fontSize: 18,
        color: '#FFF',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#784212',
        textAlign:'center'
    },
    footerText: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        color: '#784212',
        fontWeight: 'bold',
    },
});

export default SortearAmigoSecreto;
