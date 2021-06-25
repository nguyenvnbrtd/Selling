import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons';
import Home from '../Screens/Home';
import Item from '../Screens/Item';
import Cart from '../Screens/Cart';
import Order from '../Screens/Order';
import User from '../Screens/User';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default () => {
    return (
      <NavigationContainer>
        <Tab.Navigator
          
          tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="Cart" 
            component={CartScreen} 
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({ color, size }) => (
              <AntDesign name="shoppingcart" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="Order" 
            component={Order}
            options={{
              tabBarLabel: 'Orders',
              tabBarIcon: ({ color, size }) => (
              <AntDesign name="profile" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="User" 
            component={User}
            options={{
              tabBarLabel: 'User',
              tabBarIcon: ({ color, size }) => (
              <AntDesign name="contacts" color={color} size={size} />
              ),
            }}

          />

        </Tab.Navigator>
        
      </NavigationContainer>
    );
};

const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName={Home} >
      <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
      <Stack.Screen name="Item" component={Item} options={{ title: 'ItemInfo'}} />
    </Stack.Navigator>
  )
}

const CartScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={Cart} options={{ title: 'Cart' }}/>
    </Stack.Navigator>  
  )
}