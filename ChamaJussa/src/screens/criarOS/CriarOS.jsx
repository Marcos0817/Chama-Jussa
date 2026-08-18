import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { CriarStyle } from './CriarOSStyle';
import { Footer } from '../../components/footer/Footer';

export const CriarOS = () => {
  return (
    <View style={CriarStyle.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={CriarStyle.scroll}>

        <Text style={CriarStyle.title}>
          Criar ordem de serviço
        </Text>

        {/* Card */}
        <View style={CriarStyle.card}>

          {/* Título do problema */}
          <Text style={CriarStyle.label}>
            Título do problema *
          </Text>
          <TextInput
            style={CriarStyle.input}
            placeholder="Ex: Vazamento da pia"
            placeholderTextColor="#999"
          />

          {/* Máquina / Equipamento */}
          <Text style={CriarStyle.label}>
            Máquina / Equipamento *
          </Text>
          <TextInput
            style={CriarStyle.input}
            placeholder="Ex: Sifão/Tubulação"
            placeholderTextColor="#999"
          />

          {/* Local / Setor */}
          <Text style={CriarStyle.label}>
            Local / Setor *
          </Text>
          <TextInput
            style={CriarStyle.input}
            placeholder="Ex: Banheiro - Bloco B"
            placeholderTextColor="#999"
          />

          {/* Descrição */}
          <Text style={CriarStyle.label}>
            Descrição do problema *
          </Text>
          <TextInput
            style={[CriarStyle.input, CriarStyle.descriptionInput]}
            placeholder="Descreva o problema detalhadamente..."
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
          />

          {/* Imagem */}
          <Text style={CriarStyle.label}>
            Imagem / Foto do problema *
          </Text>
          <TouchableOpacity style={CriarStyle.imageInput}>
            <Text style={CriarStyle.imageText}>
              Insira imagem
            </Text>
          </TouchableOpacity>

          {/* Botão */}
          <TouchableOpacity style={CriarStyle.button}>
            <Text style={CriarStyle.buttonText}>
              Abrir Ordem de Serviço
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};