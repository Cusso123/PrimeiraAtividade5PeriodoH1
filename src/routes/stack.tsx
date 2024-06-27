import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import DrawerComponent from './drawer'; 
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import EsqueceuASenha from '../screens/EsqueceuASenha';
import CriarGrupo from '../screens/CriarGrupo'; 
import Convites from '../screens/Convites';
import Convite from '../screens/Convite';
import Perfil from '../screens/Perfil';
import VisualizarMembro from '../screens/VisualizarMembro';
import Sorteio from '../screens/Sorteio';


const Stack = createNativeStackNavigator();


export type StackNavigation = {
    Splash: undefined;
    Home:  undefined;
    Login: undefined;
    Cadastro: undefined;
    EsqueceuASenha: undefined;
    CriarGrupo: { groupId: string };
    Grupo: { groupId?: string };
    Convite: { nome: string };
    Perfil: undefined;
    VisualizarMembro: {groupId: string};
    Sorteio: { membros: { id: number, nome: string, sorteadoCom: string , grupoId : string}[] };

};
export type StackTypes = NativeStackNavigationProp<StackNavigation>

export default function StackComponent(props?: StackNavigation){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/*<Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>*/}
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
                <Stack.Screen name="EsqueceuASenha" component={EsqueceuASenha} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={() => <DrawerComponent drawer={props?? {} as StackNavigation}/>} options={{ headerShown: false }}/>
                <Stack.Screen name="CriarGrupo" component={CriarGrupo} options={{ headerShown: false }}/>
                <Stack.Screen name="Convite" component={() => <Convite conviteId={props?.Convite.nome ?? '0'}/>} options={{ headerShown: false }}/>
                <Stack.Screen name="Convites" component={Convites} options={{ headerShown: false }}/>
                <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
                <Stack.Screen name="VisualizarMembro" component={() => <VisualizarMembro grupoId={props?.Grupo.groupId ?? '0'}/>} options={{ headerShown: false }}/>
                <Stack.Screen name="Sorteio" component={Sorteio} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}