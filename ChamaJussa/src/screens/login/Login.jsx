import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginStyle } from "./LoginStyle";
import { api } from "../../services/api";

export const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const fazerLogin = async () => {

        console.log("API:", api.defaults.baseURL);

        if (!email || !senha) {
            Alert.alert(
                "Atenção",
                "Preencha o e-mail e a senha."
            );
            return;
        }

        try {

            // Faz login na API
            const resposta = await api.post("/Usuario/login", {
                email: email,
                senha: senha
            });

            console.log("Resposta da API:", resposta.data);

            // Pega os dados retornados pela API
            const {
                token,
                idUsuario,
                nome,
                email: emailUsuario
            } = resposta.data;

            // Salva os dados no armazenamento
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("idUsuario", idUsuario);
            await AsyncStorage.setItem("nome", nome);
            await AsyncStorage.setItem("email", emailUsuario);

            console.log("Token salvo:", token);
            console.log("Usuário salvo:", nome);
            console.log("ID salvo:", idUsuario);
            console.log("E-mail salvo:", emailUsuario);

            Alert.alert(
                "Sucesso",
                "Login realizado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.replace("ListaOS")
                    }
                ]
            );

        } catch (erro) {

            console.log("ERRO COMPLETO:", erro);
            console.log("Mensagem:", erro.message);
            console.log("Código:", erro.code);
            console.log("Resposta:", erro.response);

            if (erro.response) {

                Alert.alert(
                    "Erro da API",
                    `Status: ${erro.response.status}`
                );

            } else if (erro.request) {

                Alert.alert(
                    "Erro de conexão",
                    "O celular conseguiu iniciar a requisição, mas não recebeu resposta da API."
                );

            } else {

                Alert.alert(
                    "Erro",
                    erro.message
                );
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          

                <View style={LoginStyle.container}>

                    <Image
                        source={require("../../../assets/logo.png")}
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
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={LoginStyle.label}>
                            Senha
                        </Text>

                        <TextInput
                            style={LoginStyle.input}
                            placeholder="Digite sua senha"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <TouchableOpacity
                            style={LoginStyle.button}
                            onPress={fazerLogin}
                        >
                            <Text style={LoginStyle.buttonText}>
                                Acessar o sistema
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>


        </KeyboardAvoidingView>
    );
};