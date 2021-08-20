import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const data = [...Array(99).keys()].map((val) => Math.floor(Math.random() * val * 100));

export const FlatListScreen = ({}) => {
  const flatListRef = useRef();
  const [visible, setVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const _renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.renderItemContainer}>
        <Text>{item}</Text>
      </View>
    );
  }, []);

  const _keyExtractor = useCallback((item) => item.toString(), []);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      // console.log(value, visible);
      if (value > 100 && !visible) {
        setVisible(true);
      } else if (value <= 100 && visible) {
        setVisible(false);
      }
    });

    return () => {
      scrollY.removeAllListeners();
    };
  }, [visible]);

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        style={{ flex: 1, marginVertical: 2 }}
        data={data}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
        ListHeaderComponent={() => (
          <View style={styles.listHeaderContainer}>
            <Text style={styles.listHeaderText}>test</Text>
          </View>
        )}
        numColumns={4}
        showsVerticalScrollIndicator={false}
      />

      <Animated.View
        style={{
          position: 'absolute',
          bottom: 150,
          right: 40,
          opacity: scrollY.interpolate({
            inputRange: [0, 100, 120],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
          }),
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'lightblue',
            width: 60,
            height: 60,
            borderRadius: 999,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
            setVisible(false);
          }}
        >
          <Text>戻る</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 120,
  },
  listHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginHorizontal: 10,
    paddingBottom: 8,
    borderRadius: 4,
    backgroundColor: '#3b7c5c',
  },
  listHeaderText: {
    color: 'white',
  },
  renderItemContainer: {
    // flex: 1,
    width: '22.5%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
    padding: 16,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 4,
  },
});
