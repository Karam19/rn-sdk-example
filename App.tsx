import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Dimensions,
  ScrollView,
  View,
  Text,
  Button,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  ReclaimHttps,
  ReclaimAadhaar,
} from '@reclaimprotocol/reclaim-react-native';

const screenWidth = Dimensions.get('window').width;
const shellWidth = screenWidth * 0.25;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={backgroundStyle.container}>
      <ReclaimAadhaar
        // context="Proving on 2023 for eth India"
        title="Aadhaar"
        subTitle="Prove your Aadhaar"
        cta="Prove"
        onSuccess={proofs => {
          /*do something*/
          console.log('proofs', proofs);
        }}
        onFail={e => {
          /*do something*/
          console.log('Error', e);
        }}
        onStatusChange={(text: string) => {
          console.log("from on Status change, the status is: ", text);
        }}
      />
    </SafeAreaView>
  );
}

export default App;
