import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { Button, Colors, Modal as PaperModal, Text } from 'react-native-paper';
import { Camera, PermissionStatus } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { useBoolean } from '../hooks/useBoolean';
import { TouchIcon } from '../components/TouchIcon';
import { PictureBox } from '../components/PictureBox';

export const CameraScreen = ({}) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pictures, setPictures] = useState([]);

  const refCamera = useRef(null);

  const cameraOpen = async () => {
    const { status } = await Camera.getPermissionsAsync();
    if (status === PermissionStatus.GRANTED) {
      setOpen(true);
    } else {
      const { status: askStatus } = await Camera.requestPermissionsAsync();
      if (askStatus === PermissionStatus.GRANTED) {
        setOpen(true);
      } else {
        Alert.alert('カメラを使用できません\nアプリ設定からカメラの使用許可設定を行って下さい');
      }
    }
  };

  const takePictureHandler = async () => {
    try {
      const photo = await refCamera.current.takePictureAsync();
      setPictures([...pictures, { ...photo, id: Math.random().toString() }]);
    } catch (error) {
      console.log(error);
      alert('写真撮影に失敗しました');
    }
  };

  const deletePhotoHandler = (id) => {
    const newPictures = pictures.filter((picture) => picture.id !== id) || [];
    setPictures(newPictures);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <FlatList
          data={pictures}
          renderItem={({ item }) => <PictureBox photo={item} deletePhoto={deletePhotoHandler} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button icon="camera" mode="contained" color={Colors.black} onPress={cameraOpen}>
          カメラ起動
        </Button>
      </View>
      <PaperModal
        visible={open}
        onDismiss={() => setOpen((prev) => !prev)}
        contentContainerStyle={styles.modalContainer}
      >
        <Camera ref={refCamera} style={styles.camera}>
          <View style={styles.pictureListContainer}>
            <FlatList
              data={pictures}
              renderItem={({ item }) => <PictureBox photo={item} deletePhoto={deletePhotoHandler} />}
              keyExtractor={(item) => item.id}
              horizontal
            />
          </View>
          <View style={styles.closeButton}>
            <TouchIcon name="close" size={46} color={Colors.red300} onPress={() => setOpen(false)} />
          </View>
          <TouchIcon name="circle-o" size={46} color={Colors.teal400} onPress={takePictureHandler} />
        </Camera>
      </PaperModal>
    </SafeAreaView>
  );
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 8,
    backgroundColor: '#ddd',
  },
  footerContainer: {
    flex: 2,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.lightBlue200,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  pictureListContainer: {
    width: window.width,
  },
});
