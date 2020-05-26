import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import AttendanceScreen from './Screens/AttendanceScreen';
import VerificationScreen from './Screens/VerificationScreen';

export default function App() {
  return (
    <View>
      <AppContainer/>
    </View>
  );
}

var AppNavigator = createSwitchNavigator({
  AttendanceScreen : AttendanceScreen,
  VerificationScreen : VerificationScreen
});

const AppContainer = createAppContainer(AppNavigator);