import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Image,
    Platform
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Footer } from "../../components/footer/Footer";

import { Style } from "./NovaOSStyle";
import { api } from "../../services/api";

export const NovaOS = ({ navigation }) => {

    const [tituloProblema, setTituloProblema] = useState("");
    const [maquinaEquipamento, setMaquinaEquipamento] = useState("");
    const [localSetor, setLocalSetor] = useState("");
    const [descricaoProblema, setDescricaoProblema] = useState("");

    const [imagem, setImagem] = useState(null);
    const [enviando, setEnviando] = useState(false);


    // ==============================
    // SELECIONAR IMAGEM
    // ==============================

    const selecionarImagem = async () => {

        try {

            const permissao =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissao.granted) {

                Alert.alert(
                    "Permissão necessária",
                    "Precisamos de acesso à galeria para selecionar uma imagem."
                );

                return;
            }

            const resultado =
                await ImagePicker.launchImageLibraryAsync({

                    mediaTypes: ["images"],

                    allowsEditing: true,

                    quality: 0.8

                });


            if (!resultado.canceled) {

                const imagemSelecionada =
                    resultado.assets[0];

                console.log(
                    "Imagem selecionada:",
                    imagemSelecionada
                );

                setImagem(imagemSelecionada);
            }

        } catch (erro) {

            console.log(
                "Erro ao selecionar imagem:",
                erro
            );

            Alert.alert(
                "Erro",
                "Não foi possível selecionar a imagem."
            );
        }
    };


    // ==============================
    // CADASTRAR OS
    // ==============================

    const cadastrarOS = async () => {

        // ==============================
        // VALIDAÇÃO
        // ==============================

        if (
            !tituloProblema.trim() ||
            !maquinaEquipamento.trim() ||
            !localSetor.trim() ||
            !descricaoProblema.trim()
        ) {

            Alert.alert(
                "Atenção",
                "Preencha todos os campos."
            );

            return;
        }


        try {

            setEnviando(true);


            // ==============================
            // FORMDATA
            // ==============================

            const formData = new FormData();


            // ==============================
            // DADOS DA OS
            // ==============================

            // O NumeroOS não é enviado.
            // O backend gera automaticamente.

            formData.append(
                "TituloProblema",
                tituloProblema.trim()
            );


            formData.append(
                "MaquinaEquipamento",
                maquinaEquipamento.trim()
            );


            formData.append(
                "LocalSetor",
                localSetor.trim()
            );


            formData.append(
                "DescricaoProblema",
                descricaoProblema.trim()
            );


            formData.append(
                "Status",
                "Aberta"
            );


            // ==============================
            // ADICIONA A IMAGEM
            // ==============================

            if (imagem) {

                const nomeArquivo =
                    imagem.fileName ||
                    `foto-${Date.now()}.jpg`;


                const tipo =
                    imagem.mimeType ||
                    "image/jpeg";


                formData.append(
                    "FotoProblema",
                    {
                        uri: imagem.uri,
                        name: nomeArquivo,
                        type: tipo
                    }
                );
            }


            // ==============================
            // LOG DOS DADOS
            // ==============================

            console.log(
                "===================================="
            );

            console.log(
                "Enviando Ordem de Serviço..."
            );

            console.log(
                "Dados:",
                {
                    tituloProblema,
                    maquinaEquipamento,
                    localSetor,
                    descricaoProblema,
                    status: "Aberta",
                    possuiImagem: !!imagem
                }
            );

            console.log(
                "A data/hora será gerada pela API."
            );

            console.log(
                "===================================="
            );


            // ==============================
            // POST
            // ==============================

            const resposta = await api.post(
                "/OrdemServico",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );


            // ==============================
            // RESPOSTA DO BACKEND
            // ==============================

            console.log(
                "===================================="
            );

            console.log(
                "OS cadastrada com sucesso:"
            );

            console.log(
                resposta.data
            );


            console.log(
                "Número gerado pelo backend:",
                resposta.data?.numeroOS
            );


            // =================================================
            // DATA/HORA GERADA PELA API
            // =================================================

            console.log(
                "Data/hora gerada pela API:",
                resposta.data?.dataCadastro
            );


            console.log(
                "===================================="
            );


            // ==============================
            // SUCESSO
            // ==============================

            Alert.alert(
                "Sucesso",
                `Ordem de Serviço ${resposta.data?.numeroOS || ""} cadastrada com sucesso!`,
                [
                    {
                        text: "OK",

                        onPress: () => {

                            navigation.goBack();

                        }
                    }
                ]
            );


        } catch (erro) {

            console.log(
                "========== ERRO AO CADASTRAR OS =========="
            );


            console.log(
                "Erro:",
                erro
            );


            if (erro.response) {

                console.log(
                    "Status:",
                    erro.response.status
                );


                console.log(
                    "Dados:",
                    erro.response.data
                );


                Alert.alert(
                    "Erro",

                    typeof erro.response.data === "string"
                        ? erro.response.data
                        : "Não foi possível cadastrar a Ordem de Serviço."
                );


            } else {

                Alert.alert(
                    "Erro",
                    "Não foi possível conectar com a API."
                );
            }

        } finally {

            setEnviando(false);

        }
    };


    // ==============================
    // TELA
    // ==============================

    return (
        <>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >

                <View style={Style.container}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={Style.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >


                        {/* ==============================
                            CABEÇALHO
                        ============================== */}

                        <View style={Style.header}>

                            <TouchableOpacity
                                onPress={() =>
                                    navigation.goBack()
                                }
                            >

                                <Text style={Style.voltar}>
                                    ← Voltar
                                </Text>

                            </TouchableOpacity>


                            <Text style={Style.title}>
                                Criar ordem de serviço
                            </Text>

                        </View>


                        {/* ==============================
                            FORMULÁRIO
                        ============================== */}

                        <View style={Style.form}>


                            {/* ==============================
                                TÍTULO
                            ============================== */}

                            <Text style={Style.label}>
                                Título do problema *
                            </Text>

                            <TextInput
                                style={Style.input}
                                placeholder="Ex: Vazamento hidráulico"
                                value={tituloProblema}
                                onChangeText={setTituloProblema}
                            />


                            {/* ==============================
                                EQUIPAMENTO
                            ============================== */}

                            <Text style={Style.label}>
                                Máquina / Equipamento *
                            </Text>

                            <TextInput
                                style={Style.input}
                                placeholder="Digite a máquina ou equipamento"
                                value={maquinaEquipamento}
                                onChangeText={setMaquinaEquipamento}
                            />


                            {/* ==============================
                                LOCAL
                            ============================== */}

                            <Text style={Style.label}>
                                Local / Setor *
                            </Text>

                            <TextInput
                                style={Style.input}
                                placeholder="Ex: Bloco B - 2º andar"
                                value={localSetor}
                                onChangeText={setLocalSetor}
                            />


                            {/* ==============================
                                DESCRIÇÃO
                            ============================== */}

                            <Text style={Style.label}>
                                Descrição do problema *
                            </Text>

                            <TextInput
                                style={[
                                    Style.input,
                                    Style.textArea
                                ]}
                                placeholder="Ex: Vazamento da pia"
                                multiline
                                numberOfLines={5}
                                value={descricaoProblema}
                                onChangeText={setDescricaoProblema}
                            />


                            {/* ==============================
                                IMAGEM
                            ============================== */}

                            <Text style={Style.label}>
                                Imagem / Foto do problema
                            </Text>


                            <TouchableOpacity
                                style={Style.imageButton}
                                activeOpacity={0.8}
                                onPress={selecionarImagem}
                            >

                                <Text style={Style.imageButtonText}>
                                    Insira imagem
                                </Text>

                            </TouchableOpacity>


                            {/* ==============================
                                PRÉVIA DA IMAGEM
                            ============================== */}

                            {imagem && (

                                <View
                                    style={
                                        Style.imagePreviewContainer
                                    }
                                >

                                    <Image
                                        source={{
                                            uri: imagem.uri
                                        }}
                                        style={
                                            Style.imagePreview
                                        }
                                    />


                                    <TouchableOpacity
                                        onPress={() =>
                                            setImagem(null)
                                        }
                                    >

                                        <Text
                                            style={
                                                Style.removeImage
                                            }
                                        >
                                            Remover imagem
                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            )}


                            {/* ==============================
                                BOTÃO CADASTRAR
                            ============================== */}

                            <TouchableOpacity
                                style={Style.button}
                                activeOpacity={0.8}
                                onPress={cadastrarOS}
                                disabled={enviando}
                            >

                                <Text style={Style.buttonText}>

                                    {enviando
                                        ? "Cadastrando..."
                                        : "Abrir Ordem de Serviço"
                                    }

                                </Text>

                            </TouchableOpacity>


                        </View>

                    </ScrollView>

                </View>

            </KeyboardAvoidingView>


            <Footer navigation={navigation} />

        </>
    );
};