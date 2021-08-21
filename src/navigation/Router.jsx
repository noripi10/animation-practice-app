import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import { AppContext } from '../context/AppContext';

import { AppTabNavigator } from './AppTabNavigator';
import { AuthStackNavigator } from './AuthStackNavigator';

const MergeDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};
const MergeDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};

const initialRequest = new Promise((resolve, reject) => {
  try {
    setTimeout(() => {
      resolve('reading finish');
    }, 3000);
  } catch (error) {
    reject(error);
  }
});

const createResource = (pending) => {
  let error, response;

  pending
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      error = e;
    });

  return {
    read() {
      if (error) throw error;
      if (response) return response;
      throw pending;
    },
  };
};

const resource = createResource(initialRequest);

export const Router = () => {
  resource.read();

  const { user } = useContext(AppContext);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? MergeDarkTheme : MergeDefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {!user ? <AuthStackNavigator /> : <AppTabNavigator />}
      </NavigationContainer>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </PaperProvider>
  );
};
