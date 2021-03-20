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
} from 'react-native';
import { Text, Card, Title, Paragraph, Snackbar, Colors, Button } from 'react-native-paper';

// nativeDriverの設定をoffにしないと警告発生
// must be false (https://github.com/facebook/react-native/issues/13377)

const WINDOW = Dimensions.get('window');
const CARD_WIDTH = WINDOW.width * 0.7;
const CARD_HEIGHT = WINDOW.height * 0.5;
const MAX_DISPLAY_MOVE_X = WINDOW.width / 2 - CARD_WIDTH / 2;
const MAX_DISPLAY_MOVE_Y = WINDOW.height / 2 - CARD_HEIGHT / 2;

export const TouchControlScreen = ({}) => {
  const [showMessage, setSetShowMessage] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
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

      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        duration: 3000,
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
            source={{ uri: 'https://picsum.photos/700' }}
            resizeMethod="auto"
            style={{ flex: 1 }}
          />
          <Card.Actions>
            <Button>OK</Button>
            <Button>Cancel</Button>
          </Card.Actions>
        </Card>
      </Animated.View>
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
