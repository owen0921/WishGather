import { React, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'


function InfoTag({label, value}){
    return (
        <View style={styles.tagContainer}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{ label } | </Text>
            </View>
            <View>
                <Text style={styles.value}>{ value }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    labelContainer: {
    },
    label:{
        color: "orange",
        fontWeight: "bold"
    },
    value: {
        width: "auto"
    }
})

export default InfoTag;