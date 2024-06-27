import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, TextInput, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent, DateTimePickerAndroid  } from '@react-native-community/datetimepicker';
import UserService from '../../services/UserService/UserService';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackTypes } from '../../routes/stack';


type RootStackParamList = {
    Home: { username: string };
    CriarGrupo: undefined;
    Perfil: undefined;
  };
  type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

const CriarGrupo = () => {
    const [nomeDoGrupo, setNomeDoGrupo] = useState('');
    const [maxParticipantes, setMaxParticipantes] = useState('');
    const [valor, setValor] = useState('');
    const [dataRevelacao, setDataRevelacao] = useState(new Date());
    const [descricao, setDescricao] = useState('');
    const navigation = useNavigation<StackTypes>();
    const userService = new UserService();

  
    const handleSalvarGrupo = async () => {
        // // const errorMessage = validateForm();
        // // if (errorMessage) {
        // //   Alert.alert('Erro', errorMessage);
        // //   return;
        // // }
        try  {
        //   const grupo = {
        //     nome: nomeDoGrupo,
        //     maxParticipantes: parseInt(maxParticipantes),
        //     valor: parseFloat(valor),
        //     dataRevelacao: undefined,
        //     descricao: descricao,
        //   };
          const grupo = {
            id: 0,
            novoGrupo: {
              imagem: "",
              nome: nomeDoGrupo,
              qtdUsuario: maxParticipantes,
              valor: valor,
              dataRevelacao: "2024-06-27T04:46:17.249Z",
              descricao: descricao,
              id_Status: 1
            }
          };
          const result = await userService.createGroup(grupo);
          if (result) {
            Alert.alert('Grupo Criado', `O grupo ${nomeDoGrupo} foi criado com sucesso.`);
            navigation.navigate('Home');
          } else {
            Alert.alert('Erro', result || 'Ocorreu um erro desconhecido.');
          }
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível criar o grupo. Tente novamente mais tarde.');
        }
            alert('Não foi possível criar o grupo. Tente novamente mais tarde.');
      };
    
      const validateForm = () => {
        if (!nomeDoGrupo.trim() || nomeDoGrupo.length > 20) return 'Nome do grupo inválido (máximo de 20 caracteres).';
        if (!maxParticipantes.trim() || parseInt(maxParticipantes, 10) < 2) return 'A quantidade de participantes deve ser maior que 1.';
        if (!valor.trim() || parseFloat(valor.replace(',', '.')) <= 0) return 'O valor deve ser maior que 0.';
        if (!descricao.trim()) return 'Por favor, adicione uma descrição ao grupo.';
        return '';
      };
      
    return (
    <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Olá</Text>
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
                {/* <DateTimePicker
                value={dataRevelacao}
                mode='date'
                display='default'
                onChange={(event, date) => date && setDataRevelacao(date)}
                /> */}
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
