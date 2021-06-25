import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import Rectangle from '../Component/Rectangle';

const Orders = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const {navigation} = props;

    useEffect(() => {

        navigation.addListener('focus', async () => {
            setLoading(true);
            axios.get('/Orders')
            .then((res) =>{setData(res.data)})
            .then(setLoading(false))
            .catch((err) => Alert.alert(err));
        })
        
    }, []);
    
    return(
        <SafeAreaView style={[styles.container, {marginTop: 50}]}>
            <StatusBar style="dark" />
            {isLoading ? <ActivityIndicator/> : 
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={ ({item}) => <Item item={item} deleteItem={()=> deleteItem(item.id, setData)}/> }
                    keyExtractor = { item => `${item.id}`}
                />}
        </SafeAreaView>

    );
  
}

const deleteItem = (item, setData) =>{
    
    axios.delete(`/Orders/${item}`)
    .then(()=>{
        axios.get('/Orders').then((res)=>setData(res.data))
    })
    .then(()=> Alert.alert('success'))
    .catch((err)=> Alert.alert(err))
}


const Item = (props) => {
    const {item, deleteItem} = props; 
    return (
        <View style={styles.itemContainer}>
            <Rectangle width={300} height={200} >
                <Image style={styles.itemImage} source={require(`../Images/order.png`)}/>
                <View style={styles.itemDescription}>
                    <Text style={styles.description}>{item.price} $</Text>
                    <Text style={styles.description}>{item.day}</Text>    
                </View>
                <TouchableOpacity style={[styles.deleteButton, styles.container]} onPress={deleteItem}><Text>Delete</Text></TouchableOpacity>
            </Rectangle>
        </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        marginVertical: 20,
    },
    itemImage:{
        height: '100%',
        width: 250,

    },
    itemDescription:{
        zIndex: 1,
        position: 'absolute',
        bottom: '1%',
        left: '1%'
    },
    description:{
    },
    deleteButton:{
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'red',
    },
})

export default Orders;