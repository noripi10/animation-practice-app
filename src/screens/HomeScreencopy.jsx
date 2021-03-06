import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-paper';

const WITH_HALF = Dimensions.get('window').width / 2;

export const HomeScreen = ({}) => {
  const [items, setItems] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={{
            width: WITH_HALF * 0.9,
            height: 45,
            justifyContent: 'center',
            backgroundColor: 'lightblue',
            margin: 6,
          }}
          mode="contained"
          uppercase={false}
          onPress={() => setItems([...items, { ID: Math.random() }])}
        >
          Add
        </Button>
        <Button
          style={{
            width: WITH_HALF * 0.9,
            height: 45,
            justifyContent: 'center',
            backgroundColor: 'lightpink',
            margin: 6,
          }}
          mode="contained"
          uppercase={false}
          onPress={() => setItems([])}
        >
          Delete
        </Button>
      </View>
      {items &&
        items.map((item, index) => (
          <View key={index.toString()} style={styles.itemContainer}>
            <Text>{item.ID}</Text>
          </View>
        ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '90%',
    height: 50,
    margin: 10,
    backgroundColor: '#00b894',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
