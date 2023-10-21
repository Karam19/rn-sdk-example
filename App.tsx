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
  const [aadharVerifying, setAadharVerifying] = React.useState(false);

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
      <ScrollView overScrollMode='never'>
      {aadharVerifying && (<Text>Verifying...</Text>)}
      <ReclaimAadhaar
        title="Aadhaar UID"
        subTitle="Prove you have Aadhaar Card"
        cta="Get Verified"
        context={"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"}
        onSuccess={proofs => {
          /*do something*/
          console.log('proofs', proofs);
        }}
        onFail={e => {
          /*do something*/
          console.log('Error', e);
        }}
        onStatusChange={(text: string) => {
          console.log("Reclaim - from on Status change, the status is: ", text);
          if (text) {
            setAadharVerifying(true);
          }
        }}
        showShell={false}
        style={{width: 300, borderWidth: 0, height: 30}}
        buttonStyle={{backgroundColor: '#01C38E', width: '100%', height: '100%', padding: 5}}
        buttonTextStyle={{color: 'white', fontSize: 12}}
      />
      <Image source={require('./img.png')} style={styles.image}/>
      <Text style={styles.caption}>Image caption</Text>
      <Image source={require('./img.png')} style={styles.image}/>
      <Text style={styles.caption}>Image caption</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 400, // Set the width of the image as needed
    height: 600, // Set the height of the image as needed
    resizeMode: 'cover', // Adjust the resizeMode as needed
    marginRight: 10, // Margin between the image and text
  },
  caption: {
    fontSize: 16, // Adjust the font size as needed
  },
});

export default App;
