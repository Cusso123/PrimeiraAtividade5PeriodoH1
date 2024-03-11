import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

interface OlaExe {
  nomeExe: string;
}

const Ola: React.FC<OlaExe> = ({ nomeExe }) => {
  const [contadorLikes, setContadorLikes] = useState<number>(0);

  const incrementarContador = () => setContadorLikes(contadorLikes + 1);
  const diminuirContador = () => setContadorLikes(contadorLikes - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Olá {nomeExe}, seu total de Likes é {contadorLikes}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Like" onPress={incrementarContador} color="green" />
        <View style={{ width: 10 }} />
        <Button title="Dislike" onPress={diminuirContador} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default Ola;