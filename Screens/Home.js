import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import Background from '../Component/Background';
import Items from '../Component/Items';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : []
        }
    }

    componentDidMount() {
        axios.get('/Items')
        .then((res)=>{
            this.setState({
                items: res.data
            })
        })
    }
    
    render(){
        const {navigation} = this.props;
        const {items} = this.state;
        return(
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
    }
    
    
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});


 