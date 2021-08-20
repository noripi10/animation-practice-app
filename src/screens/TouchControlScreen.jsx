import React from 'react';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';
import { useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  PanResponder,
  InteractionManager,
  View,
} from 'react-native';
import { Text, Card, Title, Paragraph, Snackbar, Colors, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { useBoolean } from '../hooks/useBoolean';

// nativeDriverの設定をoffにしないと警告発生
// must be false (https://github.com/facebook/react-native/issues/13377)

const WINDOW = Dimensions.get('window');
const CARD_WIDTH = WINDOW.width * 0.7;
const CARD_HEIGHT = WINDOW.height * 0.5;
const MAX_DISPLAY_MOVE_X = WINDOW.width / 2 - CARD_WIDTH / 2;
const MAX_DISPLAY_MOVE_Y = WINDOW.height / 2 - CARD_HEIGHT / 2;

export const TouchControlScreen = ({}) => {
  const [mediaPermission, setMediaPermission] = useState(false);
  const [image, setImage] = useState('https://picsum.photos/700');

  const [value, controller] = useBoolean(false);

  const [showMessage, setSetShowMessage] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const func = async () => {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        setMediaPermission(true);
        return true;
      } else {
        const { status: askStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (askStatus === 'granted') {
          setMediaPermission(true);
          return true;
        }
      }
      setMediaPermission(false);
    };

    func();

    const listenerId = pan.addListener((e) => {
      if (!showMessage && Math.abs(e.x) >= MAX_DISPLAY_MOVE_X) {
        // 画面いっぱいに動かした時のアクション
        // setSetShowMessage(true);
      }
    });
    return () => {
      listenerId && pan.removeListener(listenerId);
    };
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      // console.log({ gestureState });

      // reset
      // pan.setValue({ x: 0, y: 0 });

      // const { dx, dy } = gestureState;
      // pan.setValue({ x: dx, y: dy });

      Animated.timing(pan, {
        toValue: { x: 0, y: 0 },
        duration: 200,
        useNativeDriver: false,
      }).start();

      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        friction: 1,
        tension: 2,
        useNativeDriver: false,
      }).start();

      // InteractionManager.runAfterInteractions(() => {
      //   console.log('move end');
      // });
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.animatedContainer]}
      >
        <Card style={styles.card}>
          <Card.Content style={styles.boxContent}>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover
            source={{ uri: image }}
            resizeMethod="auto"
            style={{ flex: 1 }}
            accessible={true}
            accessibilityLabel="test picture"
          />
          <Card.Actions>
            <Button>OK</Button>
            <Button>Cancel</Button>
          </Card.Actions>
        </Card>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: 36,
          left: 36,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#74a6f1',
            width: 100,
            height: 100,
            borderRadius: 50,
            marginHorizontal: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            controller.toggle();
            alert(value.toString());
          }}
        >
          <Text>Bool切替ボタン</Text>
        </TouchableOpacity>
        {mediaPermission && (
          <TouchableOpacity
            style={{
              backgroundColor: '#74a6f1',
              width: 100,
              height: 100,
              borderRadius: 50,
              marginHorizontal: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={async () => {
              const { uri, cancelled } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // base64: true,
              });
              if (!!!cancelled) {
                setImage(uri);
              }
            }}
          >
            <Text>写真選択</Text>
          </TouchableOpacity>
        )}
      </View>
      <Snackbar
        visible={showMessage}
        onDismiss={() => setSetShowMessage(false)}
        duration={3000}
        style={{ backgroundColor: Colors.deepPurple400 }}
      >
        <Text>境界に達しました</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {},
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  boxContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
