import React, { useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native-animatable";
import { Dimensions, StyleSheet, Text } from "react-native";

import axios from 'axios';

import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const [acoes, setAcoes] = useState({});
  const [projetos, setProjetos] = useState({});
  const [token, setToken] = useState('');

  //UTILIZAR O ASYNCSTORAGE QUANDO FOR UTILIZAR O CELULAR PARA CONSUMIR A API
  
    useEffect(() => {
      axios.get('http://localhost:8080/api/dashboard/', { headers: {'Authorization': `Bearer ${localStorage.userToken}` } })
      .then(response => {
        setAcoes(response.data.acoes)
        setProjetos(response.data.projetos)
      })
      .catch(error => {
        console.error(error);
      });
    }, []);

    return (
      <View style={styles.containerPai}>
        <View style={styles.containerMae}>
        <Text style={styles.title}>Dashboard</Text>
        </View>
         <View style={styles.container}>
           <Animatable.View animation="fadeInUp" delay={500} style={styles.containerCardsAcoes}>
           <Text style={styles.label}>Ações</Text>
           <View style={styles.card}>
               <Text style={styles.labelCard}>Abertos</Text>
               <Text style={styles.text}>{acoes.Aberto}</Text>
             </View>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Cancelados</Text>
               <Text style={styles.text}>{acoes.Cancelado}</Text>
             </View>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Finalizados</Text>
               <Text style={styles.text}>{acoes.Finalizado}</Text>
             </View>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Iniciados</Text>
               <Text style={styles.text}>{acoes.Iniciado}</Text>
             </View>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Pausados</Text>
               <Text style={styles.text}>{acoes.Pausado}</Text>
             </View>
           </Animatable.View>

           <Animatable.View animation="fadeInUp" delay={500} style={styles.containerCardsProjetos}>
           <Text style={styles.label}>Projetos</Text>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Abertos</Text>
               <Text style={styles.text}>{projetos.Aberto}</Text>
             </View>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Cancelados</Text>
               <Text style={styles.text}>{projetos.Cancelado}</Text>
             </View>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Finalizados</Text>
               <Text style={styles.text}>{projetos.Finalizado}</Text>
             </View>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Iniciados</Text>
               <Text style={styles.text}>{projetos.Iniciado}</Text>
             </View>
             <View style={styles.card}>
               <Text style={styles.labelCard}>Pausados</Text>
               <Text style={styles.text}>{projetos.Pausado}</Text>
             </View>
           </Animatable.View>
         </View>
        </View>

    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#38a69d'
  },
  containerMae: {
    backgroundColor: '#fff',
    height: 80,
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  containerPai: {
    flex: 1
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flex: 1
  },
  containerCardsAcoes: {
    backgroundColor: '#38a69d',
    padding: 5,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    borderTopLeftRadius: 25
  },
  containerCardsProjetos: {
    flex: 1,
    backgroundColor: '#38a69d',
    padding: 5,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: '100%',
    borderTopRightRadius: 25
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
    width: width - 250,
    alignSelf: 'center',
    alignItems: 'center',
    margin: 10
  },
  
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  label: {
   fontSize: 25,
   color: '#fff',
   fontWeight: 'bold',
   marginTop: 25
  },

  labelCard: {
   fontSize: 15,
   fontWeight: 'bold',
   color: 'black'
  }
});

export default Dashboard;