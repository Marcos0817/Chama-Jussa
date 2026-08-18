import React from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";

import { LoginStyle } from "./LoginStyle";

export const Login = () => {
    return (
        <View style={LoginStyle.container}>

            <Image
                source={require("../../../assets/logo.svg")}
                style={LoginStyle.logo}
            />

            <View style={LoginStyle.loginBox}>

                <Text style={LoginStyle.title}>
                    Chama Jussa
                </Text>

                <Text style={LoginStyle.subtitle}>
                    Gerenciamento de Ordens de Serviço
                </Text>

                <Text style={LoginStyle.label}>
                    E-mail
                </Text>

                <TextInput
                    style={LoginStyle.input}
                    placeholder="email@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={LoginStyle.label}>
                    Senha
                </Text>

                <TextInput
                    style={LoginStyle.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                />

                <TouchableOpacity style={LoginStyle.button}>
                    <Text style={LoginStyle.buttonText}>
                        Acessar o sistema
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};