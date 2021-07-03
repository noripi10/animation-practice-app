import React from 'react';
import {
  Animated,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  InteractionManager,
  Dimensions,
} from 'react-native';

const list = [1, 2, 3];
const ROW_HEIGHT = 36;

export const CollapseScreen = () => {
  const elementRefs = React.useRef([]);
  for (let i = 0; i < 3; i++) {
    elementRefs.current[i] = React.createRef();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView pagingEnabled>
        <Collapse headerMessage="Collapse Header 1" headerColor="#d7e05a" list={list} />
        <Collapse headerMessage="Collapse Header 2" headerColor="#ffa4b7" list={list} />
        <Collapse headerMessage="Collapse Header 3" headerColor="#28a1dd" list={list} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Collapse = ({ headerMessage, headerColor = null, list = [] }) => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [toValue, setToValue] = React.useState(1);
  const [toggle, setToggle] = React.useState(false);

  const renderListElements = React.useMemo(() => {
    console.log('rendering!!!');
    return (
      <>
        {list.map((v) => (
          <View key={Math.random().toString()} style={styles.collapseDetailRow}>
            <TouchableOpacity>
              <Text>{v}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </>
    );
  }, [list]);

  const animationStyle = [
    styles.constDetailContainer,
    {
      opacity: animation.interpolate({
        inputRange: [0, 0.3, 0.7, 1],
        outputRange: [0, 0.05, 0.1, 1],
        extrapolate: 'clamp',
      }),
      height: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, ROW_HEIGHT * list.length], //素の高さ＊個数
        extrapolate: 'clamp',
      }),
    },
  ];

  const onToggleAnimation = () => {
    if (toValue === 1) {
      setToggle(true);
    }

    Animated.timing(animation, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    setToValue((prev) => (prev === 0 ? 1 : 0));

    InteractionManager.runAfterInteractions(() => {
      if (toValue === 0) {
        setToggle(false);
      }
    });
  };

  return (
    <View style={styles.collapseContainer}>
      <View style={[styles.collapseHeaderContainer, { backgroundColor: headerColor ?? '#ddd' }]}>
        <TouchableOpacity onPress={onToggleAnimation}>
          <Text style={styles.collapseHeaderText}>{headerMessage}</Text>
        </TouchableOpacity>
      </View>

      {toggle && <Animated.View style={animationStyle}>{renderListElements}</Animated.View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  collapseContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  collapseHeaderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  collapseHeaderText: {
    fontSize: 24,
  },
  constDetailContainer: {
    opacity: 0,
  },
  collapseDetailRow: {
    fontSize: 12,
    backgroundColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: ROW_HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  touch: {},
});
