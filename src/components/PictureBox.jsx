import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from 'react-native-paper';
import { TouchAntIcon } from './TouchIcon';

export const PictureBox = ({ photo, deletePhoto }) => {
  return (
    <View style={styles.pictureBox}>
      <Image style={styles.image} resizeMethod="auto" source={{ uri: photo.uri }} />
      <View style={styles.deleteButton}>
        <TouchAntIcon name="close" size={36} color={Colors.red600} onPress={() => deletePhoto(photo.id)} />
      </View>
    </View>
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
    top: 0,
    right: 0,
  },
});
