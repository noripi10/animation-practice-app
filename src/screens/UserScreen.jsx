import React, { useState, useContext } from 'react';
import { useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Divider,
  Text,
  Card,
  Title,
  Caption,
  Paragraph,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

const MAX_HEADER_HEIGHT = 150;
const MIN_HEADER_HEIGHT = 80;
const HEADER_SCROLL_RANGE = 100;
const MAX_AVATAR_SIZE = 100;
const MIN_AVATAR_SIZE = 70;
const AVATAR_TOP = MAX_HEADER_HEIGHT - MAX_AVATAR_SIZE / 2;
const DIMENSIONS_WITH_HALF = Dimensions.get('window').width / 2;
const DIMENSIONS_HEIGHT_HALF = Dimensions.get('window').height / 2;

export const UserScreen = () => {
  const { user, setUser } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await new Promise((resolve) => {
                setTimeout(() => {
                  resolve('ok');
                }, 2000);
              });
              setItems([
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
              ]);
              setRefreshing(false);
            }}
          />
        }
      >
        <View style={styles.dummyMarginContainer}></View>
        {items.map((random, index) => (
          // <React.Fragment key={index.toString()}>
          //   <View style={styles.itemContainer}>
          //     <Text>{random}</Text>
          //   </View>
          //   <Divider />
          // </React.Fragment>
          <Card key={index.toString()} style={{ margin: 8 }}>
            <Card.Title title={random} subtitle="Card Subtitle" />
            {/* <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content> */}
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions style={{ justifyContent: 'flex-end' }}>
              <Button
                mode="outlined"
                uppercase={false}
                style={{ marginHorizontal: 20 }}
              >
                Cancel
              </Button>
              <Button mode="outlined" uppercase={false}>
                {`OK`}
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: scrollY.interpolate({
              inputRange: [0, HEADER_SCROLL_RANGE],
              outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
              extrapolate: 'clamp',
            }),
            zIndex: scrollY.interpolate({
              inputRange: [0, HEADER_SCROLL_RANGE],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Image
          source={require('../../assets/sky_00182.jpg')}
          style={{ flex: 1, width: '100%' }}
          resizeMethod="auto"
        />
        <View style={styles.backgroundChangeContainer}>
          <Button mode="text" color="#000">
            背景を変更する
          </Button>
        </View>
      </Animated.View>
      <Animated.Image
        source={{ uri: '123' }}
        style={[
          styles.avatarContainer,
          {
            height: scrollY.interpolate({
              inputRange: [0, HEADER_SCROLL_RANGE],
              outputRange: [MAX_AVATAR_SIZE, MIN_AVATAR_SIZE],
              extrapolate: 'clamp',
            }),
            width: scrollY.interpolate({
              inputRange: [0, HEADER_SCROLL_RANGE],
              outputRange: [MAX_AVATAR_SIZE, MIN_AVATAR_SIZE],
              extrapolate: 'clamp',
            }),
            zIndex: scrollY.interpolate({
              inputRange: [0, HEADER_SCROLL_RANGE],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            top: scrollY.interpolate({
              inputRange: [0, HEADER_SCROLL_RANGE, HEADER_SCROLL_RANGE + 100],
              outputRange: [AVATAR_TOP, AVATAR_TOP - 20, AVATAR_TOP - 100],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: 90,
          marginRight: 10,
        }}
      >
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setUser(null)}
        >
          <FontAwesome name="plane" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
        }}
      >
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => alert(user.name)}
        >
          <FontAwesome name="car" size={24} color={'white'} />
        </TouchableOpacity>
      </View>

      {refreshing && (
        <View style={styles.loadingContainer}>
          <Caption>更新中</Caption>
          <ActivityIndicator animating color={Colors.tealA700} size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dummyMarginContainer: {
    height: MAX_HEADER_HEIGHT,
    marginBottom: 55,
  },
  itemContainer: {
    height: 100,
    margin: 10,
    backgroundColor: '#709fb0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  backgroundChangeContainer: {
    position: 'absolute',
    bottom: 6,
    right: 10,
    backgroundColor: '#ddd',
    opacity: 0.4,
    borderRadius: 3,
  },
  avatarContainer: {
    borderRadius: 100,
    position: 'absolute',
    top: AVATAR_TOP,
    left: 25,
    backgroundColor: '#bbb',
  },
  loadingContainer: {
    position: 'absolute',
    top: DIMENSIONS_HEIGHT_HALF,
    left: DIMENSIONS_WITH_HALF - 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  iconButtonContainer: {},
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tealA700,
    zIndex: 0,
  },
});
