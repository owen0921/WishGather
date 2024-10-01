import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';

const API = require('../config/DBconfig');
const { width, height } = Dimensions.get('window');

function WelfareMatchingPage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [temples, setTemples] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState(null); // To track the selected temple

  // Fetch temple data from API using async/await
  const fetchTemples = async () => {
    try {
      const response = await axios.get(`${API}/temples`);
      setTemples(response.data);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError(error);
    }
  };

  useEffect(() => {
    fetchTemples();
  }, []);
  

  const handleViewPress = (temple) => {
    // Navigate to WelfareMatchingDetails page and pass the temple name
    navigation.navigate('WelfareMatchingDetails', { templeName: temple.TEMPLE_NAME });
  };

  const handleConfirmPress = (temple) => {
    // Open confirmation modal and set the selected temple
    setSelectedTemple(temple);
    setModalVisible(true);
  };
  const renderTempleItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Temple Image */}
      <Image

        source={{ uri: `${API}${item.IMAGE}` }} // Assuming your API provides an image URL
        style={styles.templeImage}
      />
      <Text style={styles.templeInfo}>
        <Text style={styles.templeName}>{item.NAME}{'\n'}</Text>
        <Text style={styles.templeEvent}>{item.ADDRESS}</Text>
      </Text>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {/* "查看" Button */}
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleViewPress(item)}
        >
          <Text style={styles.buttonText_no}>查看</Text>
        </TouchableOpacity>

        {/* "確認" Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => handleConfirmPress(item)}
        >
          <Text style={styles.buttonText_ok}>確認</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <View style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'start',
    
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom-40,
          paddingLeft: insets.left,
          paddingRight: insets.right
      }}>
      <GoBackButton1 />
      
      <PageTitle titleText="媒合確認" iconName1="puzzle" /> 

      <View style={styles.donateListContainer}>
        <FlatList
          data={temples}
          renderItem={renderTempleItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      {/* Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>確認媒合 {selectedTemple?.NAME} ?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={() => {
                  setModalVisible(false);
                  // Perform the confirmation action here
                }}
              >
                <Text style={styles.modalButtonText}>確認</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "black",
    position: 'absolute',
    left: '10%',
  },
  donateListContainer: {
    width: width,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    paddingHorizontal:10,
    paddingBottom: 80,
    // borderWidth:1
  },
  itemContainer: {
    width: width*0.95,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  templeImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },
  templeInfo: {
    flex: 1,
    flexDirection: 'column',
    lineHeight: 25,
  },
  templeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  templeEvent: {
    fontSize: 14,
    color: '#666',
  },
  templeTime: {
    fontSize: 14,
    color: '#FF5733',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  viewButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText_ok: {
    fontSize: 14,
    color: 'white',
    fontWeight:'bold',
  },
  buttonText_no:{
    fontSize: 14,
    color: '#4F4F4F',
    fontWeight:'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    top: '20%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontWeight:'bold',
    fontSize: 18,
    marginBottom: 20,
    color:'#4F4F4F',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  modalButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  modalButtonConfirm: {
    backgroundColor: '#FF7A00',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontWeight:'bold',
    fontSize: 16,
    color: 'white',
  },
});

export default WelfareMatchingPage;