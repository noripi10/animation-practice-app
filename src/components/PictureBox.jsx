import React, { useRef } from 'react';
import { Animated, View, StyleSheet, Image, InteractionManager } from 'react-native';
import { Colors } from 'react-native-paper';
import { TouchAntIcon } from './TouchIcon';

export const PictureBox = ({ photo, deletePhoto }) => {
  const animationOpacity = useRef(new Animated.Value(1)).current;
  return (
    <Animated.View style={[styles.pictureBox, { opacity: animationOpacity }]}>
      <Image style={styles.image} resizeMethod="auto" source={{ uri: photo.uri }} />
      <View style={styles.deleteButton}>
        <TouchAntIcon
          name="close"
          size={24}
          color={Colors.red600}
          onPress={() => {
            Animated.timing(animationOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }).start();

            InteractionManager.runAfterInteractions(() => deletePhoto(photo.id));
          }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pictureBox: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 85,
    height: 85,
    backgroundColor: Colors.teal50,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 3,
    right: 3,
  },
});
