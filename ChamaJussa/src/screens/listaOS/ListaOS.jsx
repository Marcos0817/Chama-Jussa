import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { Style } from "./ListaOSStyle";
import { Footer } from "../../components/footer/Footer";

export const ListaOS = () => {
  return (
    <View style={Style.container}>
      <View style={Style.content}>
        
       
        <View style={Style.header}>
          <View>
            <Text style={Style.hello}>Olá, Késsia</Text>
            <Text style={Style.title}>Minhas OS's</Text>
          </View>

          <TouchableOpacity style={Style.newButton} activeOpacity={0.8}>
            <Text style={Style.newButtonText}>Nova OS</Text>
          </TouchableOpacity>
        </View>

      
        <View style={Style.filters}>
          <TouchableOpacity style={[Style.filter, Style.activeFilter]}>
            <Text style={Style.activeFilterText}>Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={Style.filter}>
            <Text style={Style.filterText}>Abertas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={Style.filter}>
            <Text style={Style.filterText}>Em Andamento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={Style.filter}>
            <Text style={Style.filterText}>Concluídas</Text>
          </TouchableOpacity>
        </View>

     
        <ScrollView 
          style={Style.scroll} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Style.scrollContent}
        >
          <TouchableOpacity style={Style.card} activeOpacity={0.8}>
            <View style={Style.cardHeader}>
              <Text style={Style.cardTitle}>OS - 001</Text>
              <View style={Style.badge}>
                <Text style={Style.badgeText}>Aberta</Text>
              </View>
            </View>

            <Text style={Style.cardSubtitle}>
              Vazamento hidráulico no Bloco B
            </Text>

            <Text style={Style.cardDescription}>
              Há um vazamento constante de água por baixo da pia do banheiro
              masculino do segundo andar do Bloco B...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.card} activeOpacity={0.8}>
            <View style={Style.cardHeader}>
              <Text style={Style.cardTitle}>OS - 001</Text>
              <View style={Style.badge}>
                <Text style={Style.badgeText}>Aberta</Text>
              </View>
            </View>

            <Text style={Style.cardSubtitle}>
              Vazamento hidráulico no Bloco B
            </Text>

            <Text style={Style.cardDescription}>
              Há um vazamento constante de água por baixo da pia do banheiro
              masculino do segundo andar do Bloco B...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.card} activeOpacity={0.8}>
            <View style={Style.cardHeader}>
              <Text style={Style.cardTitle}>OS - 001</Text>
              <View style={Style.badge}>
                <Text style={Style.badgeText}>Aberta</Text>
              </View>
            </View>

            <Text style={Style.cardSubtitle}>
              Vazamento hidráulico no Bloco B
            </Text>

            <Text style={Style.cardDescription}>
              Há um vazamento constante de água por baixo da pia do banheiro
              masculino do segundo andar do Bloco B...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.card} activeOpacity={0.8}>
            <View style={Style.cardHeader}>
              <Text style={Style.cardTitle}>OS - 001</Text>
              <View style={Style.badge}>
                <Text style={Style.badgeText}>Aberta</Text>
              </View>
            </View>

            <Text style={Style.cardSubtitle}>
              Vazamento hidráulico no Bloco B
            </Text>

            <Text style={Style.cardDescription}>
              Há um vazamento constante de água por baixo da pia do banheiro
              masculino do segundo andar do Bloco B...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.card} activeOpacity={0.8}>
            <View style={Style.cardHeader}>
              <Text style={Style.cardTitle}>OS - 001</Text>
              <View style={Style.badge}>
                <Text style={Style.badgeText}>Aberta</Text>
              </View>
            </View>

            <Text style={Style.cardSubtitle}>
              Vazamento hidráulico no Bloco B
            </Text>

            <Text style={Style.cardDescription}>
              Há um vazamento constante de água por baixo da pia do banheiro
              masculino do segundo andar do Bloco B...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.card} activeOpacity={0.8}>
            <View style={Style.cardHeader}>
              <Text style={Style.cardTitle}>OS - 001</Text>
              <View style={Style.badge}>
                <Text style={Style.badgeText}>Aberta</Text>
              </View>
            </View>

            <Text style={Style.cardSubtitle}>
              Vazamento hidráulico no Bloco B
            </Text>

            <Text style={Style.cardDescription}>
              Há um vazamento constante de água por baixo da pia do banheiro
              masculino do segundo andar do Bloco B...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.card} activeOpacity={0.8}>
            <View style={Style.cardHeader}>
              <Text style={Style.cardTitle}>OS - 001</Text>
              <View style={Style.badge}>
                <Text style={Style.badgeText}>Aberta</Text>
              </View>
            </View>

            <Text style={Style.cardSubtitle}>
              Vazamento hidráulico no Bloco B
            </Text>

            <Text style={Style.cardDescription}>
              Há um vazamento constante de água por baixo da pia do banheiro
              masculino do segundo andar do Bloco B...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.card} activeOpacity={0.8}>
            <View style={Style.cardHeader}>
              <Text style={Style.cardTitle}>OS - 001</Text>
              <View style={Style.badge}>
                <Text style={Style.badgeText}>Aberta</Text>
              </View>
            </View>

            <Text style={Style.cardSubtitle}>
              Vazamento hidráulico no Bloco B
            </Text>

            <Text style={Style.cardDescription}>
              Há um vazamento constante de água por baixo da pia do banheiro
              masculino do segundo andar do Bloco B...
            </Text>
          </TouchableOpacity>
        </ScrollView>

      </View>

      <Footer />
    </View>
  );
};