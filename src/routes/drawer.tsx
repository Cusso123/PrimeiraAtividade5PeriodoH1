import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Convites from '../screens/Convites';
import VisualizarMembro from '../screens/VisualizarMembro';
import Sorteio from '../screens/Sorteio';
import { StackNavigation } from './stack';

const Drawer = createDrawerNavigator();

type DrawnNavigation = {
  drawer : StackNavigation
};

const DrawerComponent = (props?: DrawnNavigation) => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Convites" component={Convites} options={{ headerShown: false }}/>
      <Drawer.Screen name="Sorteio" component={() => <Sorteio grupoId={props?.drawer.Grupo.groupId ?? '0'}/>} options={{ headerShown: false }} />
      <Drawer.Screen name="Sair" component={Login} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
};

export default DrawerComponent;