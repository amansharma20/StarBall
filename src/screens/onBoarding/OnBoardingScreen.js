import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import commonStyles from '../../utils/styles/CommonStyles';
import {COLORS, images} from '../../constants';
import {useNavigation} from '@react-navigation/core';

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={commonStyles.container}>
      <StatusBar backgroundColor={COLORS.background} hidden={false} />
      <Image source={images.onBoardingBg} style={styles.imageBg} />
      <View style={styles.titleContainer}>
        <Text
          style={[
            commonStyles.headerText,
            {alignSelf: 'center', textAlign: 'center'},
          ]}>
          The best app for helping beginners in sports
        </Text>
        <Text
          style={[
            commonStyles.h5Text,
            {alignSelf: 'center', textAlign: 'center', marginHorizontal: 40},
          ]}>
          In our application you can find tips on the rate.{`\n`}Rate the app
          fully.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.push('PrivacyPolicyScreen')}
          style={styles.btnContainer}>
          <Text style={commonStyles.h2Text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  imageBg: {width: '100%', height: '50%', resizeMode: 'contain'},
  titleContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  btnContainer: {
    backgroundColor: '#F38022',
    marginHorizontal: 24,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
});
