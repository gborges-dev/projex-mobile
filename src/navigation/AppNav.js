import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet } from "react-native";

import { AuthContext } from "../context/AuthContext";
import { View } from "react-native-animatable";
import MyStack from "../routes/stack";
import Routes from "../routes/tabs/Index";

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={styles.containerAI}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    };
    return (
        <NavigationContainer>
            { userToken != null ? <Routes/> : <MyStack/> }
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