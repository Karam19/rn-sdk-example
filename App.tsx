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
      <ReclaimHttps
        requestedProofs={[
          {
            url: 'https://bookface.ycombinator.com/home',
            loginUrl: 'https://bookface.ycombinator.com/home',
            loginCookies: ['_sso.key'], 
            responseSelections: [
              {
                responseMatch:
                  '\\{"id":{{YC_USER_ID}},.*?waas_admin.*?:{.*?}.*?:\\{.*?}.*?(?:full_name|first_name).*?}',
              },
            ],
          },
        ]}
        context="Proving on 2023 for eth India" 
        title="YC Login"
        subTitle="Prove you have a YC Login"
        cta="Prove"
        onSuccess={proofs => {
          /*do something*/
          console.log('proofs', proofs);
        }}
        onFail={e => {
          /*do something*/
          console.log('Error', e);
        }}
        buttonStyle={{backgroundColor: 'black'}}
        buttonTextStyle={{color: 'blue'}}
        onStatusChange={(text: string) => {
          console.log("from on Status change, the status is: ", text);
          if(text){
            setAadharVerifying(true);
          }
        }}
        hideButton={aadharVerifying}
        showShell={false}
      />
    </SafeAreaView>
  );
}

export default App;
