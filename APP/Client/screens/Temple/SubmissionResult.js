import React from "react";
import { StyleSheet, Pressable, Text, View, Dimensions, FlatList, TouchableOpacity} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

import GoBackButton1 from "../../components/Utility/GoBackButton1";
import PageTitle from "../../components/Utility/PageTitle";

import { FontSize, FontFamily, Color, Border } from "../../GlobalStyles";

const { width, height } = Dimensions.get('window');

const SubmissionResult = ({ route }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { items } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCount}>{item.count}</Text>
    </View>
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={[styles.container, {
                paddingTop: insets.top,
                paddingBottom: insets.bottom+20,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
      
          <View style={{width:'100%'}}><GoBackButton1 /></View>
          <View style={styles.header}>
            <PageTitle  titleText={'提交成功'} iconName2={'checkcircle'}/>
          </View>
          
          <View style={styles.content}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={<View style={styles.listHeader} />}
              ListFooterComponent={<View style={styles.listFooter} />}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.returnHomeButton}
              onPress={() => navigation.navigate("TempleHomePage")}
            >
              <Text style={styles.returnHomeText}>返回首頁</Text>
            </TouchableOpacity>
          </View>

      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  header: {
    height: height * 0.15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.colorGray_100,
  },
  goBackButton: {
    position: 'absolute',
    left: width * 0.05,
    top: height * 0.05,
    width: width * 0.1,
    height: width * 0.1,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: FontSize.size_11xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    width:width*0.9,
    alignSelf:'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: width * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 20,
    color: "#4F4F4F",
    fontWeight:"bold",
  },
  itemCount: {
    fontSize: 20,
    fontWeight:"bold",
    color: "#4F4F4F",
  },
  listHeader: {
    height: height * 0.02,
  },
  listFooter: {
    height: height * 0.02,
  },
  footer: {
    height: height * 0.1,
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
  },
  returnHomeButton: {
    width: 150,
    height: 40,
    backgroundColor:'orange',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    bottom:100
  },
  returnHomeText: {
    fontSize: 16,
    color:'white',
    fontWeight:'bold',
    
  },
});

export default SubmissionResult;