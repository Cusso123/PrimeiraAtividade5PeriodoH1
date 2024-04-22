import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import EsqueceuASenha from '../screens/EsqueceuASenha';
import CriarGrupo from '../screens/CriarGrupo'; 
import Convite from '../screens/Convite';

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Home:  undefined;
    Login: undefined;
    Cadastro: undefined;
    EsqueceuASenha: undefined;
    CriarGrupo: { groupId: string };
    Grupo: { groupId?: string };
    Convite: { nome: string };
    Perfil: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>


export default function StackComponent(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Cadastro" component={Cadastro}   options={{headerShown: false }}  />
                <Stack.Screen name="EsqueceuASenha" component={EsqueceuASenha}   options={{headerShown: false }}  />
                <Stack.Screen name="Home" component={Home} options={{ title: 'Bem-vindo(a)!' }} />
                <Stack.Screen name="CriarGrupo" component={CriarGrupo} options={{ title: 'Criar Grupo' }} />
                <Stack.Screen name="Convite" component={Convite} options={{ title: 'Convite' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}