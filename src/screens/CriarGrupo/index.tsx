import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, TextInput, Image} from 'react-native';
import { useNavigation, useRoute, RouteProp  } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import UserService from '../../services/UserService/UserService';
import { User } from '../../types/types';


const CriarGrupo = () => {
    const [nomeDoGrupo, setNomeDoGrupo] = useState('');
    const [maxParticipantes, setMaxParticipantes] = useState('');
    const [valor, setValor] = useState('');
    const [dataRevelacao, setDataRevelacao] = useState(new Date());
    const [descricao, setDescricao] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const navigation = useNavigation();
    const userService = new UserService();
    const route = useRoute<RouteProp<{params: User}, 'params'>>();
    const username = route.params?.PrimeiroNome;


    const validateForm = () => {
        if (!nomeDoGrupo.trim() || nomeDoGrupo.length > 20) return 'Nome do grupo inválido (máximo de 20 caracteres).';
        if (!maxParticipantes.trim() || parseInt(maxParticipantes, 10) < 2) return 'A quantidade de participantes deve ser maior que 1.';
        if (!valor.trim() || parseFloat(valor.replace(',', '.')) <= 0) return 'O valor deve ser maior que 0.';
        if (dataRevelacao <= new Date()) return 'A data de revelação do sorteio não pode ser retroativa.';
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
          const axiosResponse = await userService.createGroup(nomeDoGrupo);
          const result = axiosResponse.data as CreateGroupResponse;
      
          if (result.success) {
            Alert.alert('Grupo Criado', `O grupo ${nomeDoGrupo} foi criado com sucesso.`);
            setNomeDoGrupo('');
            setMaxParticipantes('');
            setValor('');
            setDataRevelacao(new Date());
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
    
      const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setDatePickerVisibility(Platform.OS === 'ios'); 
        if (event.type === 'set' && selectedDate && selectedDate > new Date()) {
          setDataRevelacao(selectedDate);
        } else {
          Alert.alert("Data inválida", "Escolha uma data futura.");
        }
      };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Olá, {username}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.screenTitle}>Criar Grupo</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.imageUploadContainer}>
            <Image source={require('../../../assets/favicon.png')} style={styles.groupImage} />
          <TouchableOpacity style={styles.imageButton}>
            <Text style={styles.imageButtonText}>Adicionar imagem</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nome do Grupo"
          onChangeText={setNomeDoGrupo}
          value={nomeDoGrupo}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade Máxima de Participantes"
          keyboardType="numeric"
          onChangeText={setMaxParticipantes}
          value={maxParticipantes}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="decimal-pad"
          onChangeText={setValor}
          value={valor}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          multiline
          onChangeText={setDescricao}
          value={descricao}
        />

        <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>
          Data de Revelação: {dataRevelacao.toLocaleDateString()}
        </Text>
        </TouchableOpacity>

        {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dataRevelacao}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

        <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8D7B4',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8D7B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerIcon: {
    fontSize: 20,
    color: '#784212',
  },
  headerTitle: {
    color: '#784212',
    fontSize: 16,
  },
  titleContainer: {
    backgroundColor: '#F8D7B4',
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
  },
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  imageButton: {
  },
  imageButtonText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#784212',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#784212',
    borderRadius: 5,
    padding: 10,
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
