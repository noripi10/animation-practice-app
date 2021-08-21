import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, Suspense } from 'react';
import { View, Text } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { AppProvider } from './src/context/AppContext';
import { Router } from './src/navigation/Router';
import * as SplashScreen from 'expo-splash-screen';
import ErrorBoundary from './src/components/ErrorBoundary';

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>loading</Text>
    </View>
  );
};

export default function App() {
  // const [loading, setLoading] = useState(true);

  // const loadingFunc = async () => {
  //   await SplashScreen.preventAutoHideAsync();

  //   const eventList = [
  //     (async () => {
  //       return await new Promise((resolve) => {
  //         setTimeout(() => {
  //           resolve('OK1');
  //         }, 5000);
  //       });
  //     })(),
  //     (async () => {
  //       return await new Promise((resolve) => {
  //         setTimeout(() => {
  //           resolve('OK2');
  //         }, 1000);
  //       });
  //     })(),
  //   ];

  //   return Promise.all(eventList);
  // };

  // useEffect(() => {
  //   // loadingFunc().then((result) => {
  //   //   console.log({ result });
  //   //   setLoading(false);
  //   // });
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     SplashScreen.hideAsync().then((res) => console.log({ res }));
  //   }
  // }, [loading]);

  return (
    <AppearanceProvider>
      {/* {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>loading</Text>
        </View>
      ) : ( */}
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <AppProvider>
            <Router />
          </AppProvider>
        </ErrorBoundary>
      </Suspense>
      {/* )} */}
    </AppearanceProvider>
  );
}
