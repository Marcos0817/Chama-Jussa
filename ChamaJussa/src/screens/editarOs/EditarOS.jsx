import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Pressable,
    StatusBar
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { api } from "../../services/api";
import { Style } from "./EditarOSStyle";


export const EditarOS = ({ route, navigation }) => {

    const { os } = route.params;


    // =====================================================
    // CAMPOS
    // =====================================================

    const [tituloProblema, setTituloProblema] = useState(
        os.tituloProblema || ""
    );

    const [maquinaEquipamento, setMaquinaEquipamento] = useState(
        os.maquinaEquipamento || ""
    );

    const [localSetor, setLocalSetor] = useState(
        os.localSetor || ""
    );

    const [descricaoProblema, setDescricaoProblema] = useState(
        os.descricaoProblema || ""
    );

    const [status, setStatus] = useState(
        os.status || "Aberta"
    );


    // =====================================================
    // FOTO
    // =====================================================

    const [foto, setFoto] = useState(null);

    const [fotoAtual, setFotoAtual] = useState(
        os.fotoProblema || null
    );


    // =====================================================
    // MODAL
    // =====================================================

    const [imagemExpandida, setImagemExpandida] = useState(false);

    const [salvando, setSalvando] = useState(false);


    // =====================================================
    // URL DO SERVIDOR
    // =====================================================

    const URL_API = "http://172.16.36.27:5175";


    // =====================================================
    // MONTAR URL DA FOTO
    // =====================================================

    const montarUrlFoto = (foto) => {

        if (!foto) {
            return null;
        }


        // Imagem local selecionada pelo celular

        if (
            foto.startsWith("file://") ||
            foto.startsWith("content://")
        ) {
            return foto;
        }


        // URL completa

        if (
            foto.startsWith("http://") ||
            foto.startsWith("https://") ||
            foto.startsWith("data:")
        ) {
            return foto;
        }


        // Caminho salvo pelo backend

        const caminho =
            foto.startsWith("/")
                ? foto
                : `/${foto}`;


        return `${URL_API}${caminho}`;
    };


    // =====================================================
    // SELECIONAR FOTO
    // =====================================================

    const selecionarFoto = async () => {

        try {

            const permissao =
                await ImagePicker.requestMediaLibraryPermissionsAsync();


            if (!permissao.granted) {

                Alert.alert(
                    "Permissão necessária",
                    "Precisamos de acesso à galeria para selecionar uma foto."
                );

                return;
            }


            const resultado =
                await ImagePicker.launchImageLibraryAsync({

                    mediaTypes: ["images"],

                    allowsEditing: true,

                    aspect: [4, 3],

                    quality: 0.8

                });


            if (!resultado.canceled) {

                const imagem =
                    resultado.assets[0];


                console.log(
                    "===================================="
                );

                console.log(
                    "NOVA FOTO SELECIONADA"
                );

                console.log(
                    "URI:",
                    imagem.uri
                );

                console.log(
                    "Nome:",
                    imagem.fileName
                );

                console.log(
                    "Tipo:",
                    imagem.mimeType
                );

                console.log(
                    "===================================="
                );


                // Arquivo que será enviado

                setFoto(imagem);


                // Foto mostrada na tela

                setFotoAtual(imagem.uri);
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


    // =====================================================
    // SALVAR
    // =====================================================

    const editarOS = async () => {

        // Validação

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

            setSalvando(true);


            // =================================================
            // FORMDATA
            // =================================================

            const formData = new FormData();


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
                status
            );


            // =================================================
            // FOTO NOVA
            // =================================================

            if (foto) {

                const nomeArquivo =
                    foto.fileName ||
                    `foto-${Date.now()}.jpg`;


                const tipoArquivo =
                    foto.mimeType ||
                    "image/jpeg";


                formData.append(
                    "FotoProblema",
                    {
                        uri: foto.uri,
                        name: nomeArquivo,
                        type: tipoArquivo
                    }
                );


                console.log(
                    "Nova foto será enviada:",
                    foto.uri
                );

            } else {

                console.log(
                    "Nenhuma foto nova selecionada."
                );
            }


            // =================================================
            // PUT
            // =================================================

            console.log(
                "===================================="
            );

            console.log(
                "EDITANDO OS:",
                os.idOS
            );

            console.log(
                "FOTO ANTIGA:",
                os.fotoProblema
            );

            console.log(
                "FOTO ATUAL:",
                fotoAtual
            );

            console.log(
                "TEM FOTO NOVA:",
                !!foto
            );

            console.log(
                "===================================="
            );


            const resposta =
                await api.put(
                    `/OrdemServico/${os.idOS}`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );


            console.log(
                "===================================="
            );

            console.log(
                "RESPOSTA DO BACKEND:"
            );

            console.log(
                resposta.data
            );

            console.log(
                "===================================="
            );


            Alert.alert(
                "Sucesso",
                "Ordem de Serviço atualizada com sucesso!",
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
                "========== ERRO AO EDITAR OS =========="
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
                        : "Não foi possível atualizar a Ordem de Serviço."
                );

            } else {

                Alert.alert(
                    "Erro",
                    "Não foi possível conectar com a API."
                );
            }

        } finally {

            setSalvando(false);

        }
    };


    // =====================================================
    // CANCELAR
    // =====================================================

    const cancelarEdicao = () => {

        navigation.goBack();

    };


    // =====================================================
    // URL DA FOTO
    // =====================================================

    const urlFotoAtual =
        montarUrlFoto(fotoAtual);


    // =====================================================
    // TELA
    // =====================================================

    return (

        <KeyboardAvoidingView
            style={Style.keyboardAvoiding}
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


                    {/* =====================================
                        CABEÇALHO
                    ===================================== */}

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
                            Editar Solicitação
                        </Text>


                        <Text style={Style.subtitle}>
                            Altere os dados da Ordem de Serviço
                        </Text>

                    </View>


                    {/* =====================================
                        FORMULÁRIO
                    ===================================== */}

                    <View style={Style.form}>


                        {/* NÚMERO */}

                        <Text style={Style.label}>
                            Número da OS
                        </Text>

                        <TextInput
                            style={Style.inputDisabled}
                            value={String(os.numeroOS || "")}
                            editable={false}
                        />


                        {/* TÍTULO */}

                        <Text style={Style.label}>
                            Título do problema
                        </Text>

                        <TextInput
                            style={Style.input}
                            value={tituloProblema}
                            onChangeText={setTituloProblema}
                            placeholder="Título do problema"
                        />


                        {/* MÁQUINA */}

                        <Text style={Style.label}>
                            Máquina / Equipamento
                        </Text>

                        <TextInput
                            style={Style.input}
                            value={maquinaEquipamento}
                            onChangeText={setMaquinaEquipamento}
                            placeholder="Máquina ou equipamento"
                        />


                        {/* LOCAL */}

                        <Text style={Style.label}>
                            Local / Setor
                        </Text>

                        <TextInput
                            style={Style.input}
                            value={localSetor}
                            onChangeText={setLocalSetor}
                            placeholder="Local / setor"
                        />


                        {/* DESCRIÇÃO */}

                        <Text style={Style.label}>
                            Descrição do problema
                        </Text>

                        <TextInput
                            style={[
                                Style.input,
                                Style.textArea
                            ]}
                            value={descricaoProblema}
                            onChangeText={setDescricaoProblema}
                            placeholder="Descreva o problema..."
                            multiline
                            numberOfLines={5}
                        />


                        {/* =====================================
                            STATUS
                        ===================================== */}

                        <Text style={Style.label}>
                            Status
                        </Text>


                        <View style={Style.statusContainer}>


                            {/* ABERTA */}

                            <TouchableOpacity
                                style={
                                    status === "Aberta"
                                        ? Style.statusButtonAtivo
                                        : Style.statusButton
                                }

                                onPress={() =>
                                    setStatus("Aberta")
                                }
                            >

                                <Text
                                    style={
                                        status === "Aberta"
                                            ? Style.statusTextAtivo
                                            : Style.statusText
                                    }
                                >
                                    Aberta
                                </Text>

                            </TouchableOpacity>


                            {/* EM ANDAMENTO */}

                            <TouchableOpacity
                                style={
                                    status === "Em Andamento"
                                        ? Style.statusButtonAtivo
                                        : Style.statusButton
                                }

                                onPress={() =>
                                    setStatus("Em Andamento")
                                }
                            >

                                <Text
                                    style={
                                        status === "Em Andamento"
                                            ? Style.statusTextAtivo
                                            : Style.statusText
                                    }
                                >
                                    Em Andamento
                                </Text>

                            </TouchableOpacity>


                            {/* CONCLUÍDA */}

                            <TouchableOpacity
                                style={
                                    status === "Concluída"
                                        ? Style.statusButtonAtivo
                                        : Style.statusButton
                                }

                                onPress={() =>
                                    setStatus("Concluída")
                                }
                            >

                                <Text
                                    style={
                                        status === "Concluída"
                                            ? Style.statusTextAtivo
                                            : Style.statusText
                                    }
                                >
                                    Concluída
                                </Text>

                            </TouchableOpacity>

                        </View>


                        {/* =====================================
                            FOTO
                        ===================================== */}

                        <Text style={Style.label}>
                            Foto do Problema
                        </Text>


                        {urlFotoAtual ? (

                            <TouchableOpacity
                                style={Style.imageContainer}
                                activeOpacity={0.85}
                                onPress={() =>
                                    setImagemExpandida(true)
                                }
                            >

                                <Image
                                    source={{
                                        uri: urlFotoAtual
                                    }}

                                    style={Style.preview}

                                    resizeMode="cover"

                                    onLoad={() => {

                                        console.log(
                                            "FOTO CARREGADA:",
                                            urlFotoAtual
                                        );

                                    }}

                                    onError={(e) => {

                                        console.log(
                                            "========== ERRO FOTO =========="
                                        );

                                        console.log(
                                            "URL:",
                                            urlFotoAtual
                                        );

                                        console.log(
                                            "ERRO:",
                                            e.nativeEvent
                                        );

                                    }}
                                />


                                <Text style={Style.imageHint}>
                                    Toque na imagem para ampliar
                                </Text>

                            </TouchableOpacity>

                        ) : (

                            <Text style={Style.semFoto}>
                                Nenhuma foto cadastrada.
                            </Text>

                        )}


                        {/* =====================================
                            BOTÃO FOTO
                        ===================================== */}

                        <TouchableOpacity
                            style={Style.photoButton}
                            activeOpacity={0.8}
                            onPress={selecionarFoto}
                        >

                            <Text style={Style.photoButtonText}>

                                {fotoAtual
                                    ? "Trocar foto"
                                    : "Adicionar foto"
                                }

                            </Text>

                        </TouchableOpacity>


                        {/* =====================================
                            BOTÕES
                        ===================================== */}

                        <View style={Style.buttonsContainer}>


                            {/* SALVAR */}

                            <TouchableOpacity
                                style={Style.button}
                                activeOpacity={0.8}
                                onPress={editarOS}
                                disabled={salvando}
                            >

                                <Text style={Style.buttonText}>

                                    {salvando
                                        ? "Salvando..."
                                        : "Salvar alterações"
                                    }

                                </Text>

                            </TouchableOpacity>


                            {/* CANCELAR */}

                            <TouchableOpacity
                                style={Style.cancelButton}
                                activeOpacity={0.8}
                                onPress={cancelarEdicao}
                                disabled={salvando}
                            >

                                <Text style={Style.cancelButtonText}>
                                    Cancelar
                                </Text>

                            </TouchableOpacity>

                        </View>


                    </View>

                </ScrollView>

            </View>


            {/* =================================================
                MODAL DA IMAGEM
            ================================================= */}

            <Modal
                visible={imagemExpandida}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setImagemExpandida(false)
                }
            >

                <View style={Style.modalContainer}>

                    <StatusBar
                        backgroundColor="#000"
                        barStyle="light-content"
                    />


                    {/* BOTÃO FECHAR */}

                    <Pressable
                        onPress={() =>
                            setImagemExpandida(false)
                        }

                        style={Style.closeButton}
                    >

                        <Text style={Style.closeButtonText}>
                            ×
                        </Text>

                    </Pressable>


                    {/* IMAGEM */}

                    {urlFotoAtual && (

                        <Image
                            source={{
                                uri: urlFotoAtual
                            }}

                            style={Style.expandedImage}

                            resizeMode="contain"
                        />

                    )}

                </View>

            </Modal>

        </KeyboardAvoidingView>
    );
};