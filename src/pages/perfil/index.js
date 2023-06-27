import React, { useContext, useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native-animatable";
import { Image, StyleSheet, Text } from "react-native";

import { TouchableOpacity } from "react-native-web";

import { AuthContext } from "../../context/AuthContext";

import * as ImagePicker from 'expo-image-picker';

const Tab = createBottomTabNavigator();

const Perfil = () => {
  const {logout} = useContext(AuthContext);

  const userDatails = JSON.parse(localStorage.userInfo);

  const obterPermissao = async () => {
    const {granted} = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      alert('Você precisa dar permissão!')
    }
  }

  useEffect(() => {
    obterPermissao()
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Perfil</Text>
      </View>
      <View style={styles.containerImage}>
          <Image source={require("../../../assets/5907.jpg")} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{userDatails.data.username}</Text>
        <Text style={styles.email}>{userDatails.data.email}</Text>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={ () => { logout() }}>
        <Text style={styles.buttonText}>
            Sair
        </Text>
      </TouchableOpacity>
    </View>
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
    bottom: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#38a69d'
  }
});

export default Perfil;