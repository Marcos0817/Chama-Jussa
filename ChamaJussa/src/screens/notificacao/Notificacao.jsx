import React, {
  useCallback,
  useState
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";

import {
  useFocusEffect
} from "@react-navigation/native";

import { NotificStyle } from "./NotificacaoStyle";
import { Footer } from "../../components/footer/Footer";
import { api } from "../../services/api";


export const Notificacao = ({ navigation }) => {

  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);


  /*
   * BUSCAR NOTIFICAÇÕES
   */

  const getNotificacoes = async () => {

    try {

      setCarregando(true);

      const resposta = await api.get(
        "/Notificacao/minhas"
      );

      console.log(
        "Notificações:",
        resposta.data
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


  /*
   * ATUALIZA TODA VEZ QUE ENTRA NA TELA
   */

  useFocusEffect(
    useCallback(() => {

      getNotificacoes();

    }, [])
  );


  /*
   * MARCAR NOTIFICAÇÃO COMO LIDA
   */

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


      /*
       * Atualiza a tela imediatamente
       * sem precisar buscar tudo novamente
       */

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


  return (

    <View style={NotificStyle.container}>

      {/* TÍTULO */}

      <Text style={NotificStyle.title}>
        Notificações
      </Text>


      {/* CONTEÚDO */}

      <ScrollView
        style={NotificStyle.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={NotificStyle.scrollContent}
      >

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
              key={notificacao.idNotificacao}
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

                {/* ÍCONE */}

                <Text style={NotificStyle.icon}>
                  ◀
                </Text>


                {/* CONTEÚDO */}

                <View style={NotificStyle.notificationContent}>

                  <Text style={NotificStyle.notificationTitle}>
                    {notificacao.titulo}
                  </Text>


                  <Text style={NotificStyle.description}>
                    {notificacao.mensagem}
                  </Text>


                  <View style={NotificStyle.dateContainer}>

                    <Text style={NotificStyle.date}>
                      {notificacao.numeroOS
                        ? `OS-${notificacao.numeroOS}`
                        : ""
                      }
                    </Text>

                    <Text
                      style={[
                        NotificStyle.time,
                        !notificacao.lida &&
                          NotificStyle.unreadText
                      ]}
                    >
                      {notificacao.lida
                        ? "Lida"
                        : "Nova"
                      }
                    </Text>

                  </View>

                </View>

              </View>

            </TouchableOpacity>

          ))

        )}

      </ScrollView>


      {/* FOOTER */}

      <Footer navigation={navigation} />

    </View>
  );
};