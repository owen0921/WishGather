import React, { useState ,useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, Dimensions, Alert } from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';
import OfferingEditBlock from '../../components/Temple/OfferingEditBlock';
import { UserContext } from '../../components/Context/UserContext'; // for userId

const {width, height} = Dimensions.get('window');

const API=require('../config/DBconfig')
import axios from 'axios';

const OfferingEditPage = () => {
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { userId } = useContext(UserContext);

  // 從後端取得temple offering的資料
  const fetchTempleOfferingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/get_temple_offering/${userId}`);
      setOfferings(response.data); 
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch temple offerings');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTempleOfferingData();
    }, [])
  );

   // 刪除供品邏輯
   const handleOfferingDelete = (offeringId) => {
    Alert.alert(
      '刪除供品',
      '確定要刪除此供品嗎？',
      [
        { text: '取消', style: 'cancel' },
        { text: '確定', onPress: async () => {
          try {
            await axios.delete(`${API}/temple_offering/${offeringId}`);
            setOfferings(prevOfferings => prevOfferings.filter(item => item.offering_id !== offeringId));
            Alert.alert('刪除成功', '供品已刪除');
          } catch (error) {
            Alert.alert('Error', 'Failed to delete offering');
          }
        }},
      ]
    );
  };  

  const handleDelete = (offeringId) => {
    Alert.alert(
      '刪除供品',
      '確定要刪除此供品嗎？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '確定',
          onPress: () => {
            handleOfferingDelete();
          },
        },
      ]
    );
  };

  const handleEdit = (offering) => {
    navigation.navigate('EditOfferingInfoPage', { offering });
  };

  const renderOfferingItem = ({ item }) => {
    return (
      <OfferingEditBlock
        offering={item}
        onEdit={() => handleEdit(item)}
        onDelete={() => handleOfferingDelete(item.offering_id)}
      />
    );
  };
  // const renderOfferingItem = ({ item }) => {
  //   return (
      
  //     <View style={{ padding: 10, borderBottomWidth: 1 }}>
  //       {/* 顯示圖片 */}
  //       <Image 
  //         source={{ uri: item.IMAGE }}
  //         style={{ width: 100, height: 100, marginBottom: 10 }}
  //       />
  //       {/* 顯示供品資訊 */}
  //       <Text>名稱: {item.NAME}</Text>
  //       <Text>金額: ${item.PRICE}</Text>
  //       <Text>備註: {item.DESCRIPTION}</Text>
  
  //       {/* 編輯按鈕 */}
  //       <Button 
  //         title="編輯"
  //         onPress={() => handleEdit(item)} 
  //       />
  
  //       {/* 刪除按鈕 */}
  //       <Button 
  //         title="刪除"
  //         color="red"
  //         onPress={() => handleOfferingDelete(item.offering_id)}
  //       />
  //     </View>
  //   );
  // };
  

  return (
    <SafeAreaProvider>
        <View style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
                justifyContent: 'start',
                alignItems: 'center',
                // Paddings to handle safe area
                paddingTop: insets.top + 30,
                paddingBottom: insets.bottom - 40,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }}>
            <View style={styles.btncontainer}><GoBackButton1 /></View>
            <PageTitle iconName={'edit'} titleText="供品編輯"></PageTitle>

            {loading ? (
            <Text>Loading...</Text>
            ) : (
              <FlatList
                data={offerings}
                renderItem={renderOfferingItem}
                keyExtractor={(item, index) => {
                return item.offering_id ? item.offering_id.toString() : index.toString();
                }}
                
              />
            )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  btncontainer:{
    position: 'absolute',
    top: 60,
    left: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  
});

export default OfferingEditPage;
