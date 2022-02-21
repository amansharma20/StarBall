import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import commonStyles from '../../utils/styles/CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import {icons, SIZES} from '../../constants';
import {useNavigation} from '@react-navigation/core';

const ItemDetailsScreen = data => {
  const navigation = useNavigation();

  const details = data.route.params.data;

  const show = {details};
  console.log('show :', {show});

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        style={{flex: 1, paddingHorizontal: SIZES.paddingHorizontal}}
        colors={commonStyles.gradient}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.backIcon}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              marginVertical: 20,
            }}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
          {show.details.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: 'white',
            marginTop: 40,
          }}>
          {show.details.subTitle}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({});
