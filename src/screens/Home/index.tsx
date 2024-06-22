import React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Dimensions  } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions   } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';


const screenHeight = Dimensions.get('window').height;

type RootStackParamList = {
  Home: { username: string };
  CriarGrupo: undefined;
  Perfil: undefined;
};
type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;


const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();

  const nome = route.params?.username || 'Visitante';
  const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1);

  const handleNavigate = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
      <Text> </Text>
        <Text style={styles.headerText1}>Olá, {nomeCapitalizado}</Text>
        <TouchableOpacity onPress={() => {}}>
        <MaterialIcons name="notifications" size={24} color='#F5CBA7'/>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>Buscar</Text>
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
          <Text style={styles.buttonText}>Roda da Fortuna</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bingo da Sorte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Loteria dos Sonhos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Caça ao Tesouro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Banquete de Bônus</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      
      <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <MaterialIcons name="menu" size={35} color='#F5CBA7' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('CriarGrupo')} style={styles.addButton}>
        <MaterialIcons name="add-circle" size={35} color='#F5CBA7' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('Perfil')}>
        <MaterialIcons name="account-circle" size={35} color='#F5CBA7' />        
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
  scrollContainer: {
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#784212',
    textAlign:'center',
    marginBottom: 20,
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
    width: '45%',
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
    backgroundColor: '#000',
    borderRadius: 35,
    padding: 0,
  }
});

export default Home;