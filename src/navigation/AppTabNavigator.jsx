import React from 'react';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

import { TouchControlScreen } from '../screens/TouchControlScreen';
import { UserScreen } from '../screens/UserScreen';
import { ViewTransportScreen } from '../screens/ViewTransportScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { CollapseScreen } from '../screens/CollapseScreen';
import { View, StyleSheet } from 'react-native';
import { FlatListScreen } from '../screens/FlatListScreen';
import { FlatListScreen2 } from '../screens/FlatListScreen2';

const Tab = createBottomTabNavigator();

export const AppTabNavigator = () => {
  const { user } = useContext(AppContext);

  return (
    <Tab.Navigator
      initialRouteName='Flat'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'TouchHandle':
              iconName = 'hand-o-up';
              break;
            case 'User1':
              iconName = 'user';
              break;
            case 'User2':
              iconName = 'user-o';
              break;
            case 'Camera':
              iconName = 'camera';
              break;
            case 'Transport':
              iconName = 'transgender-alt';
              break;
            case 'Flat':
              iconName = 'list';
              break;
            default:
              iconName = 'code';
              break;
          }

          return (
            <View style={iconName === 'camera' ? styles.centerIcon : null}>
              <FontAwesome name={iconName} size={iconName === 'camera' ? 32 : size} color={color} />
            </View>
          );
        },
        title: route.name === 'User' ? user.name : route.name,
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 36,
          left: 16,
          right: 16,
          elevation: 0,
          borderRadius: 16,
          // backgroundColor: 'white',
          height: 70,
          paddingTop: 0,
          paddingBottom: 0,
          // marginBottom: 0,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen name='TouchHandle' component={TouchControlScreen} />
      <Tab.Screen name='Transport' component={ViewTransportScreen} />
      <Tab.Screen name='Flat' component={FlatListScreen2} />
      <Tab.Screen name='Camera' component={CameraScreen} />
      <Tab.Screen name='Collapse' component={CollapseScreen} />
      <Tab.Screen name='User1' component={UserScreen} />
      <Tab.Screen name='User2' component={UserScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  centerIcon: {
    top: -10,
    backgroundColor: 'rgba(0,0,255,0.8)',
    // margin: 16,
    padding: 16,
    borderRadius: 33,
    width: 66,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
