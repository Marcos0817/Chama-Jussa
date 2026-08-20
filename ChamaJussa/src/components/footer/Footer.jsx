import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FooterStyle } from './FooterStyle';

export const Footer = ({ navigation }) => {

  const [selected, setSelected] = useState(0);

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

  const handlePress = (index, rota) => {

    setSelected(index);

    navigation.navigate(rota);
  };

  return (

    <View
      style={[
        FooterStyle.footer,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >

      {menu.map((item, index) => {

        const ativo = selected === index;

        return (

          <TouchableOpacity
            key={index}
            style={FooterStyle.item}
            onPress={() => handlePress(index, item.rota)}
            activeOpacity={0.7}
          >

            <Image
              source={item.icone}
              resizeMode="contain"
              style={[
                FooterStyle.icone,
                ativo && FooterStyle.iconeAtivo,
              ]}
            />

            <Text
              style={[
                FooterStyle.texto,
                ativo && FooterStyle.textoAtivo,
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