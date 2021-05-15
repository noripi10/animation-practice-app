import React, { useContext, useLayoutEffect, useRef } from 'react';
import { View, StyleSheet, Animated, InteractionManager } from 'react-native';
import { Text, Button, Colors } from 'react-native-paper';
import { useNavigation, getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';

export const WelcomeScreen = ({}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const { setUser } = useContext(AppContext);
  const navigation = useNavigation();
  const route = useRoute();

  const loginHandler = () => {
    Animated.timing(animation, {
      duration: 1500,
      toValue: 1,
      useNativeDriver: false,
    }).start();
    InteractionManager.runAfterInteractions(() => {
      setUser({ name: 'sugiyama' });
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'アニメーションデモアプリ',
    });
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Animated.View
          style={{
            transform: [
              {
                rotateZ: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0rad', '10rad'],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <Button
            style={{ padding: 3 }}
            color={Colors.blueA700}
            uppercase={false}
            mode="contained"
            onPress={loginHandler}
          >
            AppTabNavigatorへ移動
          </Button>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
