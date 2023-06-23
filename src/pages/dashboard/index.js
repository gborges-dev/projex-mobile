import React, { useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as Animatable from 'react-native-animatable';
import { View } from "react-native-animatable";
import { Dimensions, FlatList, StyleSheet, Text } from "react-native";

const Tab = createBottomTabNavigator();


export default function Dashboard() {
    const [dashboard, setDashboard] = useState('');
    const axios = require('axios').default;
    useEffect(() => {    
      axios.get(`http://localhost:8080/api/dashboard/`)
      .then(response => {
        debugger
      })
      .catch(error => {
        console.error(error);
      });
    });

    const projetos = [{
        numero: 12345,
        nome: 'Projeto: Menos lixos nas ruas',
        status: 'Finalizado'
    }]

    const renderProjetos = ({ item }) => (
        <View style={styles.card}>
          <Text style={styles.label}>Nº:</Text>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.text}>{item.nome}</Text>
          <View>
                <Text>
                    {item.status}
                </Text>
          </View>
        </View>
      );

      return (
        <View style={styles.container}>
          <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>
                    Listagem de projetos cadastrados
                </Text>
            </Animatable.View>
          <FlatList
            data={projetos}
            renderItem={renderProjetos}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.cardList}
          />
        </View>
      );

};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#38a69d'
  },
  containerHeader: {
    marginTop: '5%',
    marginBottom: '5%',
    paddingStart: '5%'
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderRadius: 10,
  },
  cardList: {
    width: 350,
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 15
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
    width: 320,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});