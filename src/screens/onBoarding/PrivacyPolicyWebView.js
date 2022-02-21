import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import Loading from '../../components/Loading';

const PrivacyPolicyWebView = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        thirdPartyCookiesEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        setBuiltInZoomControls={false}
        allowFileAccess={true}
        source={{uri: 'https://skiper-games.xyz/'}}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        onLoadEnd={() => console.log('Page Loaded')}
        allowsBackForwardNavigationGestures={true}
      />
    </View>
  );
};

export default PrivacyPolicyWebView;

const styles = StyleSheet.create({});
