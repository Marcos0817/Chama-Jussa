import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";

import { DetalheStyle } from "./DetalheOSStyle";
import { Footer } from "../../components/footer/Footer";
import { api } from "../../services/api";


export const DetalheOS = ({ route, navigation }) => {

  /*
   * A tela pode receber:
   *
   * 1 - os completa, quando vem da ListaOS
   *
   * 2 - idOS, quando vem da Notificação
   */

  const osRecebida = route.params?.os;
  const idOS = route.params?.idOS;

  const [os, setOs] = useState(osRecebida || null);
  const [carregando, setCarregando] = useState(!osRecebida);


  /*
   * URL DA API
   */

  const URL_API = "http://172.16.36.51:5175/";


  /*
   * BUSCAR OS PELO ID
   */

  const getOS = async () => {

    try {

      setCarregando(true);

      console.log(
        "Buscando OS:",
        idOS
      );

      const resposta = await api.get(
        `/OrdemServico/${idOS}`
      );

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


  /*
   * Se recebemos somente o ID,
   * buscamos a OS na API.
   */

  useEffect(() => {

    if (!osRecebida && idOS) {

      getOS();

    }

  }, [idOS]);


  /*
   * MONTA A URL DA FOTO
   */

  const getUrlFoto = () => {

    if (!os?.fotoProblema) {

      return null;

    }

    return `${URL_API}${os.fotoProblema}`;

  };


  /*
   * CARREGANDO
   */

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


  /*
   * CASO NÃO ENCONTRE A OS
   */

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


  return (

    <View style={DetalheStyle.container}>


      {/* TÍTULO DA PÁGINA */}

      <Text style={DetalheStyle.pageTitle}>
        Detalhes da OS-{os.numeroOS}
      </Text>


      <ScrollView
        style={DetalheStyle.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={DetalheStyle.scrollContent}
      >

        <View style={DetalheStyle.card}>


          {/* TÍTULO DO PROBLEMA */}

          <Text style={DetalheStyle.osTitle}>
            {os.tituloProblema}
          </Text>


          {/* STATUS */}

          <Text style={DetalheStyle.date}>
            Status: {os.status}
          </Text>


          {/* MÁQUINA / EQUIPAMENTO */}

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


          {/* LOCAL / SETOR */}

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


          {/* SOLICITANTE */}

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


          {/* DIVISÓRIA */}

          <View style={DetalheStyle.divider} />


          {/* DESCRIÇÃO */}

          <Text style={DetalheStyle.sectionTitle}>
            Descrição do Problema
          </Text>

          <Text style={DetalheStyle.description}>
            {os.descricaoProblema}
          </Text>


          {/* FOTO */}

          <Text style={DetalheStyle.sectionTitle}>
            Foto do Problema
          </Text>


          {urlFoto ? (

            <Image
              source={{
                uri: urlFoto
              }}
              style={DetalheStyle.problemImage}
              resizeMode="cover"
            />

          ) : (

            <Text style={DetalheStyle.noImage}>
              Nenhuma foto foi cadastrada.
            </Text>

          )}


          {/* BOTÕES */}

          <View style={DetalheStyle.buttonsContainer}>

            {/* CANCELAR */}

            {/* <TouchableOpacity
              style={DetalheStyle.cancelButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >

              <Text style={DetalheStyle.cancelButtonText}>
                Cancelar
              </Text>

            </TouchableOpacity> */}


            {/* EDITAR */}

            {/* BOTÃO EDITAR */}

            <TouchableOpacity
              style={DetalheStyle.editButton}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(
                  "EditarOS",
                  {
                    os: os
                  }
                )
              }
            >
              <Text style={DetalheStyle.editButtonText}>
                Editar Solicitação
              </Text>
            </TouchableOpacity>

          </View>


        </View>

      </ScrollView>


      {/* FOOTER */}

      <Footer navigation={navigation} />

    </View>

  );

};