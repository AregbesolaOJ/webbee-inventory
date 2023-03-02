import React from 'react';
import { View, Text, SafeAreaViewComponent } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaViewComponent>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Webbee App Hello World...</Text>
        </View>
      </SafeAreaViewComponent>
    </SafeAreaProvider>
  );
};

export default App;
