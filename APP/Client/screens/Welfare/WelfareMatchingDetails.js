import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API = require('../config/DBconfig');

export default function MatchingDetailsPage({ route, navigation }) {
  const { DonationID } = route.params;  // Receive DonationID from MatchingPage
  const [donationDetails, setDonationDetails] = useState([]);
  const [error, setError] = useState(null);

  // Fetch donation details from the database using DonationID
  useEffect(() => {
    axios.get(`${API}/donations/${DonationID}`)
      .then(response => {
        setDonationDetails(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, [DonationID]);

  const renderDonationItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.price}</Text>
      <Text style={styles.itemText}>{item.quantity}</Text>
      <Text style={styles.itemText}>{item.supplier}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Temple Details */}
      <View style={styles.templeHeader}>
        <Image 
          source={{ uri: 'https://your-image-url.com' }}  // Placeholder image
          style={styles.templeImage}
        />
        <Text style={styles.templeName}>高雄文武聖殿</Text>  {/* This is static for now, replace with data */}
        <Text style={styles.templeAddress}>高雄市蓮海路70號</Text> {/* Replace with actual address */}
      </View>

      {/* Order Details */}
      <Text style={styles.sectionTitle}>訂單詳細資訊</Text>
      
      <View style={styles.orderDetails}>
        <FlatList
          data={donationDetails}
          renderItem={renderDonationItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Error Handling */}
      {error && <Text style={styles.errorText}>{error.message}</Text>}

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={styles.buttonText}>拒絕媒合</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>確認媒合</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  templeHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFA500',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  templeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  templeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  templeAddress: {
    fontSize: 16,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'left',
  },
  orderDetails: {
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

