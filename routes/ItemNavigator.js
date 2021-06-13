import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Item from '../Screens/Item';

const Stack = createStackNavigator();

export default () => {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
          <Stack.Screen name="Item" component={Item} options={{ title: 'ItemInfo'}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

