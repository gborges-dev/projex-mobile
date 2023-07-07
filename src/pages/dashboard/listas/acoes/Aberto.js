import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import { BASE_URL } from '../../../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import Moment from 'moment';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const AcoesAbertas = () => {
  const [dataAcoesAbertas, setAcoesAbertas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    token();
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
    axios.get(`${BASE_URL}dashboard/acoes/A`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        // Adiciona a propriedade 'collapsed' em cada item
        const data = response.data.conteudo.map(item => ({ ...item, collapsed: true }));
        setAcoesAbertas(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const abreDetalhes = (index) => {
    setAcoesAbertas(prevState => {
      const newData = [...prevState];
      newData[index].collapsed = !newData[index].collapsed;
      return newData;
    });
  };

  useEffect(() => {
    if (!dataAcoesAbertas.length) {
      token();
    }
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
        {dataAcoesAbertas.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>{item.nome}</Text>
              <MaterialCommunityIcons name="message-text" color={'#38a69d'} size={25} />
            </View>
            <Text style={styles.description}>{item.descricao}</Text>
            <TouchableOpacity style={styles.buttonMaisDetalhes} onPress={() => abreDetalhes(index)}>
              <Text style={styles.textMaisDetalhes}>
                {item.collapsed ? "Mais detalhes" : "Menos detalhes"}
              </Text>
            </TouchableOpacity>
            <Collapsible collapsed={item.collapsed} style={styles.collapsible}>
              <View style={styles.containerDatas}>
                <Text style={styles.date}>Data Prev. de Início: </Text>
                <Text style={styles.dateText}>{Moment(item.data_previsao_inicio).format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.containerDatas}>
                <Text style={styles.date}>Data de Início: </Text>
                <Text style={styles.dateText}>{Moment(item.data_inicio).format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.containerDatas}>
                <Text style={styles.date}>Data Prev. de Conclusão: </Text>
                <Text style={styles.dateText}>{Moment(item.data_previsao_fim).format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.containerDatas}>
                <Text style={styles.date}>Data de Conclusão: </Text>
                <Text style={styles.dateText}>{Moment(item.data_fim).format('DD/MM/YYYY')}</Text>
              </View>
            </Collapsible>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

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
    width: width - 32
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
    textAlign: 'left'
  },
  description: {
    marginBottom: 8,
    color: '#666666',
  },
  date: {
    marginBottom: 4,
    color: '#999999'  
  },
  dateText: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  status: {
    fontWeight: 'bold',
    color: '#55BB55',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#D4D7DB',
    borderBottomWidth: 1,
    marginBottom: 5
  },
  buttonMaisDetalhes: {
    marginBottom: 5,
  },
  textMaisDetalhes: {
    color: '#38a69d',
    fontWeight: 'bold'
  },
  containerDatas: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  collapsible: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderColor: '#D4D7DB'
  }
});

export default AcoesAbertas;