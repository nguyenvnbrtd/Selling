import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const User = (props) => {
    return(
        <View style={styles.container}>
            <Text>User</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


export default User;