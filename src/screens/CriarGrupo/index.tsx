import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, TextInput, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent, DateTimePickerAndroid  } from '@react-native-community/datetimepicker';
import UserService from '../../services/UserService/UserService';
import { User } from '../../types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const CriarGrupo = () => {
    const [nomeDoGrupo, setNomeDoGrupo] = useState('');
    const [maxParticipantes, setMaxParticipantes] = useState('');
    const [valor, setValor] = useState('');
    const [dataRevelacao, setDataRevelacao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const navigation = useNavigation();
    const userService = new UserService();
    const route = useRoute<RouteProp<{ params: User }, 'params'>>();
    const nomeCapitalizado = route.params?.nome;

    const validateForm = () => {
        if (!nomeDoGrupo.trim() || nomeDoGrupo.length > 20) return 'Nome do grupo inválido (máximo de 20 caracteres).';
        if (!maxParticipantes.trim() || parseInt(maxParticipantes, 10) < 2) return 'A quantidade de participantes deve ser maior que 1.';
        if (!valor.trim() || parseFloat(valor.replace(',', '.')) <= 0) return 'O valor deve ser maior que 0.';
        if (!descricao.trim()) return 'Por favor, adicione uma descrição ao grupo.';
        return '';
    };

    interface CreateGroupResponse {
        success: boolean;
        message?: string;
    }

    const handleSalvarGrupo = async () => {
        const errorMessage = validateForm();
        if (errorMessage) {
            Alert.alert('Erro', errorMessage);
            return;
        }

        try {
            const grupo = {
                "id": 0,
                "novoGrupo": {
                  "imagem": "",
                  "nome": nomeDoGrupo,
                  "qtdUsuario": maxParticipantes,
                  "valor": valor,
                  "dataRevelacao": dataRevelacao,
                  "descricao": descricao,
                  "id_Status": 0
                }
              };
            const axiosResponse = await userService.createGroup(nomeDoGrupo);
            const result = axiosResponse.data as CreateGroupResponse;

            if (result.success) {
                Alert.alert('Grupo Criado', `O grupo ${nomeDoGrupo} foi criado com sucesso.`);
                setNomeDoGrupo('');
                setMaxParticipantes('');
                setValor('');
                setDescricao('');
                navigation.navigate('Home' as never);
            } else {
                Alert.alert('Erro', result.message || 'Ocorreu um erro desconhecido.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível criar o grupo. Tente novamente mais tarde.');
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    //     setDatePickerVisibility(Platform.OS === 'ios');
    //     if (event.type === 'set' && selectedDate && selectedDate > new Date()) {
    //     } else {
    //         Alert.alert("Data inválida", "Escolha uma data futura.");
    //     }
    // };

    const setDate = (event: DateTimePickerEvent, date: Date) => {
        const {
          type,
          nativeEvent: {timestamp, utcOffset},
        } = event;
      };
      

    return (
    <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Olá, {nomeCapitalizado}</Text>
                <TouchableOpacity onPress={() => { }}>
                    <MaterialIcons name="notifications" size={24} color='#F5CBA7' />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.screenTitle}>Criar Grupo</Text>
            </View>
        <View style={styles.formContainer}>
                <View style={styles.imageUploadContainer}>
                    <Image source={require('../../../assets/Grupo.png')} style={styles.groupImage} />
                    <TouchableOpacity style={styles.imageButton}>
                        <Text style={styles.imageButtonText}>Adicionar imagem</Text>
                    </TouchableOpacity>
                </View>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Nome do Grupo: </Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    onChangeText={setNomeDoGrupo}
                    value={nomeDoGrupo}
                />
                <Text style={styles.label}>Quantidade Máxima de Participantes: </Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={setMaxParticipantes}
                    value={maxParticipantes}
                />
                <Text style={styles.label}>Valor: </Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    keyboardType="decimal-pad"
                    onChangeText={setValor}
                    value={valor}
                />
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    multiline
                    onChangeText={setDescricao}
                    value={descricao}
                />
                <Text style={styles.label}>Data de Revelação: </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={setDataRevelacao}
                    value={dataRevelacao}
                />
                {/* <RNDateTimePicker maximumDate={new Date(2030, 10, 20)} minimumDate={new Date(1950, 0, 1)} timeZoneName={'Europe/Prague'}/>; */}
                <DateTimePicker
                value={new Date(2030, 10, 20)}
                mode='date'
                display='default'
                onChange={() => {
                }}
                />
            </View>
                <TouchableOpacity style={styles.saveButton} onPress={handleSalvarGrupo}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8D7B4',
        flexGrow: 1,
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
        color: '#F5CBA7'
    },
    headerTitle: {
        color: '#F5CBA7',
        fontWeight: 'bold',
        fontSize: 18,
    },
    labelContainer: {
        width: '80%',
        fontSize: 16,
        color: '#784212',
        marginBottom: 5,
        justifyContent: 'center'
    },
    titleContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#784212',
    },
    formContainer: {
        backgroundColor: '#F8D7B4',
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    imageUploadContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    groupImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
        marginBottom: 10,
    },
    label: {
        width: '100%',
        fontSize: 16,
        color: '#784212',
        marginBottom: 5,
        justifyContent:'center',
    },
    imageButton: {
        width: '40%',
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
    imageButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
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
        width: '80%',
        backgroundColor: '#784212',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,

    },
    saveButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
    },
    datePickerButton: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    datePickerText: {
        color: '#000',
        fontSize: 16,
    },
});

export default CriarGrupo;
