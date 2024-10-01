import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

function MatchingInfoCard({ infos }) {
    const { DELIVER_STATUS } = infos;

    let statusTextStyle;
    switch (DELIVER_STATUS) {
        case "A": 
            statusTextStyle = styles.waitStatus;
            break;
        case "B":
            statusTextStyle = styles.confirmedStatus;
            break;
        default:
            statusTextStyle = styles.defaultStatus;
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.image} source={require("../../assets/welfare-sample.png")}/>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{ infos.NAME }</Text>
                    <Text style={styles.defaultStatus}>媒合狀態 : <Text style={statusTextStyle}>{ DELIVER_STATUS }</Text></Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>查看內容</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </View>
    );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    cardContainer: {
        width: screenWidth * 0.9,
        height: 220,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 15,
        marginVertical: 8,
        paddingHorizontal: 5,
        paddingVertical: 35,
    },
    logoContainer:{
        marginBottom: 10,
        padding: 5,
    },
    image: {
        width: 90,
        height: 90,
    },
    bottomContainer: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        marginTop: 10,
    },
    
    infoContainer: {
        gap: 8,
    },
    
    title: {
        color: "#4F4F4F",
        fontSize: 20,
        fontWeight: "bold"
    },
    button: {
        paddingHorizontal: 17,
        paddingVertical: 10,
        backgroundColor: "orange",
        borderRadius: 8
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    waitStatus: {
        fontSize: 16,
        color: "red",
        fontWeight: "bold"
    },
    confirmedStatus: {
        color: "green",
        fontWeight: "bold"
    },
    defaultStatus: {
        color: "#ccc",
        fontWeight: "bold"
    }
});

export default MatchingInfoCard;
