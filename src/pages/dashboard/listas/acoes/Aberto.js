import React, { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { BASE_URL } from '../../../../config';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const AcoesAbertas = () => {
    const [dataAcoesAbertas, setAcoesAbertas] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        token()
        wait(2000).then(() => setRefreshing(false));
      }, []);

    const token = async () => {
        try {
          AsyncStorage.getItem('userToken', (err, result) => {
            getDadosAcoesAbertas(result)
          })
        } catch (e) {
          console.log(e)
        }
    };

    const getDadosAcoesAbertas = (token) => {
        axios.get(`${BASE_URL}dashboard/acoes/A`, { headers: {Authorization: `Bearer ${token}` } })
        .then(response => {
            setAcoesAbertas(response.data.conteudo)
        })
        .catch(error => {
          console.error(error);
        });
    };

    useEffect(() => {
        if (!dataAcoesAbertas.x) {
            token();           
          };
    }, []);

    return (
        <ScrollView 
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
        <View style={styles.container}>
            {dataAcoesAbertas.map(item => (
               <View key={item.id} style={styles.card}>
                 <Text style={styles.title}>{item.nome}</Text>
                 <Text style={styles.description}>{item.descricao}</Text>
                 <Text style={styles.date}>Data Prevista de Início: {item.data_previsao_inicio}</Text>
                 <Text style={styles.date}>Data de Início: {item.data_inicio}</Text>
                 <Text style={styles.date}>Data Prevista de Conclusão: {item.data_previsao_fim}</Text>
                 <Text style={styles.date}>Data de Conclusão: {item.data_fim}</Text>
                 <Text style={styles.status}>Status: {item.status}</Text>
          </View>
        ))}
      </View>
        </ScrollView>
      
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#38a69d',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
    textAlign: 'center'
  },
  description: {
    marginBottom: 8,
    color: '#666666',
  },
  date: {
    marginBottom: 4,
    color: '#999999',
  },
  status: {
    fontWeight: 'bold',
    color: '#55BB55',
  },
});

export default AcoesAbertas;