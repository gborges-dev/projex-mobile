import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, ActivityIndicator, StyleSheet } from "react-native";

import { AuthContext } from "../context/AuthContext";
import { View } from "react-native-animatable";
import MyStack from "../routes/stack";

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext);

    if (isLoading) {
        <View style={styles.containerAI}>
            <ActivityIndicator size={'large'}/>
        </View>
    }

    return (
        <NavigationContainer>
            <StatusBar  backgroundColor="#38A69D" barStyle="light-content"/>
            <MyStack/>
        </NavigationContainer>
    )
    
};

const styles = StyleSheet.create({
    containerAI: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AppNav