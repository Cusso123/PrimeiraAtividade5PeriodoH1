import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Button } from 'react-native';
import { StackTypes } from '../../routes/stack';

const Home = () => {

    const navigation = useNavigation<StackTypes>();

return (
    <View>
        <Text>Estou na Home</Text>
        <Button title='Voltar para Login' onPress={() => {  navigation.goBack();}} />
    </View>

);

};

export default Home;