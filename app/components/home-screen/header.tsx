import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text>Icon</Text>
                <Text>Avatar</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.h1}>Shop Iphone ...</Text>
            </View>
            <View style={styles.row}>
                <Text></Text>
            </View>
        </View>
    )
}

export default header

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    h1: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black'
    }
})
