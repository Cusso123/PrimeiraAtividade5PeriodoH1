import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import EsqueceuASenha from '../screens/EsqueceuASenha';
import CriarGrupo from '../screens/CriarGrupo'; 
import Convite from '../screens/Convite';

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Splash: undefined;
    Home:  undefined;
    Login: undefined;
    Cadastro: undefined;
    EsqueceuASenha: undefined;
    CriarGrupo: { groupId: string };
    Grupo: { groupId?: string };
    Convite: { nome: string };
    Perfil: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>


export default function StackComponent(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
                <Stack.Screen name="EsqueceuASenha" component={EsqueceuASenha} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="CriarGrupo" component={CriarGrupo} options={{ headerShown: false }}/>
                <Stack.Screen name="Convite" component={Convite} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}