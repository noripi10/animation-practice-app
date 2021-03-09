import React from 'react';
import { useState } from 'react/cjs/react.development';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { useEffect } from 'react';

export const ViewTransportScreen = () => {
  const [degX, setDegX] = useState(0);
  const [degY, setDegY] = useState(0);
  const [degZ, setDegZ] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDegZ((z) => (z === 10 ? 0 : z + 1));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={360}
        minimumTrackTintColor="lightgreen"
        maximumTrackTintColor="#eee"
        step={1}
        value={degX}
        onValueChange={(val) => setDegX(val)}
      />
      <Text>{`X:${degX}`}</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={360}
        minimumTrackTintColor="lightblue"
        maximumTrackTintColor="#eee"
        step={1}
        value={degY}
        onValueChange={(val) => setDegY(val)}
      />
      <Text>{`Y:${degY}`}</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="lightpink"
        maximumTrackTintColor="#eee"
        step={1}
        value={degZ}
        onValueChange={(val) => setDegZ(val)}
      />
      <Text>{`Z:${degZ}`}</Text>

      <LinearGradient colors={['blue', 'yellow', 'red']} style={styles.box} />
      <LinearGradient
        colors={['blue', 'yellow', 'red']}
        style={[
          styles.box,
          {
            transform: [
              { rotateX: degX.toString() + 'deg' },
              { rotateY: degY.toString() + 'deg' },
              { rotateZ: degZ.toString() + 'rad' },
            ],
          },
        ]}
        // start={{ x: 0, y: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    // backgroundColor: 'lightyellow',
    borderRadius: 16,
    margin: 8,
  },
});
