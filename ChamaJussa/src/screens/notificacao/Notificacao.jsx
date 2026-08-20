import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";

import { NotificStyle } from "./NotificacaoStyle";
import { Footer } from "../../components/footer/Footer";
import { api } from "../../services/api";

export const Notificacao = ({ navigation }) => {

  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const getNotificacoes = async () => {

    try {

      setCarregando(true);

      const resposta = await api.get("/Notificacao/minhas");

      console.log("Notificações:", resposta.data);

      setNotificacoes(resposta.data);

    } catch (erro) {

      console.log("Erro ao buscar notificações:", erro);

      Alert.alert(
        "Erro",
        "Não foi possível carregar suas notificações."
      );

    } finally {

      setCarregando(false);

    }
  };

  useEffect(() => {
    getNotificacoes();
  }, []);

  return (
    <View style={NotificStyle.container}>

      <Text style={NotificStyle.title}>
        Notificações
      </Text>

      <ScrollView
        style={NotificStyle.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={NotificStyle.scrollContent}
      >

        {carregando ? (

          <Text>
            Carregando notificações...
          </Text>

        ) : notificacoes.length === 0 ? (

          <Text>
            Você não possui notificações.
          </Text>

        ) : (

          notificacoes.map((notificacao) => (

            <TouchableOpacity
              key={notificacao.idNotificacao}
              style={[
                NotificStyle.notification,
                !notificacao.lida &&
                  NotificStyle.notificationSelected
              ]}
              activeOpacity={0.8}
            >

              <Text style={NotificStyle.icon}>
                ◀
              </Text>

              <View style={NotificStyle.notificationContent}>

                <Text style={NotificStyle.notificationTitle}>
                  {notificacao.titulo}
                </Text>

                <Text style={NotificStyle.description}>
                  {notificacao.mensagem}
                </Text>

                <View style={NotificStyle.dateContainer}>

                  <Text style={NotificStyle.date}>
                    OS: {notificacao.numeroOS}
                  </Text>

                </View>

              </View>

            </TouchableOpacity>

          ))

        )}

      </ScrollView>

      <Footer navigation={navigation} />

    </View>
  );
};