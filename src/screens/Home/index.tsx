import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp  } from '@react-navigation/native';
import { User } from '../../types/types';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { username: string } }, 'params'>>();

  const nome = route.params?.username || 'Visitante';
  const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1);

  const handleNavigate = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleNavigate('Menu')}>
          <Text style={styles.headerIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerText1}>Bem-Vindo!</Text>
        <Text style={styles.headerText}>Olá, {nomeCapitalizado}</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>Buscar</Text>
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
        <TouchableOpacity onPress={() => handleNavigate('Login')}>
          <Text style={styles.footerIcon}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('CriarGrupo')} style={styles.addButton}>
          <Text style={styles.footerIcon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Perfil')}>
          <Text style={styles.footerIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5CBA7',
  },
  headerText1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5CBA7',
    textAlign: 'center',
  },
  headerIcon: {
    fontSize: 28,
    color: '#F5CBA7',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
    height: 40,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#F5CBA7',
  },
  searchText: {
    fontSize: 18,
    color: '#F5CBA7',
  },
  sectionTitle: {
    fontSize: 24,
    padding: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#784212',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
  },
  buttonText: {
    fontSize: 18,
    color: '#F5CBA7',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#784212',
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  footerIcon: {
    fontSize: 24,
    color: '#FFF1E6',
  },
  addButton: {
    backgroundColor: '#FFF1E6',
    borderRadius: 25,
    padding: 6,
  }
});

export default Home;