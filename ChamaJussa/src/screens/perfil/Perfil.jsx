import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
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

  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // IP da sua API
  const URL_API = "http://10.151.208.52:5175/";

  const getPerfil = async () => {

    try {

      setCarregando(true);

      const idUsuario = await AsyncStorage.getItem("idUsuario");

      console.log("ID do usuário:", idUsuario);

      if (!idUsuario) {

        Alert.alert(
          "Erro",
          "Não foi possível identificar o usuário."
        );

        return;
      }

      const resposta = await api.get(
        `/Usuario/${idUsuario}`
      );

      console.log("Dados do usuário:", resposta.data);

      console.log(
        "Foto do usuário:",
        resposta.data.fotoPerfil
      );

      setUsuario(resposta.data);

    } catch (erro) {

      console.log(
        "Erro ao buscar perfil:",
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


  useEffect(() => {

    getPerfil();

  }, []);


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

            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("idUsuario");
            await AsyncStorage.removeItem("nomeUsuario");
            await AsyncStorage.removeItem("emailUsuario");

            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Login"
                }
              ]
            });

          }
        }
      ]
    );
  };


  /*
   * Monta a URL completa da foto
   */

  const getUrlFoto = () => {

    if (!usuario?.fotoPerfil) {
      return null;
    }

    // Se a API já devolver uma URL completa
    if (
      usuario.fotoPerfil.startsWith("http://") ||
      usuario.fotoPerfil.startsWith("https://")
    ) {
      return usuario.fotoPerfil;
    }

    return `${URL_API}${usuario.fotoPerfil}`;
  };


  const urlFoto = getUrlFoto();


  return (

    <SafeAreaProvider>

      <SafeAreaView
        style={PerfilStyle.container}
        edges={["top", "bottom"]}
      >

        <Text style={PerfilStyle.title}>
          Perfil
        </Text>


        <ScrollView
          style={PerfilStyle.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={PerfilStyle.scrollContent}
        >

          {carregando ? (

            <Text style={PerfilStyle.loading}>
              Carregando seus dados...
            </Text>

          ) : (

            <>

              {/* CARD DO USUÁRIO */}

              <View style={PerfilStyle.card}>

                <View style={PerfilStyle.avatar}>

                  {urlFoto ? (

                    <Image
                      source={{
                        uri: urlFoto
                      }}
                      style={PerfilStyle.avatarImage}
                      resizeMode="cover"
                    />

                  ) : (

                    <Text style={PerfilStyle.avatarText}>
                      {usuario?.nome
                        ? usuario.nome.charAt(0).toUpperCase()
                        : "U"
                      }
                    </Text>

                  )}

                </View>


                <Text style={PerfilStyle.nome}>
                  {usuario?.nome || "Usuário"}
                </Text>


                <Text style={PerfilStyle.email}>
                  {usuario?.email || ""}
                </Text>

              </View>


              {/* INFORMAÇÕES */}

              <View style={PerfilStyle.section}>

                <Text style={PerfilStyle.sectionTitle}>
                  Informações pessoais
                </Text>


                <View style={PerfilStyle.infoBox}>

                  <Text style={PerfilStyle.label}>
                    Nome
                  </Text>

                  <Text style={PerfilStyle.value}>
                    {usuario?.nome || "Não informado"}
                  </Text>

                </View>


                <View style={PerfilStyle.infoBox}>

                  <Text style={PerfilStyle.label}>
                    E-mail
                  </Text>

                  <Text style={PerfilStyle.value}>
                    {usuario?.email || "Não informado"}
                  </Text>

                </View>

              </View>


              {/* BOTÃO SAIR */}

              <TouchableOpacity
                style={PerfilStyle.logoutButton}
                activeOpacity={0.8}
                onPress={sair}
              >

                <Text style={PerfilStyle.logoutText}>
                  Sair da conta
                </Text>

              </TouchableOpacity>

            </>

          )}

        </ScrollView>



      </SafeAreaView>
        <Footer navigation={navigation} />

    </SafeAreaProvider>
  );
};