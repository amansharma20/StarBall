import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useRef} from 'react';
import {screenHeight, screenWidth} from '../../constants/Layout';
import {COLORS, icons, images} from '../../constants';
import {useNavigation} from '@react-navigation/core';

const MiniGameScreen = () => {
  const navigation = useNavigation();

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ImageBackground
        source={images.miniGame}
        style={{
          height: screenWidth,
          width: screenHeight,
          resizeMode: 'contain',
        }}
        imageStyle={{
          transform: [{rotate: '90deg'}],
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.backIcon}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              marginHorizontal: 20,
              marginVertical: 10,
              position: 'absolute'
            }}
          />
        </TouchableOpacity>
        <Animated.View
          style={{
            transform: [
              {translateX: pan.x},
              {translateY: pan.y},
              {rotate: '270deg'},
            ],
          }}
          {...panResponder.panHandlers}>
          <Image source={images.football} style={styles.box} />
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default MiniGameScreen;

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },
});
