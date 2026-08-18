import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FooterStyle } from './FooterStyle';

export const Footer = ({ onSelectTab }) => {
  const [selected, setSelected] = useState(0);

  const menu = [
    {
      nome: 'Minhas OS',
      icone: require('../../../assets/Vector (2).png'),
    },
    {
      nome: 'Criar OS',
      icone: require('../../../assets/Vector (3).png'),
    },
    {
      nome: 'Notificações',
      icone: require('../../../assets/Vector (4).png'),
    },
    {
      nome: 'Perfil',
      icone: require('../../../assets/Vector (5).png'),
    },
  ];

  const handlePress = (index) => {
    setSelected(index);
    if (onSelectTab) {
      onSelectTab(index);
    }
  };

  return (
    <View style={FooterStyle.footer}>
      {menu.map((item, index) => {
        const ativo = selected === index;

        return (
          <TouchableOpacity
            key={index}
            style={FooterStyle.item}
            onPress={() => handlePress(index)}
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