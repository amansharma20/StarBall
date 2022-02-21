import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import commonStyles from '../../utils/styles/CommonStyles';
import {screenHeight, screenWidth} from '../../constants/Layout';
import {useNavigation} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../constants/Images';
import {DATA} from '../../assets/dummyData/DATA'

const Item = ({item}) => {
  const navigation = useNavigation();
  console.log('item :', item);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ItemListScreen', {data: item.itemList})
      }>
      <ImageBackground
        source={{uri: item.bg}}
        style={styles.item}>
        <Text style={commonStyles.h1Text}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <View style={commonStyles.container}>
      <LinearGradient colors={commonStyles.gradient} style={{flex: 1}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MiniGameScreen')
          }>
          <ImageBackground source={Images.minigameBg} style={styles.item}>
            <Text style={commonStyles.h1Text}>Mini Game</Text>
          </ImageBackground>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  item: {
    height: screenHeight / 4,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
});
