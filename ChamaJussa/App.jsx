import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "./src/screens/login/Login";
import { ListaOS } from "./src/screens/listaOS/ListaOS";
import { NovaOS } from "./src/screens/novaOS/NovaOS";

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false
                }}
            >

                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="ListaOS"
                    component={ListaOS}
                />

                <Stack.Screen
                    name="NovaOS"
                    component={NovaOS}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}