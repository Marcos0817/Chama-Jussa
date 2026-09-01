import React, {
  useCallback,
  useState
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";

import {
  useFocusEffect
} from "@react-navigation/native";

import {
  SafeAreaProvider,
  SafeAreaView
} from "react-native-safe-area-context";

import { NotificStyle } from "./NotificacaoStyle";
import { Footer } from "../../components/footer/Footer";
import { api } from "../../services/api";


export const Notificacao = ({ navigation }) => {

  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);


  // =====================================================
  // FORMATAR DATA
  // =====================================================

  const formatarData = (data) => {

    if (!data) {
      return "Data não informada";
    }

    const dataObj = new Date(data);

    if (isNaN(dataObj.getTime())) {
      return "Data inválida";
    }

    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };


  // =====================================================
  // FORMATAR HORA
  // =====================================================

  const formatarHora = (data) => {

    if (!data) {
      return "--:--";
    }

    const dataObj = new Date(data);

    if (isNaN(dataObj.getTime())) {
      return "--:--";
    }

    return dataObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };


  // =====================================================
  // BUSCAR NOTIFICAÇÕES
  // =====================================================

  const getNotificacoes = async () => {

    try {

      setCarregando(true);

      const resposta = await api.get(
        "/Notificacao/minhas"
      );

      console.log(
        "===================================="
      );

      console.log(
        "Notificações:",
        resposta.data
      );

      console.log(
        "===================================="
      );

      setNotificacoes(resposta.data);

    } catch (erro) {

      console.log(
        "========== ERRO NOTIFICAÇÕES =========="
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
          "Não foi possível carregar as notificações."
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
  // ATUALIZA TODA VEZ QUE ENTRA NA TELA
  // =====================================================

  useFocusEffect(
    useCallback(() => {

      getNotificacoes();

    }, [])
  );


  // =====================================================
  // MARCAR NOTIFICAÇÃO COMO LIDA
  // =====================================================

  const marcarComoLida = async (notificacao) => {

    // Se já estiver lida, não precisa chamar a API
    if (notificacao.lida) {
      return;
    }

    try {

      await api.put(
        `/Notificacao/${notificacao.idNotificacao}/lida`
      );

      console.log(
        "Notificação marcada como lida:",
        notificacao.idNotificacao
      );


      // =================================================
      // ATUALIZA A TELA IMEDIATAMENTE
      // =================================================

      setNotificacoes((listaAtual) =>
        listaAtual.map((item) =>
          item.idNotificacao === notificacao.idNotificacao
            ? {
                ...item,
                lida: true
              }
            : item
        )
      );

    } catch (erro) {

      console.log(
        "Erro ao marcar notificação como lida:",
        erro
      );

      Alert.alert(
        "Erro",
        "Não foi possível marcar a notificação como lida."
      );

    }

  };


  // =====================================================
  // TELA
  // =====================================================

  return (

    <SafeAreaProvider>

      <SafeAreaView
        style={NotificStyle.container}
        edges={["top", "bottom"]}
      >

        {/* =================================================
            TÍTULO
        ================================================= */}

        <Text style={NotificStyle.title}>
          Notificações
        </Text>


        {/* =================================================
            CONTEÚDO
        ================================================= */}

        <ScrollView
          style={NotificStyle.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            NotificStyle.scrollContent
          }
        >

          {/* =================================================
              CARREGANDO
          ================================================= */}

          {carregando ? (

            <Text style={NotificStyle.loading}>
              Carregando notificações...
            </Text>

          ) : notificacoes.length === 0 ? (

            <Text style={NotificStyle.empty}>
              Você não possui notificações.
            </Text>

          ) : (

            notificacoes.map((notificacao) => (

              <TouchableOpacity

                key={
                  notificacao.idNotificacao
                }

                activeOpacity={0.8}

                onPress={() =>
                  marcarComoLida(notificacao)
                }

              >

                <View
                  style={[
                    NotificStyle.notification,

                    !notificacao.lida &&
                      NotificStyle.notificationSelected
                  ]}
                >

                  {/* =================================================
                      ÍCONE
                  ================================================= */}

                  <Image
                    source={require("../../../assets/bullhorn 1.png")}
                    style={NotificStyle.icon}
                    resizeMode="contain"
                  />


                  {/* =================================================
                      CONTEÚDO
                  ================================================= */}

                  <View
                    style={
                      NotificStyle.notificationContent
                    }
                  >

                    {/* =================================================
                        TÍTULO
                    ================================================= */}

                    <Text
                      style={
                        NotificStyle.notificationTitle
                      }
                    >

                      {notificacao.titulo}

                    </Text>


                    {/* =================================================
                        MENSAGEM
                    ================================================= */}

                    <Text
                      style={
                        NotificStyle.description
                      }
                    >

                      {notificacao.mensagem}

                    </Text>


                    {/* =================================================
                        DATA E HORA
                    ================================================= */}

                    <View
                      style={
                        NotificStyle.dateContainer
                      }
                    >

                      {/* ==============================
                          DATA
                      ============================== */}

                      <Text
                        style={
                          NotificStyle.date
                        }
                      >

                        {formatarData(
                          notificacao.dataCadastro
                        )}

                      </Text>


                      {/* ==============================
                          HORA
                      ============================== */}

                      <Text
                        style={[
                          NotificStyle.time,

                          !notificacao.lida &&
                            NotificStyle.unreadText
                        ]}
                      >

                        {formatarHora(
                          notificacao.dataCadastro
                        )}

                      </Text>

                    </View>

                  </View>

                </View>

              </TouchableOpacity>

            ))

          )}

        </ScrollView>

      </SafeAreaView>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer
        navigation={navigation}
      />

    </SafeAreaProvider>

  );

};