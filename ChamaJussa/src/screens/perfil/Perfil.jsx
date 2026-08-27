
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaProvider,
  SafeAreaView
} from "react-native-safe-area-context";

import { PerfilStyle } from "./PerfilStyle";
import { Footer } from "../../components/footer/Footer";
import { api } from "../../services/api";


export const Perfil = ({ navigation }) => {

  // =====================================================
  // ESTADOS
  // =====================================================

  const [usuario, setUsuario] = useState(null);

  const [carregando, setCarregando] = useState(true);

  // Controla a abertura da foto expandida
  const [fotoExpandida, setFotoExpandida] = useState(false);


  // =====================================================
  // URL DA API
  // =====================================================

  const URL_API = "http://172.16.36.27:5175";


  // =====================================================
  // BUSCAR PERFIL
  // =====================================================

  const getPerfil = async () => {

    try {

      setCarregando(true);

      // -------------------------------------------------
      // PEGAR ID DO USUÁRIO
      // -------------------------------------------------

      const idUsuario =
        await AsyncStorage.getItem("idUsuario");


      console.log(
        "===================================="
      );

      console.log(
        "ID DO USUÁRIO:"
      );

      console.log(
        idUsuario
      );

      console.log(
        "===================================="
      );


      // -------------------------------------------------
      // VERIFICAR ID
      // -------------------------------------------------

      if (!idUsuario) {

        Alert.alert(
          "Erro",
          "Não foi possível identificar o usuário."
        );

        return;
      }


      // -------------------------------------------------
      // BUSCAR USUÁRIO
      // -------------------------------------------------

      const resposta =
        await api.get(
          `/Usuario/${idUsuario}`
        );


      console.log(
        "===================================="
      );

      console.log(
        "DADOS DO USUÁRIO:"
      );

      console.log(
        resposta.data
      );

      console.log(
        "===================================="
      );


      // -------------------------------------------------
      // FOTO
      // -------------------------------------------------

      console.log(
        "===================================="
      );

      console.log(
        "FOTO DE PERFIL RECEBIDA:"
      );

      console.log(
        resposta.data?.fotoPerfil
      );

      console.log(
        "===================================="
      );


      // -------------------------------------------------
      // SALVAR USUÁRIO
      // -------------------------------------------------

      setUsuario(resposta.data);


    } catch (erro) {

      console.log(
        "===================================="
      );

      console.log(
        "ERRO AO BUSCAR PERFIL"
      );

      console.log(
        erro
      );

      console.log(
        "===================================="
      );


      // -------------------------------------------------
      // ERRO DA API
      // -------------------------------------------------

      if (erro.response) {

        console.log(
          "STATUS:",
          erro.response.status
        );

        console.log(
          "DADOS:",
          erro.response.data
        );


        Alert.alert(
          "Erro",
          "Não foi possível carregar seus dados."
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
  // CARREGAR PERFIL
  // =====================================================

  useEffect(() => {

    getPerfil();

  }, []);


  // =====================================================
  // SAIR DA CONTA
  // =====================================================

  const sair = async () => {

    Alert.alert(

      "Sair",

      "Deseja realmente sair da sua conta?",

      [

        {
          text: "Cancelar",

          style: "cancel"
        },

        {

          text: "Sair",

          onPress: async () => {

            try {

              await AsyncStorage.removeItem(
                "token"
              );

              await AsyncStorage.removeItem(
                "idUsuario"
              );

              await AsyncStorage.removeItem(
                "nomeUsuario"
              );

              await AsyncStorage.removeItem(
                "emailUsuario"
              );


              navigation.reset({

                index: 0,

                routes: [
                  {
                    name: "Login"
                  }
                ]

              });

            } catch (erro) {

              console.log(
                "Erro ao sair:",
                erro
              );

            }

          }

        }

      ]

    );

  };


  // =====================================================
  // MONTAR URL DA FOTO
  // =====================================================

  const getUrlFoto = () => {

    // ---------------------------------------------------
    // NÃO EXISTE FOTO
    // ---------------------------------------------------

    if (!usuario?.fotoPerfil) {

      console.log(
        "Usuário não possui foto de perfil."
      );

      return null;
    }


    const foto =
      String(usuario.fotoPerfil).trim();


    console.log(
      "===================================="
    );

    console.log(
      "MONTANDO URL DA FOTO"
    );

    console.log(
      "Foto recebida:",
      foto
    );


    // ---------------------------------------------------
    // URL COMPLETA
    // ---------------------------------------------------

    if (
      foto.startsWith("http://") ||
      foto.startsWith("https://")
    ) {

      console.log(
        "Foto já é uma URL completa:"
      );

      console.log(
        foto
      );

      return foto;
    }


    // ---------------------------------------------------
    // BASE64
    // ---------------------------------------------------

    if (
      foto.startsWith("data:")
    ) {

      console.log(
        "Foto está em formato Base64."
      );

      return foto;
    }


    // ---------------------------------------------------
    // CAMINHO RELATIVO
    // ---------------------------------------------------

    const caminhoFormatado =
      foto.startsWith("/")
        ? foto
        : `/${foto}`;


    const urlFinal =
      `${URL_API}${caminhoFormatado}`;


    console.log(
      "URL FINAL DA FOTO:"
    );

    console.log(
      urlFinal
    );

    console.log(
      "===================================="
    );


    return urlFinal;

  };


  // =====================================================
  // URL FINAL DA FOTO
  // =====================================================

  const urlFoto =
    getUrlFoto();


  // =====================================================
  // TELA
  // =====================================================

  return (

    <SafeAreaProvider>

      <SafeAreaView
        style={PerfilStyle.container}
        edges={["top", "bottom"]}
      >

        {/* =================================================
            TÍTULO
        ================================================= */}

        <Text style={PerfilStyle.title}>
          Perfil
        </Text>


        {/* =================================================
            CONTEÚDO
        ================================================= */}

        <ScrollView
          style={PerfilStyle.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            PerfilStyle.scrollContent
          }
        >

          {/* =================================================
              CARREGANDO
          ================================================= */}

          {carregando ? (

            <Text style={PerfilStyle.loading}>
              Carregando seus dados...
            </Text>

          ) : (

            <>

              {/* =============================================
                  CARD DO USUÁRIO
              ============================================= */}

              <View style={PerfilStyle.card}>

                {/* =========================================
                    AVATAR
                ========================================= */}

                <TouchableOpacity

                  activeOpacity={0.8}

                  onPress={() => {

                    if (urlFoto) {

                      setFotoExpandida(true);

                    }

                  }}

                  style={PerfilStyle.avatar}

                >

                  {urlFoto ? (

                    <Image
                      source={{
                        uri: urlFoto
                      }}
                      style={
                        PerfilStyle.avatarImage
                      }
                      resizeMode="cover"

                      onLoad={() => {

                        console.log(
                          "===================================="
                        );

                        console.log(
                          "FOTO DE PERFIL CARREGADA COM SUCESSO"
                        );

                        console.log(
                          "URL:",
                          urlFoto
                        );

                        console.log(
                          "===================================="
                        );

                      }}

                      onError={(erro) => {

                        console.log(
                          "===================================="
                        );

                        console.log(
                          "ERRO AO CARREGAR FOTO DE PERFIL"
                        );

                        console.log(
                          "URL:",
                          urlFoto
                        );

                        console.log(
                          "ERRO:",
                          erro.nativeEvent
                        );

                        console.log(
                          "===================================="
                        );

                      }}

                    />

                  ) : (

                    <Text
                      style={
                        PerfilStyle.avatarText
                      }
                    >

                      {usuario?.nome

                        ? usuario.nome
                            .charAt(0)
                            .toUpperCase()

                        : "U"

                      }

                    </Text>

                  )}

                </TouchableOpacity>


                {/* =========================================
                    NOME
                ========================================= */}

                <Text style={PerfilStyle.nome}>

                  {usuario?.nome ||
                    "Usuário"}

                </Text>


                {/* =========================================
                    EMAIL
                ========================================= */}

                <Text style={PerfilStyle.email}>

                  {usuario?.email || ""}

                </Text>

              </View>


              {/* =================================================
                  INFORMAÇÕES PESSOAIS
              ================================================= */}

              <View style={PerfilStyle.section}>

                <Text
                  style={
                    PerfilStyle.sectionTitle
                  }
                >
                  Informações pessoais
                </Text>


                {/* =============================================
                    NOME
                ============================================= */}

                <View
                  style={
                    PerfilStyle.infoBox
                  }
                >

                  <Text
                    style={
                      PerfilStyle.label
                    }
                  >
                    Nome
                  </Text>


                  <Text
                    style={
                      PerfilStyle.value
                    }
                  >

                    {usuario?.nome ||
                      "Não informado"}

                  </Text>

                </View>


                {/* =============================================
                    EMAIL
                ============================================= */}

                <View
                  style={
                    PerfilStyle.infoBox
                  }
                >

                  <Text
                    style={
                      PerfilStyle.label
                    }
                  >
                    E-mail
                  </Text>


                  <Text
                    style={
                      PerfilStyle.value
                    }
                  >

                    {usuario?.email ||
                      "Não informado"}

                  </Text>

                </View>

              </View>


              {/* =================================================
                  BOTÃO SAIR
              ================================================= */}

              <TouchableOpacity

                style={
                  PerfilStyle.logoutButton
                }

                activeOpacity={0.8}

                onPress={sair}

              >

                <Text
                  style={
                    PerfilStyle.logoutText
                  }
                >
                  Sair da conta
                </Text>

              </TouchableOpacity>

            </>

          )}

        </ScrollView>


        {/* =====================================================
            MODAL DA FOTO EXPANDIDA
        ===================================================== */}

        <Modal

          visible={fotoExpandida}

          transparent={true}

          animationType="fade"

          onRequestClose={() => {
            setFotoExpandida(false);
          }}

        >

          {/* ===============================================
              FUNDO DO MODAL
          =============================================== */}

          <TouchableOpacity

            activeOpacity={1}

            onPress={() => {
              setFotoExpandida(false);
            }}

            style={PerfilStyle.modalBackground}

          >

            {/* ===========================================
                BOTÃO FECHAR
            =========================================== */}

            <TouchableOpacity

              onPress={() => {
                setFotoExpandida(false);
              }}

              activeOpacity={0.7}

              style={PerfilStyle.closeButton}

            >

              <Text
                style={PerfilStyle.closeButtonText}
              >
                ×
              </Text>

            </TouchableOpacity>


            {/* ===========================================
                FOTO GRANDE
            =========================================== */}

            {urlFoto && (

              <Image

                source={{
                  uri: urlFoto
                }}

                style={
                  PerfilStyle.expandedImage
                }

                resizeMode="contain"

              />

            )}

          </TouchableOpacity>

        </Modal>

      </SafeAreaView>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer
        navigation={navigation}
      />

    </SafeAreaProvider>

  );

};

