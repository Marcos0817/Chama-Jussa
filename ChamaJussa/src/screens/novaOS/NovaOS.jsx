import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Style } from "./NovaOSStyle";
import { api } from "../../services/api";

export const NovaOS = ({ navigation }) => {

    const [numeroOS, setNumeroOS] = useState("");
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

                quality: 0.8,

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
    };


    // ==============================
    // CADASTRAR OS
    // ==============================

    const cadastrarOS = async () => {

        if (
            !numeroOS.trim() ||
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

            // FormData é necessário porque
            // estamos enviando uma imagem
            const formData = new FormData();

            formData.append(
                "NumeroOS",
                numeroOS
            );

            formData.append(
                "TituloProblema",
                tituloProblema
            );

            formData.append(
                "MaquinaEquipamento",
                maquinaEquipamento
            );

            formData.append(
                "LocalSetor",
                localSetor
            );

            formData.append(
                "DescricaoProblema",
                descricaoProblema
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
                    "foto_os.jpg";

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


            console.log(
                "Enviando Ordem de Serviço..."
            );

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


            console.log(
                "OS cadastrada:",
                resposta.data
            );


            Alert.alert(
                "Sucesso",
                "Ordem de Serviço cadastrada com sucesso!",
                [
                    {
                        text: "OK",

                        onPress: () => {

                            // Retorna para ListaOS
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


    return (

        <View style={Style.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Style.scrollContent}
            >

                {/* ==============================
                    CABEÇALHO
                ============================== */}

                <View style={Style.header}>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >

                        <Text style={Style.voltar}>
                            ← Voltar
                        </Text>

                    </TouchableOpacity>


                    <Text style={Style.title}>
                        Nova OS
                    </Text>


                    <Text style={Style.subtitle}>
                        Cadastre uma nova Ordem de Serviço
                    </Text>

                </View>


                <View style={Style.form}>


                    {/* ==============================
                        NÚMERO
                    ============================== */}

                    <Text style={Style.label}>
                        Número da OS
                    </Text>

                    <TextInput
                        style={Style.input}
                        placeholder="Ex: 001"
                        value={numeroOS}
                        onChangeText={setNumeroOS}
                    />


                    {/* ==============================
                        TÍTULO
                    ============================== */}

                    <Text style={Style.label}>
                        Título do problema
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
                        Máquina / Equipamento
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
                        Local / Setor
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
                        Descrição do problema
                    </Text>

                    <TextInput
                        style={[
                            Style.input,
                            Style.textArea
                        ]}
                        placeholder="Descreva o problema..."
                        multiline
                        numberOfLines={5}
                        value={descricaoProblema}
                        onChangeText={setDescricaoProblema}
                    />


                    {/* ==============================
                        IMAGEM
                    ============================== */}

                    <Text style={Style.label}>
                        Foto do problema
                    </Text>


                    <TouchableOpacity
                        style={Style.imageButton}
                        activeOpacity={0.8}
                        onPress={selecionarImagem}
                    >

                        <Text style={Style.imageButtonText}>
                            📷 Selecionar imagem
                        </Text>

                    </TouchableOpacity>


                    {/* ==============================
                        PRÉVIA DA IMAGEM
                    ============================== */}

                    {imagem && (

                        <View style={Style.imagePreviewContainer}>

                            <Image
                                source={{
                                    uri: imagem.uri
                                }}
                                style={Style.imagePreview}
                            />

                            <TouchableOpacity
                                onPress={() => setImagem(null)}
                            >

                                <Text style={Style.removeImage}>
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
                                : "Cadastrar OS"
                            }

                        </Text>

                    </TouchableOpacity>


                </View>

            </ScrollView>

        </View>
    );
};