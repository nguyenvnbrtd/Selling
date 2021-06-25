import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Alert, SafeAreaView, ActivityIndicator} from 'react-native';
import axios from 'axios';
import Background from '../Component/Background';
import Rectangle from '../Component/Rectangle';



const Cart = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0.0)
    const {navigation} = props;

    useEffect(() => {

        navigation.addListener('focus', async () => {
            axios.get('/Cart')
            .then((res) =>{setData(res.data); setTotal(totalCost(res.data)) })
            .then(() => {setLoading(false)})
            .catch((err) => Alert.alert(err));
        })
        navigation.addListener('change', async () => {
            Alert.alert('Changed')
        })
        
    }, []);

        
    const totalCost = (data) => {
        let tt = 0;
        data.forEach((item)=>{
            tt += (parseFloat(item.price)*parseFloat(item.amount));
        })
        return tt;
    }


    const addToOrder = () => {
        
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        
        axios.post(`/Orders`, {
            "price": `${totalCost(data)}`,
            "day": `${today}`,
        })
        .then(() => {
            
            data.forEach((i)=>{
                axios.delete(`/Cart/${i.id}`)
                .then(()=> Alert.alert('Added'))
                .then(()=> {setData([]); setTotal(0); setLoading(true)})
                .catch((err) => Alert.alert(`${err}`))
            })
            navigation.navigate('Home')
        })

    }


    const deleteItem = (item) =>{
        axios.delete(`/Cart/${item}`)
        .then(()=>{
            axios.get('/Cart').then((res)=>setData(res.data))
        })
        .then(()=> Alert.alert('success'))
        .catch((err)=> Alert.alert(err))
    }

    const changeTotal = (num) => {
        setTotal(total+parseFloat(num))
    }
    


    return(
        <SafeAreaView style={styles.container}>
            <Background image={require('../Images/background2.jpg')}/>
            {isLoading ? <ActivityIndicator/> : 
                <View style={styles.container}>
                    <FlatList 
                        style={{marginBottom: 50}}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={ ({item}) => <Item item={item} changeTotal={changeTotal} deleteItem={() => deleteItem(item.id)}/> }
                        keyExtractor = { item => `${item.id}`}
                        
                    />
                    <TouchableOpacity style={styles.totalCostBar} onPress={()=> addToOrder(data)}> 
                        <Text style={styles.totalLabel}>Total: </Text>
                        <Text style={styles.totalCost} >{total} $</Text>
                    </TouchableOpacity>
                </View>

            }
            
            
        </SafeAreaView>

    );

    
}

const Item = (props) => {
    const {item, changeTotal, deleteItem} = props; 
    const [itemAmount, setItemAmount] = useState(1);
    if(itemAmount<=0) {axios.delete(`/Cart/${item.id}`); return(<View></View>);}
    return (
        <View style={ [styles.container, styles.itemContainer]}>
            <Rectangle width={300} height={150} >
                <Image style={styles.itemImage} source={{uri: `${item.source}about.jpg`}}/>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() =>{deleteItem(); changeTotal(-(itemAmount*item.price))}}><Text style={{color: 'white'}}>Delete</Text></TouchableOpacity>
                <Text style={styles.itemCost}>{item.price*itemAmount} $</Text>
            </Rectangle>
            <View style={styles.amountContainer}>
                <Text style={styles.itemAmount}>{itemAmount}</Text>
                <TouchableOpacity style={[styles.amountButton, styles.container, {left: 0}]} onPress={()=> {setItemAmount(itemAmount-1); changeTotal(-item.price)}}><Text>-</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.amountButton, styles.container, {right: 0}]} onPress={()=> {setItemAmount(itemAmount+1);changeTotal(item.price) }}><Text>+</Text></TouchableOpacity>
            </View>
            
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
        width: '100%',

    },
    itemName:{
        position: 'absolute',
        bottom: '1%',
        left: '1%',
        zIndex: 1,
    },
    itemCost:{
        position: 'absolute',
        right: '1%',
    },
    amountContainer:{
        padding: 10,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5,
        overflow: 'hidden',
    },
    amountButton:{
        width: 40,
        height: 40,
        backgroundColor: '#70a1ff',
        position: 'absolute',
    },
    totalCostBar: {
        position: 'absolute',
        bottom: 0,
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: 'red',
    },
    totalLabel:{
        position: 'absolute',
        left: '2%',
    },
    totalCost:{
        position: 'absolute',
        right: '2%',
        fontSize: 30,
    },
    deleteButton:{
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: '#ff7f50',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Cart;