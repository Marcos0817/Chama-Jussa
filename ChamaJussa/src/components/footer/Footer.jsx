import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  useSafeAreaInsets
} from 'react-native-safe-area-context';

import { FooterStyle } from './FooterStyle';

export const Footer = ({ navigation }) => {

  const insets = useSafeAreaInsets();

  const menu = [
    {
      nome: 'Minhas OS',
      icone: require('../../../assets/Vector (2).png'),
      rota: 'ListaOS',
    },
    {
      nome: 'Criar OS',
      icone: require('../../../assets/Vector (3).png'),
      rota: 'NovaOS',
    },
    {
      nome: 'Notificações',
      icone: require('../../../assets/Vector (4).png'),
      rota: 'Notificacao',
    },
    {
      nome: 'Perfil',
      icone: require('../../../assets/Vector (5).png'),
      rota: 'Perfil',
    },
  ];


  // ==============================
  // ROTA ATUAL
  // ==============================

  const estadoNavigation = navigation.getState();

  const rotaAtual =
    estadoNavigation.routes[
      estadoNavigation.index
    ]?.name;


  // ==============================
  // NAVEGAR
  // ==============================

  const handlePress = (rota) => {

    navigation.navigate(rota);

  };


  return (

    <View
      style={[
        FooterStyle.footer,
        {
          paddingBottom: Math.max(
            insets.bottom,
            8
          ),
        },
      ]}
    >

      {menu.map((item, index) => {

        const ativo = rotaAtual === item.rota;

        return (

          <TouchableOpacity
            key={index}
            style={FooterStyle.item}
            onPress={() => handlePress(item.rota)}
            activeOpacity={0.7}
          >

            <Image
              source={item.icone}
              resizeMode="contain"
              style={[
                FooterStyle.icone,

                ativo
                  ? FooterStyle.iconeAtivo
                  : FooterStyle.iconeInativo,
              ]}
            />

            <Text
              style={[
                FooterStyle.texto,

                ativo
                  ? FooterStyle.textoAtivo
                  : FooterStyle.textoInativo,
              ]}
            >
              {item.nome}
            </Text>

          </TouchableOpacity>

        );

      })}

    </View>
  );
};