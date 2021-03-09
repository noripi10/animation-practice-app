import React from 'react';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

import { TouchControlScreen } from '../screens/TouchControlScreen';
import { UserScreen } from '../screens/UserScreen';
import { ViewTransportScreen } from '../screens/ViewTransportScreen';

const Tab = createBottomTabNavigator();

export const AppTabNavigator = () => {
  const { user } = useContext(AppContext);

  return (
    <Tab.Navigator
      initialRouteName="User"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'TouchHandle':
              iconName = 'hand-o-up';
              break;
            case 'User':
              iconName = 'user';
              break;
            default:
              iconName = 'transgender-alt';
              break;
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        title: route.name === 'User' ? user.name : route.name,
      })}
    >
      <Tab.Screen name="TouchHandle" component={TouchControlScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Transport" component={ViewTransportScreen} />
    </Tab.Navigator>
  );
};
