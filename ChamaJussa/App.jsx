import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "./src/screens/login/Login";
import { ListaOS } from "./src/screens/listaOS/ListaOS";
import { NovaOS } from "./src/screens/novaOS/NovaOS";
import { DetalheOS } from "./src/screens/detalheOS/DetalheOS";
import { EditarOS } from "./src/screens/editarOs/EditarOS";
import { Notificacao } from "./src/screens/notificacao/Notificacao";

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

        <Stack.Screen
          name="DetalheOS"
          component={DetalheOS}
        />

        <Stack.Screen
          name="EditarOS"
          component={EditarOS}
        />

        <Stack.Screen
          name="Notificacao"
          component={Notificacao}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}