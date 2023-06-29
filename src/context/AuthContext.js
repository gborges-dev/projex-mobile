import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState('');
    const [userInfo, setUserInfo] = useState(null)

    const login = (username, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}auth/signin`, {
            username,
            password
        })
        .then(res => {
            let userInfo = res;
            setUserInfo(userInfo);
            setUserToken(userInfo.data.accessToken);

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.data.accessToken);

            console.log(userInfo);
            console.log('User Token: ' + userInfo.data.accessToken);
        })
        .catch(e => {
            console.log(`Erro ao logar: ${e}`)
        });

        setIsLoading(false);
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if ( userInfo ) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }

            setIsLoading(false);

            setUserToken(userToken);
            setIsLoading(false);
        } catch(e) {
            console.log(`Erro ao logar ${e}`)
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}