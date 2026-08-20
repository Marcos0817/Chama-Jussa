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

import { api } from "../../services/api";
import { Style } from "./EditarOSStyle";


export const EditarOS = ({ route, navigation }) => {

    const { os } = route.params;

    const [numeroOS, setNumeroOS] = useState(
        os.numeroOS || ""
    );

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

    const [foto, setFoto] = useState(null);

    const [fotoAtual, setFotoAtual] = useState(
        os.fotoProblema || null
    );

    const [salvando, setSalvando] = useState(false);


    /*
     * URL da API
     */
    const URL_API = "http://172.16.36.51:5175/";


    /*
     * Selecionar uma nova foto
     */
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
                    "Nova imagem selecionada:",
                    imagem
                );

                setFoto(imagem);

                /*
                 * Mostra a nova foto na tela
                 */
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


    /*
     * Salvar alterações
     */
    const editarOS = async () => {

        /*
         * Validação
         */
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

            setSalvando(true);


            /*
             * FormData porque a API aceita:
             *
             * [FromForm]
             *
             * e também recebe imagem.
             */

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
                status
            );


            /*
             * Se o usuário escolheu uma nova foto,
             * envia a foto para a API.
             */

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
            }


            console.log(
                "Editando OS:",
                os.idOS
            );


            /*
             * PUT
             */

            const resposta = await api.put(
                `/OrdemServico/${os.idOS}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );


            console.log(
                "Resposta da edição:",
                resposta.status
            );


            Alert.alert(
                "Sucesso",
                "Ordem de Serviço atualizada com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => {

                            /*
                             * Volta para os detalhes.
                             *
                             * A tela anterior será atualizada
                             * quando fizermos o GET novamente.
                             */

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


    return (

        <View style={Style.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Style.scrollContent}
            >


                {/* CABEÇALHO */}

                <View style={Style.header}>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
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


                {/* FORMULÁRIO */}

                <View style={Style.form}>


                    {/* NÚMERO */}

                    <Text style={Style.label}>
                        Número da OS
                    </Text>

                    <TextInput
                        style={Style.input}
                        value={numeroOS}
                        onChangeText={setNumeroOS}
                        placeholder="Número da OS"
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


                    {/* STATUS */}

                    <Text style={Style.label}>
                        Status
                    </Text>


                    <View style={Style.statusContainer}>

                        <TouchableOpacity
                            style={
                                status === "Aberta"
                                    ? Style.statusButtonAtivo
                                    : Style.statusButton
                            }
                            onPress={() => setStatus("Aberta")}
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


                        <TouchableOpacity
                            style={
                                status === "Em Andamento"
                                    ? Style.statusButtonAtivo
                                    : Style.statusButton
                            }
                            onPress={() => setStatus("Em Andamento")}
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


                        <TouchableOpacity
                            style={
                                status === "Concluída"
                                    ? Style.statusButtonAtivo
                                    : Style.statusButton
                            }
                            onPress={() => setStatus("Concluída")}
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


                    {/* FOTO */}

                    <Text style={Style.label}>
                        Foto do Problema
                    </Text>


                    {fotoAtual ? (

                        <Image
                            source={{
                                uri: fotoAtual.startsWith("http")
                                    ? fotoAtual
                                    : `${URL_API}${fotoAtual}`
                            }}
                            style={Style.preview}
                            resizeMode="cover"
                        />

                    ) : (

                        <Text style={Style.semFoto}>
                            Nenhuma foto cadastrada.
                        </Text>

                    )}


                    {/* BOTÃO FOTO */}

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


                </View>

            </ScrollView>

        </View>
    );
};