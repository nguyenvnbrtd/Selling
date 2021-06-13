import React from 'react';
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Rectangle from './Rectangle';

const Items = (props) => {
    const {item, onPress} = props;

    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Rectangle width={250} height={250}>
                <Image style={styles.itemImage} source={{uri:`${item.source}about.jpg`}}></Image>
                <Text style={styles.title}>{item.name}</Text>
            </Rectangle>
        </TouchableOpacity>
    );
}

// const getWidth = (percent) =>{
//     return (Dimensions.get('window').width)*percent/100;
// }
// const getHeight = (percent) =>{
//     return (Dimensions.get('window').height)*percent/100;
// }

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    itemImage : {
        resizeMode: 'cover',
        height:'100%',
        width:'100%',
    },
    title:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 5,
    },
});

export default Items;