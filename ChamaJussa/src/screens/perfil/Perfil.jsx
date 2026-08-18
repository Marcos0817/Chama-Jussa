import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { PerfilStyle } from "./PerfilStyle";
import { Footer } from '../../components/footer/Footer';

export const Perfil = () => {
  return (
    <View style={PerfilStyle.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={PerfilStyle.scroll}
      >
        <Text style={PerfilStyle.title}>
          Perfil
        </Text>

        {/* Card do Perfil */}
        <View style={PerfilStyle.profileCard}>
          <Image
            source={require('../../../assets/Ellipse 1.png')}
            style={PerfilStyle.profileImage}
          />

          <Text style={PerfilStyle.name}>
            Késsia Milena
          </Text>

          <Text style={PerfilStyle.email}>
            kessia@email.com
          </Text>
        </View>

        {/* Botão Vermelho colado no Card */}
        <TouchableOpacity 
          style={PerfilStyle.logoutButton}
          activeOpacity={0.8}
        >
          <Text style={PerfilStyle.logoutButtonText}>
            Sair da Conta
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <Footer activeIndex={3} />
    </View>
  );
};