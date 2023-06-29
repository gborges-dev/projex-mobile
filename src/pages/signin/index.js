import React, {useContext, useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote de ícones instalado


import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../context/AuthContext';

export default function SignIn ({navigation}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('')
    const {login} = useContext(AuthContext);
    // const [secure, setSecure] = useState(props.secure);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>
                    Bem-vindo(a)
                </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Usuário</Text>
                
                <TextInput
                placeholder='Digite seu usuário...'     
                style={styles.input}
                value={user}
                onChangeText={text => setUser(text)}/>
                
                <Text style={styles.title}>Senha</Text>

                <View style={styles.containerSenha}>
                    <TextInput
                      style={styles.inputSenha}
                      placeholder="Digite sua senha"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={text => setPassword(text)}
                    />

                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={togglePasswordVisibility}
                    >
                      <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={24}
                        color="#333"
                      />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={ () => {
                    login(user, password)
                    }}>
                    <Text style={styles.buttonText}>
                       Acessar 
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38a69d'
    },

    containerSenha: {
        flexDirection: 'row',
    },
    
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },

    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },

    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },

    title: {
        fontSize: 20,
        marginTop: 28
    },

    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        width: '100%'
    },

    inputSenha: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        width: '95%'
    },

    button: {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },

    iconContainer: {
      padding: 5
    },
})