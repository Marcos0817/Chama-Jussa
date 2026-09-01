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
    Platform,
    Keyboard,
    ActivityIndicator
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginStyle } from "./LoginStyle";
import { api } from "../../services/api";


export const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [carregando, setCarregando] = useState(false);


    // =====================================================
    // FAZER LOGIN
    // =====================================================

    const fazerLogin = async () => {

        Keyboard.dismiss();

        console.log("API:", api.defaults.baseURL);


        // =================================================
        // VALIDAR CAMPOS
        // =================================================

        if (!email || !senha) {

            Alert.alert(
                "Atenção",
                "Preencha o e-mail e a senha."
            );

            return;
        }


        // =================================================
        // INICIA CARREGAMENTO
        // =================================================

        setCarregando(true);


        try {

            // =================================================
            // LOGIN
            // =================================================

            const resposta = await api.post(
                "/Usuario/login",
                {
                    email: email,
                    senha: senha
                }
            );


            console.log(
                "Resposta da API:",
                resposta.data
            );


            // =================================================
            // PEGAR DADOS DO USUÁRIO
            // =================================================

            const {
                token,
                idUsuario,
                nome,
                email: emailUsuario
            } = resposta.data;


            // =================================================
            // SALVAR DADOS
            // =================================================

            await AsyncStorage.setItem(
                "token",
                token
            );

            await AsyncStorage.setItem(
                "idUsuario",
                idUsuario
            );

            await AsyncStorage.setItem(
                "nome",
                nome
            );

            await AsyncStorage.setItem(
                "email",
                emailUsuario
            );


            console.log(
                "Token salvo:",
                token
            );

            console.log(
                "Usuário salvo:",
                nome
            );

            console.log(
                "ID salvo:",
                idUsuario
            );

            console.log(
                "E-mail salvo:",
                emailUsuario
            );


            // =================================================
            // LOGIN REALIZADO
            // =================================================

            Alert.alert(
                "Sucesso",
                "Login realizado com sucesso!",
                [
                    {
                        text: "OK",

                        onPress: () =>
                            navigation.replace("ListaOS")
                    }
                ]
            );


        } catch (erro) {

            console.log(
                "ERRO COMPLETO:",
                erro
            );

            console.log(
                "Mensagem:",
                erro.message
            );

            console.log(
                "Código:",
                erro.code
            );

            console.log(
                "Resposta:",
                erro.response
            );


            // =================================================
            // ERRO DA API
            // =================================================

            if (erro.response) {

                Alert.alert(
                    "Erro da API",
                    `Status: ${erro.response.status}`
                );


            // =================================================
            // ERRO DE CONEXÃO
            // =================================================

            } else if (erro.request) {

                Alert.alert(
                    "Erro de conexão",
                    "O celular conseguiu iniciar a requisição, mas não recebeu resposta da API."
                );


            // =================================================
            // OUTRO ERRO
            // =================================================

            } else {

                Alert.alert(
                    "Erro",
                    erro.message
                );

            }

        } finally {

            // =================================================
            // FINALIZA CARREGAMENTO
            // =================================================

            setCarregando(false);

        }

    };


    // =====================================================
    // TELA
    // =====================================================

    return (

        <KeyboardAvoidingView
            style={LoginStyle.keyboardContainer}
            behavior="padding"
            keyboardVerticalOffset={0}
        >

            <ScrollView
                style={LoginStyle.scroll}
                contentContainerStyle={
                    LoginStyle.scrollContent
                }
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode={
                    Platform.OS === "ios"
                        ? "interactive"
                        : "on-drag"
                }
            >

                <View style={LoginStyle.container}>

                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <Image
                        source={require("../../../assets/logo.png")}
                        style={LoginStyle.logo}
                        resizeMode="contain"
                    />


                    {/* =================================================
                        CAIXA DE LOGIN
                    ================================================= */}

                    <View style={LoginStyle.loginBox}>

                        {/* =================================================
                            TÍTULO
                        ================================================= */}

                        <Text style={LoginStyle.title}>
                            Chama Jussa
                        </Text>


                        {/* =================================================
                            SUBTÍTULO
                        ================================================= */}

                        <Text style={LoginStyle.subtitle}>
                            Gerenciamento de Ordens de Serviço
                        </Text>


                        {/* =================================================
                            E-MAIL
                        ================================================= */}

                        <Text style={LoginStyle.label}>
                            E-mail
                        </Text>


                        <TextInput
                            style={LoginStyle.input}

                            placeholder="email@email.com"

                            keyboardType="email-address"

                            autoCapitalize="none"

                            autoCorrect={false}

                            textContentType="emailAddress"

                            value={email}

                            onChangeText={setEmail}

                            returnKeyType="next"

                            editable={!carregando}
                        />


                        {/* =================================================
                            SENHA
                        ================================================= */}

                        <Text style={LoginStyle.label}>
                            Senha
                        </Text>


                        <TextInput
                            style={LoginStyle.input}

                            placeholder="Digite sua senha"

                            secureTextEntry

                            autoCapitalize="none"

                            autoCorrect={false}

                            textContentType="password"

                            value={senha}

                            onChangeText={setSenha}

                            returnKeyType="done"

                            onSubmitEditing={fazerLogin}

                            editable={!carregando}
                        />


                        {/* =================================================
                            BOTÃO
                        ================================================= */}

                        <TouchableOpacity
                            style={[
                                LoginStyle.button,

                                carregando &&
                                    LoginStyle.buttonLoading
                            ]}

                            activeOpacity={0.8}

                            onPress={fazerLogin}

                            disabled={carregando}
                        >

                            {carregando ? (

                                <View
                                    style={
                                        LoginStyle.loadingContainer
                                    }
                                >

                                    <ActivityIndicator
                                        size="small"
                                        color="#FFFFFF"
                                    />

                                    <Text
                                        style={
                                            LoginStyle.loadingText
                                        }
                                    >
                                        Entrando...
                                    </Text>

                                </View>

                            ) : (

                                <Text
                                    style={
                                        LoginStyle.buttonText
                                    }
                                >
                                    Acessar o sistema
                                </Text>

                            )}

                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
};