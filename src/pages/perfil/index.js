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
    obterPermissao();
  }, []);

  const {logout} = useContext(AuthContext);
  const [imageUri, setImageUri] = useState();
  const [userDatails, setUserDatails] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const getUserDatails = async () => {
    AsyncStorage.getItem('userInfo', (err, result) => {
      console.log(JSON.parse(result).data.username)
      setUserDatails(JSON.parse(result).data)
    })
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const obterPermissao = async () => {
    const {granted} = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      alert('Você precisa dar permissão!')
    }
  };

  const obterImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if(!result.canceled){
      setImageUri(result.uri)
    }
  };
  
  return (
    <Animatable.View animation="fadeInLeft" delay={500} style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Perfil</Text>
      </View>
      <View style={styles.containerImage}>
        {imageUri && <Image source={{uri: imageUri}} style={styles.image}/> ||
        <TouchableOpacity
          onPress={ () => obterImage()}>
            <MaterialCommunityIcons name="image-edit-outline" color={'#38a69d'} size={50}/>
        </TouchableOpacity>}
      </View>
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
    marginBottom: 150,
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