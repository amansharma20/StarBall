import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import commonStyles from '../../utils/styles/CommonStyles';
import {Responsive, screenWidth} from '../../constants/Layout';
import {icons} from '../../constants';
import {useNavigation} from '@react-navigation/core';

const Item = ({item}) => {
  const navigation = useNavigation();
  console.log(item.itemDetails)
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemDetailsScreen', {data: item.itemDetails})}
      style={styles.item}>
      <Image
        source={{uri: item.image}}
        style={{width: Responsive.width(100), height: Responsive.height(100)}}
      />
      <View>
        <Text
          style={[
            commonStyles.h4Text,
            {
              marginHorizontal: 16,
              width: screenWidth / 2,
            },
          ]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ItemListScreen = itemList => {
  const navigation = useNavigation();
  const itemData = itemList?.route?.params?.data;
  //   console.log('itemData :', itemData);

  const [flatListData, setFlatListData] = useState();

  useEffect(() => {
    setFlatListData(itemData);
  }, []);

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <View style={{flex: 1}}>
      <LinearGradient style={{flex: 1}} colors={commonStyles.gradient}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.backIcon}
            style={{width: 24, height: 24, resizeMode: 'contain', margin: 20}}
          />
        </TouchableOpacity>
        <FlatList
          data={flatListData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </LinearGradient>
    </View>
  );
};

export default ItemListScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 32,
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  title: {
    fontSize: 32,
    marginHorizontal: 16,
  },
});
