import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Convites from '../screens/Convites';

const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Convites" component={Convites} options={{ headerShown: false }}/>
      <Drawer.Screen name="Sair" component={Login} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
};

export default DrawerComponent;