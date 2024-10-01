import { React } from 'react'
import { Pressable, View, Text, StyleSheet, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

function NavigateBack(){
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.pressable}>
                <Ionicons name="chevron-back-outline" size={20} color={"#b87006"}/>
                <Text style={styles.text}>Back</Text>
            </Pressable>
        </View>
      
    )
}

const styles = StyleSheet.create({
    container:{
        width:width,
    },
    pressable: {
        width: 100,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 8,
        paddingVertical: 20,
    },
    text: {
        fontSize: 20,
        color: "#b87006",
        fontWeight: "semibold"
    }
})

export default NavigateBack;