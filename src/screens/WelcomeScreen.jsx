import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';

export const WelcomeScreen = ({}) => {
  const { setUser } = useContext(AppContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Button
          uppercase={false}
          mode="contained"
          onPress={() => setUser({ name: 'sugiyama' })}
        >
          AppTabNavigatorへ移動
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
