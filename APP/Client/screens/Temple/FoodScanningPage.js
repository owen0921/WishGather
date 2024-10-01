import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API = require('../config/DBconfig');

function FoodScanningPage() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const cameraRef = useRef(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ base64: true });
                setImageUri(photo.uri);
                await sendPictureToServer(photo.base64);
            } catch (error) {
                console.error('Error taking picture:', error);
                Alert.alert('Error', 'Failed to take picture. Please try again.');
            }
        } else {
            Alert.alert('Error', 'Camera reference not available');
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            await sendPictureToServer(result.assets[0].base64);
        }
    };

    const sendPictureToServer = async (base64Image) => {
        console.log('Sending picture to server...');
        setIsLoading(true);
        try {
            const response = await axios.post(`${API}/upimg`, {
                photo: base64Image
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Server response received:', response.data);

            if (response.data) {
                const objectCounts = response.data;
                navigation.navigate('ScanResult', { objectCounts });
            }
        } catch (error) {
            console.error('Error sending picture to server:', error);
            Alert.alert('Error', 'Failed to process image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaProvider>
            <View style={[styles.container, {
                paddingTop: insets.top + 30,
                paddingBottom: insets.bottom-40,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>供品辨識</Text>
                </View>
                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePicture} disabled={isLoading}>
                            <AntDesign name="camera" size={24} color="#4F4F4F" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage} disabled={isLoading}>
                    <FontAwesome name="cloud-upload" size={24} color="white" />
                    <Text style={styles.buttonText}>Upload Picture</Text>
                </TouchableOpacity>
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#FFA500" />
                        <Text style={styles.loadingText}>正在處理圖片...</Text>
                    </View>
                )}
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4F4F4F',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        width: 100,
        height: 100,
        alignSelf:'center',
        justifyContent:'center',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        position: 'relative',
        marginBottom: 40,
    },
    button: {
        flex: 1,
        flexDirection:'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    uploadButton: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: "orange",
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10, 
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
});

export default FoodScanningPage;