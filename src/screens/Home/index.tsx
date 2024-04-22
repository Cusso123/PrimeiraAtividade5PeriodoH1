import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp  } from '@react-navigation/native';
import { User } from '../../types/types';

const Home = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ params: User }, 'params'>>();

    const nome = route.params?.PrimeiroNome || 'Visitante';
    const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1);

    const handleNavigate = (screenName: string) => {
        navigation.navigate(screenName as never);
    };

    return (
        <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleNavigate('Menu')}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Olá, {nomeCapitalizado}{}</Text> {}
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchText}>🔍 Buscar</Text>
      </View>

      <Text style={styles.sectionTitle}>Comunidades</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Natal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Futebol</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Grupos</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Aniversário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Faculdade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Times de Fute</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bingo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handleNavigate('Home')}>
          <Text style={styles.footerText}>🏠 Início</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('CriarGrupo')}>
          <Text style={styles.footerText}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Perfil')}>
          <Text style={styles.footerText}>👤 Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8d7b4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#feefde',
  },
  headerText: {
    fontSize: 18,
  },
  headerIcon: {
    fontSize: 24,
  },
  searchBar: {
    backgroundColor: '#feefde',
    padding: 10,
  },
  searchText: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 22,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    backgroundColor: '#fdc8a8',
    padding: 20,
    width: '48%',
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#feefde',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 24,
  }
});

export default Home;
