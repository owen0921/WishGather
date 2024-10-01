import { React, useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, ActivityIndicator, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import MatchingInstituteCard from '../../components/Temple/MatchingInstituteCard';
import CheckoutBar from '../../components/Utility/CheckoutBar';

const API = require('../config/DBconfig');

function MatchingInstitution() {
  const insets = useSafeAreaInsets();
  const [swOrgData, setswOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMatching, setIsMatching] = useState(false); // 控制Loading狀態
  const [matchedInstitute, setMatchedInstitute] = useState(null); // 存儲媒合結果

  

  useEffect(() => {
    axios
      .get(`${API}/sw_organization`)
      .then((response) => {
        setswOrgData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleMatching = () => {
    setIsMatching(true);
     // Static matching result data
     const result = {
        name: "鳳山城隍廟",
        address: "高雄市鳳山區鳳明街66號",
        offerings: [
          { NAME: '罐裝飲料', AMOUNT: 5 },
          { NAME: '乾糧', AMOUNT: 10 },
          { NAME: '罐頭', AMOUNT: 9 },
        ],
      };
      // Simulate a delay and show loading spinner if needed, then set matchedInstitute
      setTimeout(() => {
        setMatchedInstitute(result);
        setIsMatching(false);
      }, 2000); // Simulate a 2-second delay for matching
      
    // setTimeout(() => {
    //   // 模擬媒合邏輯，隨機選一個機構作為媒合結果
    //   const randomInstitute = swOrgData[Math.floor(Math.random() * swOrgData.length)];
    //   setMatchedInstitute(randomInstitute);
    //   setIsMatching(false);
    // }, 2000); // 假設媒合時間為2秒
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaProvider>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top - 30,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        <View style={styles.flatListContainer}>
          <FlatList
            data={swOrgData}
            renderItem={({ item }) => <MatchingInstituteCard institute={item} />}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CheckoutBar btnText={'一鍵媒合'} iconName={'arrow-forward-circle-outline'} onPress={handleMatching} />
        </View>

        {/* Loading */}
        {isMatching && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="orange" />
            <Text style={styles.loadingText}>媒合中...</Text>
          </View>
        )}

        {/* 媒合結果 Modal */}
        {matchedInstitute && (
          <Modal transparent={true} visible={!!matchedInstitute} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>媒合結果</Text>

              <Image
                source={{ uri: 'https://via.placeholder.com/80x80.png' }} // Replace with your image source
                style={styles.instituteImage}
              />
              <Text style={styles.instituteName}>{matchedInstitute?.name}</Text>
              <Text style={styles.instituteAddress}>{matchedInstitute?.address}</Text>

              <Text style={styles.modalSubtitle}>品項內容</Text>
              <FlatList
                data={matchedInstitute?.offerings}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.NAME}</Text>
                    <Text style={styles.tableCell}>{item.AMOUNT}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text>目前無品項</Text>}
              />

              <Pressable onPress={() => setMatchedInstitute(null)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>關閉</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  flatListContainer: {
    paddingBottom: 80,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight:'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F4F4F',
    marginBottom: 15,
  },
  instituteImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  instituteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom:5,
  },
  instituteAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    fontSize: 16,
    color: '#555',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'orange',
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MatchingInstitution;
