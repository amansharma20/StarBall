import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import commonStyles from '../../utils/styles/CommonStyles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/core';
import {COLORS} from '../../constants';
import WebView from 'react-native-webview';
import Loading from '../../components/Loading';
import LinearGradient from 'react-native-linear-gradient';

const PrivacyPolicyScreen = () => {
  const [checkBoxState, setCheckBoxState] = useState(false);
  console.log(checkBoxState);
  const navigation = useNavigation();
  const nextScreen = () => navigation.navigate('HomeScreen');
  const showAlert = () => Alert.alert('Please mark the checkbox');
  return (
    <View style={commonStyles.container}>
      <StatusBar backgroundColor={COLORS.background} hidden={false} />

      <LinearGradient colors={commonStyles.gradient} style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text style={styles.headerText}>Privacy Policy</Text>

          <Text style={styles.bodyText}>
            A. Introduction{`\n`}
            1. The privacy of visitors to our app Bet Ball is very important to
            us and we are committed to protecting it. The privacy policy
            contains a description of the processing of personal information.
            {`\n`}
            B. Collection of personal information The following types of
            personal data may be collected, stored and used:{`\n`}
            1. Information about your device, including your IP address,
            geographic location, phone type and version, and operating system,
            bid number device;{`\n`}
            2. Information such as your email address;{`\n`}
            3. Information you enter when you create a profile on our app, such
            as your name, profile photos, gender, birthday;{`\n`}
            4. Information you enter when using the services in our application;
            {`\n`}
            5. information relating to anything you purchase, services you use,
            or transactions you make through our application, including your
            name, address, phone number, email address;{`\n`}
            6. Any other personal information you send to us. Before you
            disclose another person's personal information to us, you must
            obtain that person's consent to both the disclosure and processing
            of that personal information in accordance with this Policy.
          </Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <BouncyCheckbox
              size={25}
              fillColor={COLORS.background}
              text=""
              iconStyle={{borderColor: 'white'}}
              textStyle={{textDecorationLine: 'none', color: 'white'}}
              onPress={() => setCheckBoxState(!checkBoxState)}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={[
                commonStyles.h4Text,
                {alignSelf: 'center', color: 'white', fontWeight: '500'},
              ]}>
              I agree with the
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('PrivacyPolicyWebView')}
              style={{alignItems: 'center'}}>
              <Text
                style={[
                  commonStyles.h4Text,
                  {
                    alignSelf: 'center',
                    color: 'white',
                    fontWeight: '900',
                    marginLeft: 3,
                    marginTop: 2,
                  },
                ]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              height: '12%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PrivacyPolicyScreen')}
              style={[
                styles.btnContainer,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: '#FA4A0C',
                },
              ]}>
              <Text style={[commonStyles.h2Text, {color: '#FA4A0C'}]}>
                Decline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // disabled={!checkBoxState}
              onPress={checkBoxState === true ? nextScreen : showAlert}
              style={[
                styles.btnContainer,
                {
                  backgroundColor:
                    checkBoxState === true ? '#FE2628' : '#878787',
                },
              ]}>
              <Text
                style={[
                  commonStyles.h2Text,
                  {
                    color: checkBoxState === true ? 'white' : '#000',
                  },
                ]}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  headerText: {
    color: '#F6ED13',
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: '700',
  },
  bodyText: {
    textAlign: 'left',
    paddingHorizontal: 20,
    color: 'white',
  },

  btnContainer: {
    backgroundColor: '##FA4A0C',
    marginHorizontal: '4%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    marginBottom: '10%',
  },
});
