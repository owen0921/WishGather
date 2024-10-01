import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

const SectionHeader = ({ title, onPress }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={styles.pressable}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={36} color="orange" /> 
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 30,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // borderWidth: 1,
    },
    pressable: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 16,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#4F4F4F",
    }
});

export default SectionHeader;
