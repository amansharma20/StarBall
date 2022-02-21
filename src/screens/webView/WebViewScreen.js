import {Keyboard, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import commonStyles from '../../utils/styles/CommonStyles';
import {COLORS} from '../../constants';
import Loading from '../../components/Loading';
import {getModel, getUniqueId} from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';

const WebViewScreen = ({value}) => {
  console.log('value :', value);
  const propValue = value;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    async function getLinkLocal() {
      const model = await getModel();

      const geo = await RNLocalize.getCountry();

      const androidId = await getUniqueId();

      const tempUrl = value + '?' + model + '?' + geo + '?' + androidId;
      console.log('tempUrl :', tempUrl);
      setApiUrl(tempUrl);
    }
    if (value !== null || value !== undefined) {
      getLinkLocal();
    }
    console.log('error');
  }, [propValue]);

  const [webViewUrl, setWebViewUrl] = useState();
  console.log('webViewUrl :', webViewUrl);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          console.log('response :', response.data.banner_url);
          setWebViewUrl(response.data.banner_url);
          setIsLoading(false);
          if (webViewUrl == null) {
            console.log('homehomehomehome');
            navigation.navigate('PrivacyPolicyScreen');
          }
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Data fetching cancelled');
        } else {
          setIsLoading(false);
        }
      }
    };
    fetchApiData();
  }, [apiUrl]);

  return (
    <View style={commonStyles.container}>
      <StatusBar
        backgroundColor={COLORS.background}
        hidden={!isKeyboardVisible}
      />
      {webViewUrl === undefined ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <View style={{flex: 1}}>
            <WebView
              thirdPartyCookiesEnabled={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              setBuiltInZoomControls={false}
              allowFileAccess={true}
              source={{uri: webViewUrl}}
              startInLoadingState={true}
              renderLoading={() => <Loading />}
              onLoadEnd={() => console.log('Page Loaded')}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({});
