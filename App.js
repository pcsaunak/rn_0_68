/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Zendrive from 'react-native-zendrive';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [sdkStatus, setSdkStatus] = useState('Not Initialised');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const checkStatusHandler = async () => {
    const response = await Zendrive.isSDKSetup();
    if (response) {
      setSdkStatus('Sdk Initialised');
    } else {
      setSdkStatus('SDK Not Initialised');
    }
  };
  const initialiseSdk = () => {
    Zendrive.setup({
      driverId: 'rn_68',
      sdkKey: 'RZgwNQ4iCjDzdO1pFxTZBijgAL3X98l7',
    })
      .then(response => {
        if (response.isSuccess) {
          setSdkStatus('SDK Initialised');
        } else {
          setSdkStatus(response.errorMessage);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="SDK Status">{sdkStatus}</Section>
          <Button title="Check SDK Status" onPress={checkStatusHandler} />
          <View style={{paddingTop: 30}} />
          <Button title="Initialise SDK" onPress={initialiseSdk} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
