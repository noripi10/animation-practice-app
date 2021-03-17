import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

export const TouchIcon = ({ name, size, color, ...anotherProps }) => {
  return (
    <TouchableOpacity {...anotherProps}>
      <FontAwesome name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export const TouchAntIcon = ({ name, size, color, ...anotherProps }) => {
  return (
    <TouchableOpacity {...anotherProps}>
      <AntDesign name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});
