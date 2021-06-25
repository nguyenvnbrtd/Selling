import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Alert, TouchableHighlight } from 'react-native';
import Rectangle from '../Component/Rectangle';
import axios from 'axios';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : []
        }
    }

    componentDidMount() {
        const {route} = this.props;
        const {item} = route.params;
        
        axios.get(`/${item.access}`)
        .then((res)=>{
            this.setState({
                items: res.data
            })
        })
    }
    
    render() {
        const {items} = this.state;
        return (
            <View style={styles.container}>   
                <FlatList 
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={items}
                    renderItem={ ({item}) => <Merchandise item={item}/> }
                    keyExtractor = { item => `${item.id}`}
                    numColumns={2}
    
                />
            </View>
            
        );
    }
    
};

const Merchandise = (props) => {
    const {item} = props;
    return (
        <View style={styles.merchandiseContainer}>        
            <Rectangle width={150} height={200}>
                <Text>{item.name}</Text>
                <Image style={styles.itemImage} source={{uri: `${item.source}about.jpg`}}></Image>
                <View style={styles.buyingBar}>
                    <Text style={styles.price}>{item.price} $</Text>
                    <TouchableHighlight style={styles.buyButton} onPress={()=> addToCart(item)}>
                        <Text style={styles.textBuy}>BUY +</Text>
                    </TouchableHighlight>
                </View>
            </Rectangle>
        </View>
    )
};

const addToCart = (item) => {


    axios.post(`/Cart`, {
        "name": `${item.name}`,
        "amount": 1,
        "price": `${item.price}`,
        "source": `${item.source}`,
    })
    .then(() => Alert.alert('Added to cart'))
    .catch((err) => Alert.alert('error'))
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    merchandiseContainer: {
        padding: 10,
    },
    itemImage : {
        resizeMode: 'cover',
        height:'100%',
        width:'100%',
    },
    flatList : {
        flex: 1, 
        flexDirection: 'column',
    },
    buyingBar:{
        // padding: 5,
        height: 30,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    price:{
        position: 'absolute',
        left: '2%',
    },
    buyButton:{
        position: 'absolute',
        right: '2%',
    },
    textBuy:{
        color: 'blue'
    },
});
