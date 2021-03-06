import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { AppProvider } from './src/context/AppContext';
import { Router } from './src/navigation/Router';

export default function App() {
  return (
    <AppearanceProvider>
      <AppProvider>
        <Router />
      </AppProvider>
    </AppearanceProvider>
  );
}
