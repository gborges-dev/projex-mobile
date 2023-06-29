import React, { useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native-animatable";
import { Dimensions, Pressable, StyleSheet, Text, Modal, RefreshControl, TouchableOpacity, ScrollView } from "react-native";

import axios from 'axios';

import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config";
import AcoesAbertas from "./listas/acoes/Aberto";

const Tab = createBottomTabNavigator();

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [acoes, setAcoes] = useState({});
  const [projetos, setProjetos] = useState({});
  const [showModal, setShowModal] = useState(false);
  
  const token = async () => {
    try {
      AsyncStorage.getItem('userToken', (err, result) => {
        getDadosDashboard(result)
      })
    } catch (e) {
      console.log(e)
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getDadosDashboard = (token) => {
    axios.get(`${BASE_URL}dashboard/`, { headers: {Authorization: `Bearer ${token}` } })
    .then(response => {
      setAcoes(response.data.acoes)
      setProjetos(response.data.projetos)
    })
    .catch(error => {
      console.error(error);
    });
  }

    useEffect(() => {
      token()
    }, []);

    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={styles.containerPai}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={showModal}
          style={styles.containerModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modal}>
              <Text style={styles.titleModal}>Lista de ações abertas</Text>
              <AcoesAbertas style={styles.containerListaModal}/>
              <TouchableOpacity style={styles.button} onPress={() => { setShowModal(!showModal); }}>
                <Text style={styles.buttonText}>
                   Fechar 
                </Text>
              </TouchableOpacity>
          </View>
        </Modal>

        <Animatable.View animation="fadeInDown" delay={200}  style={styles.containerMae}>
        <Text style={styles.title}>Dashboard</Text>
        </Animatable.View>
         <View style={styles.container}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerCardsAcoes}>
            <Text style={styles.label}>Ações</Text>
            <Pressable onPress= {() => setShowModal(!showModal)}>
               <View style={styles.card}>
                 <Text style={styles.labelCard}>Abertos</Text>
                 <Text style={styles.text}>{acoes.Aberto}</Text>
               </View>
            </Pressable>
           
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
      </ScrollView>

    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'flex-end'
  },
  titleModal: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10
  },
  containerMae: {
    backgroundColor: '#38a69d',
    height: 80,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerPai: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flex: 1,
    width: '100%'
  },
  containerCardsAcoes: {
    flex: 1,
    backgroundColor: '#38a69d',
    padding: 5,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center'
  },
  containerCardsProjetos: {
    flex: 1,
    backgroundColor: '#38a69d',
    padding: 5,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: '100%'
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
  },
  modal: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 25,
    flex: 1,
    backgroundColor: '#38a69d'
  },
  textModal: {
    color: '#3f2949',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15
  },
  button: {
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14
  },
  containerListaModal: {
    borderRadius: 25,
    backgroundColor: 'red'
  },
  containerModal: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red'
  }
});

export default Dashboard;