import React, { useCallback, useContext, useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native-animatable";
import { Image, StyleSheet, Text, TouchableOpacity, RefreshControl } from "react-native";

import { AuthContext } from "../../context/AuthContext";

import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Animatable from 'react-native-animatable';

const Tab = createBottomTabNavigator();

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Perfil = () => {
  useEffect(() => {
    if (!userDatails.x) {
      getUserDatails();
     
    };

    
    getImagePerfil();
    
    obterPermissao();
  }, []);

  const {logout} = useContext(AuthContext);
  const [image, setImage] = useState();
  const [userDatails, setUserDatails] = useState({});

  const getUserDatails = async () => {
    AsyncStorage.getItem('userInfo', (err, result) => {
      console.log(JSON.parse(result).data.username)
      setUserDatails(JSON.parse(result).data)
    })
  };

  const getImagePerfil = async () => {
    AsyncStorage.getItem('imagePerfil', (err, result) => {
      setImage(result)
    })
  };

  const obterPermissao = async () => {
    const {granted} = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      alert('Você precisa da permissão para alterar a imagem de perfil.')
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      AsyncStorage.setItem('imagePerfil', result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };
  
  return (
    <Animatable.View animation="fadeInLeft" delay={500} style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Perfil</Text>
      </View>
      <View style={styles.containerImage}>
        {image && <Image source={{uri: image}} style={styles.image}/> ||
        <TouchableOpacity
          onPress={pickImage}>
            <MaterialCommunityIcons name="image-edit-outline" color={'#38a69d'} size={50}/>
        </TouchableOpacity> }
      </View>
      {image &&
        <TouchableOpacity
          onPress={pickImage}>
            <MaterialCommunityIcons name="image-edit-outline" color={'#fff'} size={30}/>
        </TouchableOpacity> }
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{userDatails.username}</Text>
        <Text style={styles.email}>{userDatails.email}</Text>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={ () => { logout() }}>
        <Text style={styles.buttonText}>
            Sair
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerTitle: {
    backgroundColor: '#38a69d',
    textAlign: 'center',
    marginTop: 40
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#38a69d',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 150,
    marginBottom: 125,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderRadius: 15
  },
  containerImage: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  infoContainer: {
    marginTop: 30,
    alignItems: 'center',
    color: '#fff'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    color: '#fff'
  },
  button: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 8,
    width: '38%',
    alignSelf: 'center',
    bottom: '2%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#38a69d'
  }
});

export default Perfil;