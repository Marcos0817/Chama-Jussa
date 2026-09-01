import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  StatusBar
} from "react-native";

import { DetalheStyle } from "./DetalheOSStyle";
import { Footer } from "../../components/footer/Footer";
import { api } from "../../services/api";

export const DetalheOS = ({ route, navigation }) => {

  const osRecebida = route.params?.os;
  const idOS = route.params?.idOS;

  const [os, setOs] = useState(osRecebida || null);
  const [carregando, setCarregando] = useState(!osRecebida);

  const [imagemExpandida, setImagemExpandida] = useState(false);

  const URL_API = "http://172.16.36.24:5175";


  // =====================================================
  // FORMATAR DATA E HORA
  // =====================================================

 const formatarDataHora = (data) => {

  if (!data) {
    return "Data não informada";
  }

  const dataObj = new Date(data);

  if (isNaN(dataObj.getTime())) {
    return "Data inválida";
  }

  const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return `${dataFormatada}, ${horaFormatada}`;
};

  // =====================================================
  // BUSCAR OS
  // =====================================================

  const getOS = async () => {

    try {

      setCarregando(true);

      console.log("Buscando OS:", idOS);

      const resposta =
        await api.get(`/OrdemServico/${idOS}`);

      console.log(
        "OS encontrada:",
        resposta.data
      );

      setOs(resposta.data);

    } catch (erro) {

      console.log(
        "========== ERRO AO BUSCAR OS =========="
      );

      console.log("Erro:", erro);

      if (erro.response) {

        Alert.alert(
          "Erro",
          "Não foi possível carregar os detalhes da OS."
        );

      } else {

        Alert.alert(
          "Erro",
          "Não foi possível conectar com a API."
        );
      }

    } finally {

      setCarregando(false);

    }
  };


  // =====================================================
  // EXCLUIR OS
  // =====================================================

  const excluirOS = () => {

    Alert.alert(
      "Excluir Ordem de Serviço",

      "Tem certeza que deseja excluir esta Ordem de Serviço?",

      [
        {
          text: "Cancelar",
          style: "cancel"
        },

        {
          text: "Excluir",

          style: "destructive",

          onPress: async () => {

            try {

              await api.delete(
                `/OrdemServico/${os.idOS}`
              );

              Alert.alert(
                "Sucesso",

                "Ordem de Serviço excluída com sucesso!",

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
                "Erro ao excluir OS:",
                erro
              );

              Alert.alert(
                "Erro",
                "Não foi possível excluir a Ordem de Serviço."
              );
            }
          }
        }
      ]
    );
  };


  // =====================================================
  // BUSCAR OS AO ABRIR
  // =====================================================

  useEffect(() => {

    if (!osRecebida && idOS) {
      getOS();
    }

  }, [idOS]);


  // =====================================================
  // URL DA FOTO
  // =====================================================

  const getUrlFoto = () => {

    if (!os?.fotoProblema) {
      return null;
    }

    const foto = os.fotoProblema;

    if (
      foto.startsWith("http") ||
      foto.startsWith("data:")
    ) {

      return foto;

    }

    const caminhoFormatado =
      foto.startsWith("/")
        ? foto
        : `/${foto}`;

    return `${URL_API}${caminhoFormatado}`;
  };


  // =====================================================
  // CARREGANDO
  // =====================================================

  if (carregando) {

    return (

      <View style={DetalheStyle.container}>

        <Text style={DetalheStyle.pageTitle}>
          Carregando OS...
        </Text>

        <Footer navigation={navigation} />

      </View>
    );
  }


  // =====================================================
  // OS NÃO ENCONTRADA
  // =====================================================

  if (!os) {

    return (

      <View style={DetalheStyle.container}>

        <Text style={DetalheStyle.pageTitle}>
          OS não encontrada.
        </Text>

        <Footer navigation={navigation} />

      </View>
    );
  }


  const urlFoto = getUrlFoto();


  // =====================================================
  // TELA
  // =====================================================

  return (

    <View style={DetalheStyle.container}>

      {/* =================================================
          TÍTULO
      ================================================= */}

      <Text style={DetalheStyle.pageTitle}>
        Detalhes da OS-{os.numeroOS}
      </Text>


      {/* =================================================
          CONTEÚDO
      ================================================= */}

      <ScrollView
        style={DetalheStyle.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={DetalheStyle.scrollContent}
      >

        <View style={DetalheStyle.card}>

          {/* =================================================
              TÍTULO DA OS
          ================================================= */}

          <Text style={DetalheStyle.osTitle}>
            {os.tituloProblema}
          </Text>


          {/* =================================================
              DATA E HORA DE PUBLICAÇÃO
          ================================================= */}

          <Text style={DetalheStyle.date}>
            Criada em {formatarDataHora (os.dataCadastro)}
          </Text>


          {/* =================================================
              MÁQUINA
          ================================================= */}

          <View style={DetalheStyle.infoRow}>

            <Image
              source={require("../../../assets/Vector (6).png")}
              style={DetalheStyle.infoIcon}
              resizeMode="contain"
            />

            <View style={DetalheStyle.infoTextContainer}>

              <Text style={DetalheStyle.label}>
                Máquina / Equipamento
              </Text>

              <Text style={DetalheStyle.value}>
                {os.maquinaEquipamento}
              </Text>

            </View>

          </View>


          {/* =================================================
              LOCAL
          ================================================= */}

          <View style={DetalheStyle.infoRow}>

            <Image
              source={require("../../../assets/Vector (7).png")}
              style={DetalheStyle.infoIcon}
              resizeMode="contain"
            />

            <View style={DetalheStyle.infoTextContainer}>

              <Text style={DetalheStyle.label}>
                Local / Setor
              </Text>

              <Text style={DetalheStyle.value}>
                {os.localSetor}
              </Text>

            </View>

          </View>


          {/* =================================================
              SOLICITANTE
          ================================================= */}

          <View style={DetalheStyle.infoRow}>

            <Image
              source={require("../../../assets/Vector (8).png")}
              style={DetalheStyle.infoIcon}
              resizeMode="contain"
            />

            <View style={DetalheStyle.infoTextContainer}>

              <Text style={DetalheStyle.label}>
                Solicitante
              </Text>

              <Text style={DetalheStyle.value}>
                {os.nomeUsuario}
              </Text>

            </View>

          </View>


          {/* =================================================
              DIVISÓRIA
          ================================================= */}

          <View style={DetalheStyle.divider} />


          {/* =================================================
              DESCRIÇÃO
          ================================================= */}

          <Text style={DetalheStyle.sectionTitle}>
            Descrição do Problema
          </Text>

          <Text style={DetalheStyle.description}>
            {os.descricaoProblema}
          </Text>


          {/* =================================================
              FOTO
          ================================================= */}

          <Text style={DetalheStyle.sectionTitle}>
            Foto do Problema
          </Text>


          {urlFoto ? (

            <TouchableOpacity
              style={DetalheStyle.imageTouchable}
              activeOpacity={0.85}
              onPress={() => setImagemExpandida(true)}
            >

              <Image
                source={{
                  uri: urlFoto
                }}

                style={DetalheStyle.problemImage}

                resizeMode="cover"

                onError={(e) => {

                  console.log(
                    "Erro ao carregar imagem:",
                    urlFoto,
                    e.nativeEvent.error
                  );

                }}
              />

              <Text style={DetalheStyle.imageHint}>
                Toque na imagem para ampliar
              </Text>

            </TouchableOpacity>

          ) : (

            <Text style={DetalheStyle.noImage}>
              Nenhuma foto foi cadastrada.
            </Text>

          )}


          {/* =================================================
              BOTÕES
          ================================================= */}

          <View style={DetalheStyle.buttonsContainer}>

            <TouchableOpacity
              style={DetalheStyle.editButton}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(
                  "EditarOS",
                  { os }
                )
              }
            >

              <Text style={DetalheStyle.editButtonText}>
                Editar Solicitação
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={DetalheStyle.deleteButton}
              activeOpacity={0.8}
              onPress={excluirOS}
            >

              <Text style={DetalheStyle.deleteButtonText}>
                Excluir Ordem de Serviço
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>


      {/* =====================================================
          MODAL DA IMAGEM
      ===================================================== */}

      <Modal
        visible={imagemExpandida}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setImagemExpandida(false)
        }
      >

        <View style={DetalheStyle.modalContainer}>

          {/* STATUS BAR */}

          <StatusBar
            backgroundColor="#000"
            barStyle="light-content"
          />


          {/* BOTÃO FECHAR */}

          <Pressable
            onPress={() =>
              setImagemExpandida(false)
            }

            style={DetalheStyle.closeButton}
          >

            <Text style={DetalheStyle.closeButtonText}>
              ×
            </Text>

          </Pressable>


          {/* IMAGEM */}

          {urlFoto && (

            <Image
              source={{
                uri: urlFoto
              }}

              style={DetalheStyle.expandedImage}

              resizeMode="contain"

              onError={(e) => {

                console.log(
                  "Erro ao carregar imagem expandida:",
                  urlFoto,
                  e.nativeEvent.error
                );

              }}
            />

          )}

        </View>

      </Modal>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer navigation={navigation} />

    </View>
  );
};
