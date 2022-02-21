import React, {useEffect, useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import WebViewScreen from '../screens/webView/WebViewScreen';
import remoteConfig from '@react-native-firebase/remote-config';
import {initializeApp} from 'firebase/app';
import MyAsyncStorage from '../persistence/storage/MyAsyncStorage';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';
import OnBoardingScreen from '../screens/onBoarding/OnBoardingScreen';
import PrivacyPolicyScreen from '../screens/onBoarding/PrivacyPolicyScreen';
import PrivacyPolicyWebView from '../screens/onBoarding/PrivacyPolicyWebView';
import ItemListScreen from '../screens/home/ItemListScreen';
import ItemDetailsScreen from '../screens/home/ItemDetailsScreen';
import MiniGameScreen from '../screens/home/MiniGameScreen';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyACFL-xOzjhXw25N6oPFa4WTjQYjxuigSU',
  projectId: 'star-ball-cb75f',
  appId: '1:387702187672:android:38c14320775eca392bd2ed',
};

export const app = initializeApp(firebaseConfig);

const ApplicationNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [url, setUrl] = useState();
  console.log('url :', url);

  const [linkLocal, setLinkLocal] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const callRemoteConfig = async () => {
      await remoteConfig()
        .fetchAndActivate()
        .then(res => {
          // console.log('getRemoteConfigRes', res);
          setRemoteConfigStatus(res);
        })
        .catch(err => {
          // console.log('remoteConfigErr :', err);
        });
      await remoteConfig()
        .setDefaults({
          key1: '',
        })
        .then(res => {
          console.log('Default values set.');
          setIsLoading(false);
        })
        .catch(err => console.log(err));
      const value = await remoteConfig().getString('key1');
      setUrl(value);
      setLinkLocal(value);
      console.log('value :', value);
      setIsLoading(false);
    };
    callRemoteConfig();
  }, []);

  useEffect(() => {
    MyAsyncStorage.storeData('linkLocal', {
      linkLocal: linkLocal,
    });
  }, [linkLocal]);

  const [remoteConfigStatus, setRemoteConfigStatus] = useState();

  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    setNetStatus(state.isConnected);
  });

  const [netStatus, setNetStatus] = useState();

  useEffect(() => {
    netStatus === false
      ? Alert.alert('No Internet Connection', 'Please connect to the Internet')
      : {};
  }, [netStatus]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        keyboardHidesTabBar: true,
      }}>
      {url !== null ? (
        <>
          <Stack.Screen
            name="WebViewScreen"
            component={() => <WebViewScreen value={url} />}
          />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="PrivacyPolicyWebView"
            component={PrivacyPolicyWebView}
          />
          <Stack.Screen name="ItemListScreen" component={ItemListScreen} />
          <Stack.Screen
            name="ItemDetailsScreen"
            component={ItemDetailsScreen}
          />
          <Stack.Screen name="MiniGameScreen" component={MiniGameScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="PrivacyPolicyWebView"
            component={PrivacyPolicyWebView}
          />
          <Stack.Screen name="ItemListScreen" component={ItemListScreen} />
          <Stack.Screen
            name="ItemDetailsScreen"
            component={ItemDetailsScreen}
          />
          <Stack.Screen name="MiniGameScreen" component={MiniGameScreen} />

          <Stack.Screen
            name="WebViewScreen"
            component={() => <WebViewScreen value={url} />}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
