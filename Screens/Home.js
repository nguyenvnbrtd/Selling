import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Background from '../Component/Background';
import Items from '../Component/Items';

const items = [
    {id: 1, name: 'tree and flower 1', amount: 6, source: 'https://raw.githubusercontent.com/nguyenvnbrtd/GirlAndCosplay/master/album/1/'},
    {id: 2, name: 'tree and flower 2', amount: 5, source: 'https://raw.githubusercontent.com/nguyenvnbrtd/GirlAndCosplay/master/album/2/'},
    {id: 3, name: 'tree and flower 3', amount: 11, source: 'https://raw.githubusercontent.com/nguyenvnbrtd/GirlAndCosplay/master/album/3/'},
    {id: 4, name: 'tree and flower 4', amount: 5, source: 'https://raw.githubusercontent.com/nguyenvnbrtd/GirlAndCosplay/master/album/4/'},
    {id: 5, name: 'tree and flower 5', amount: 10, source: 'https://raw.githubusercontent.com/nguyenvnbrtd/GirlAndCosplay/master/album/5/'},
];

const Home = (props) => {
    const {navigation} = props
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Background image={require('../Images/background2.jpg')}/>
            <FlatList 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={items}
                renderItem={ ({item}) => <Items item={item} onPress={()=> navigation.navigate('Item', {item} )}></Items> }
                keyExtractor = { item => `${item.id}`}
            />
        </View>
      );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});


export default Home;  