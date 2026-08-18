import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { DetalheStyle } from "./DetalheOSStyle";
import { Footer } from '../../components/footer/Footer';

export const DetalheOS = () => {
  return (
    <View style={DetalheStyle.container}>
      
      
      <Text style={DetalheStyle.pageTitle}>
        Detalhes da OS-001
      </Text>

     
      <ScrollView
        style={DetalheStyle.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={DetalheStyle.scrollContent}
      >
        <View style={DetalheStyle.card}>
          <Text style={DetalheStyle.osTitle}>
            Vazamento hidráulico
          </Text>

          <Text style={DetalheStyle.date}>
            Criada em 17/06/2026, 11:29:58
          </Text>

          {/* Item 1 */}
          <View style={DetalheStyle.infoRow}>
            <Image
              source={require('../../../assets/Vector (6).png')}
              style={DetalheStyle.infoIcon}
              resizeMode="contain"
            />
            <View style={DetalheStyle.infoTextContainer}>
              <Text style={DetalheStyle.label}>
                Máquina / Equipamento
              </Text>
              <Text style={DetalheStyle.value}>
                Tubulação/Sifão da Pia
              </Text>
            </View>
          </View>

          {/* Item 2*/}
          <View style={DetalheStyle.infoRow}>
            <Image
              source={require('../../../assets/Vector (7).png')}
              style={DetalheStyle.infoIcon}
              resizeMode="contain"
            />
            <View style={DetalheStyle.infoTextContainer}>
              <Text style={DetalheStyle.label}>
                Local / Setor
              </Text>
              <Text style={DetalheStyle.value}>
                Banheiro Masculino -{'\n'}
                Bloco B - 2º Andar
              </Text>
            </View>
          </View>

          {/* Item 3 */}
          <View style={DetalheStyle.infoRow}>
            <Image
              source={require('../../../assets/Vector (8).png')}
              style={DetalheStyle.infoIcon}
              resizeMode="contain"
            />
            <View style={DetalheStyle.infoTextContainer}>
              <Text style={DetalheStyle.label}>
                Solicitante
              </Text>
              <Text style={DetalheStyle.value}>
                Késsia Milena
              </Text>
            </View>
          </View>

          <View style={DetalheStyle.divider} />

          <Text style={DetalheStyle.sectionTitle}>
            Descrição do Problema
          </Text>

          <Text style={DetalheStyle.description}>
            Há um vazamento constante de água por baixo da pia do banheiro
            masculino do segundo andar do Bloco B. Está alagando o chão e
            causando risco de queda.
          </Text>

          <Text style={DetalheStyle.sectionTitle}>
            Foto do Problema
          </Text>

          <Image
            source={require('../../../assets/cadeiraquebrada.jpg')}
            style={DetalheStyle.problemImage}
            resizeMode="cover"
          />

          <TouchableOpacity style={DetalheStyle.editButton}>
            <Text style={DetalheStyle.editButtonText}>
              Editar Solicitação
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};