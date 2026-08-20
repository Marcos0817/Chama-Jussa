import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { Style } from "./ListaOSStyle";
import { Footer } from "../../components/footer/Footer";
import { api } from "../../services/api";

export const ListaOS = ({ navigation }) => {

  const [filtro, setFiltro] = useState("Todos");
  const [listaOS, setListaOS] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // ==============================
  // FILTRAR ORDENS DE SERVIÇO
  // ==============================

  const listaFiltrada = listaOS.filter((os) => {

    if (filtro === "Todos") {
      return true;
    }

    return os.status === filtro;
  });


  // ==============================
  // BUSCAR MINHAS OS
  // ==============================

  const getMinhasOS = async () => {

    try {

      setCarregando(true);

      const token = await AsyncStorage.getItem("token");

      console.log(
        "Token encontrado:",
        token ? "SIM" : "NÃO"
      );

      if (!token) {

        Alert.alert(
          "Erro",
          "Usuário não está autenticado."
        );

        return;
      }

      const resposta = await api.get(
        "/OrdemServico/minhas"
      );

      console.log(
        "Status da API:",
        resposta.status
      );

      console.log(
        "Minhas OS:",
        resposta.data
      );

      setListaOS(resposta.data);

    } catch (erro) {

      console.log(
        "========== ERRO AO BUSCAR OS =========="
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

        if (erro.response.status === 401) {

          Alert.alert(
            "Não autorizado",
            "Seu login expirou ou o token não foi enviado."
          );

        } else if (erro.response.status === 403) {

          Alert.alert(
            "Acesso negado",
            "Você não possui permissão para acessar essas OS."
          );

        } else {

          Alert.alert(
            "Erro",
            "Não foi possível carregar suas Ordens de Serviço."
          );

        }

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


  // ==============================
  // ATUALIZAR AUTOMATICAMENTE
  // ==============================

  useFocusEffect(
    useCallback(() => {

      getMinhasOS();

    }, [])
  );


  return (

    <View style={Style.container}>

      <View style={Style.content}>

        {/* =========================
            CABEÇALHO
        ========================== */}

        <View style={Style.header}>

          <View>

            <Text style={Style.hello}>
              Olá
            </Text>

            <Text style={Style.title}>
              Minhas OS's
            </Text>

          </View>


          {/* BOTÃO NOVA OS */}

          <TouchableOpacity
            style={Style.newButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("NovaOS")}
          >

            <Text style={Style.newButtonText}>
              Nova OS
            </Text>

          </TouchableOpacity>

        </View>


        {/* =========================
            FILTROS
        ========================== */}

        <View style={Style.filters}>

          {/* TODOS */}

          <TouchableOpacity
            style={[
              Style.filter,
              filtro === "Todos" && Style.activeFilter
            ]}
            onPress={() => setFiltro("Todos")}
          >

            <Text
              style={
                filtro === "Todos"
                  ? Style.activeFilterText
                  : Style.filterText
              }
            >
              Todos
            </Text>

          </TouchableOpacity>


          {/* ABERTAS */}

          <TouchableOpacity
            style={[
              Style.filter,
              filtro === "Aberta" && Style.activeFilter
            ]}
            onPress={() => setFiltro("Aberta")}
          >

            <Text
              style={
                filtro === "Aberta"
                  ? Style.activeFilterText
                  : Style.filterText
              }
            >
              Abertas
            </Text>

          </TouchableOpacity>


          {/* EM ANDAMENTO */}

          <TouchableOpacity
            style={[
              Style.filter,
              filtro === "Em Andamento" && Style.activeFilter
            ]}
            onPress={() => setFiltro("Em Andamento")}
          >

            <Text
              style={
                filtro === "Em Andamento"
                  ? Style.activeFilterText
                  : Style.filterText
              }
            >
              Em Andamento
            </Text>

          </TouchableOpacity>


          {/* CONCLUÍDAS */}

          <TouchableOpacity
            style={[
              Style.filter,
              filtro === "Concluída" && Style.activeFilter
            ]}
            onPress={() => setFiltro("Concluída")}
          >

            <Text
              style={
                filtro === "Concluída"
                  ? Style.activeFilterText
                  : Style.filterText
              }
            >
              Concluídas
            </Text>

          </TouchableOpacity>

        </View>


        {/* =========================
            LISTA
        ========================== */}

        <ScrollView
          style={Style.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Style.scrollContent}
        >

          {carregando ? (

            <Text>
              Carregando Ordens de Serviço...
            </Text>

          ) : listaFiltrada.length === 0 ? (

            <Text>
              Nenhuma Ordem de Serviço encontrada.
            </Text>

          ) : (

            listaFiltrada.map((os) => (

              <TouchableOpacity
                key={os.idOS}
                style={Style.card}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate(
                    "DetalheOS",
                    {
                      os: os
                    }
                  )
                }
              >

                {/* CABEÇALHO DO CARD */}

                <View style={Style.cardHeader}>

                  <Text style={Style.cardTitle}>
                    OS - {os.numeroOS}
                  </Text>


                  <View style={Style.badge}>

                    <Text style={Style.badgeText}>
                      {os.status}
                    </Text>

                  </View>

                </View>


                {/* TÍTULO */}

                <Text style={Style.cardSubtitle}>
                  {os.tituloProblema}
                </Text>


                {/* DESCRIÇÃO */}

                <Text style={Style.cardDescription}>
                  {os.descricaoProblema}
                </Text>

              </TouchableOpacity>

            ))

          )}

        </ScrollView>

      </View>


      {/* =========================
          FOOTER
      ========================== */}

     <Footer navigation={navigation} />

    </View>
  );
};