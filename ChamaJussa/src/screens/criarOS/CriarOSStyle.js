import { StyleSheet } from "react-native";

export const CriarStyle = StyleSheet.create({
  /* Tela */
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  /* Scroll */
  scroll: {
    paddingHorizontal: 26,
    paddingTop: 34,
    paddingBottom: 80,
  },

  /* Título */
  title: {
    fontSize: 21,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 24,
  },

  /* Card */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 27,
    paddingVertical: 27,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 3,
  },

  /* Labels */
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 9,
    marginTop: 0,
  },

  /* Campos */
  input: {
    height: 38,
    backgroundColor: '#F1F2F4',
    borderWidth: 1,
    borderColor: '#DCDDE0',
    borderRadius: 5,
    paddingHorizontal: 13,
    fontSize: 13,
    color: '#333333',
    marginBottom: 10,
  },

  /* Campo de descrição */
  descriptionInput: {
    height: 98,
    paddingTop: 11,
    marginBottom: 17,
  },

  /* Campo da imagem */
  imageInput: {
    height: 40,
    backgroundColor: '#F1F2F4',
    borderWidth: 1,
    borderColor: '#DCDDE0',
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 13,
    marginBottom: 25,
  },

  imageText: {
    fontSize: 13,
    color: '#999999',
  },

  /* Botão */
  button: {
    height: 43,
    backgroundColor: '#0DBB88',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.20,
    shadowRadius: 2,
    elevation: 3,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});