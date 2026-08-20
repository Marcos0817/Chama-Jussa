import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Style } from "./ListaOSStyle";
import { Footer } from "../../components/footer/Footer";
import { api } from "../../services/api";

export const ListaOS = ({ navigation }) => {

  const [listaOS, setListaOS] = useState([]);
  const [carregando, setCarregando] = useState(true);

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

        console.log(
          "Não houve resposta da API."
        );

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
    getMinhasOS();
  }, []);

  return (

    <View style={Style.container}>

      <View style={Style.content}>

        {/* HEADER */}

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


        {/* FILTROS */}

        <View style={Style.filters}>

          <TouchableOpacity
            style={[
              Style.filter,
              Style.activeFilter
            ]}
          >

            <Text style={Style.activeFilterText}>
              Todos
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={Style.filter}
          >

            <Text style={Style.filterText}>
              Abertas
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={Style.filter}
          >

            <Text style={Style.filterText}>
              Em Andamento
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={Style.filter}
          >

            <Text style={Style.filterText}>
              Concluídas
            </Text>

          </TouchableOpacity>

        </View>


        {/* LISTA DE OS */}

        <ScrollView
          style={Style.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Style.scrollContent}
        >

          {carregando ? (

            <Text>
              Carregando Ordens de Serviço...
            </Text>

          ) : listaOS.length === 0 ? (

            <Text>
              Você ainda não possui Ordens de Serviço.
            </Text>

          ) : (

            listaOS.map((os) => (

              <TouchableOpacity
                key={os.idOS}
                style={Style.card}
                activeOpacity={0.8}
              >

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


                <Text style={Style.cardSubtitle}>
                  {os.tituloProblema}
                </Text>


                <Text style={Style.cardDescription}>
                  {os.descricaoProblema}
                </Text>

              </TouchableOpacity>

            ))

          )}

        </ScrollView>

      </View>


      <Footer />

    </View>
  );
};