import { StyleSheet } from "react-native";

export const DetalheStyle = StyleSheet.create({
         container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },


  scroll: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 18,
  },


  /* Título da página */

  pageTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',

    textAlign: 'center',

    marginBottom: 20,
  },


  /* Card */

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 7,

    padding: 20,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.18,
    shadowRadius: 2,

    elevation: 3,
  },


  /* Título da OS */

  osTitle: {
    fontSize: 14,

    fontWeight: '700',

    color: '#111111',

    marginBottom: 4,
  },


  date: {
    fontSize: 11,

    color: '#777777',

    marginBottom: 17,
  },


  /* Informações */

  infoRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginBottom: 12,
  },


  infoIcon: {
    width: 16,
    height: 16,

    resizeMode: 'contain',

    marginTop: 4,

    marginRight: 9,
  },


  infoTextContainer: {
    flex: 1,
  },


  label: {
    fontSize: 11,

    color: '#888888',

    marginBottom: 2,
  },


  value: {
    fontSize: 12,

    color: '#111111',

    lineHeight: 15,
  },


  /* Linha */

  divider: {
    height: 1,

    backgroundColor: '#D9D9D9',

    marginTop: 3,
    marginBottom: 19,
  },


  /* Seções */

  sectionTitle: {
    fontSize: 14,

    fontWeight: '700',

    color: '#111111',

    marginBottom: 7,

    marginTop: 0,
  },


  description: {
    fontSize: 11,

    color: '#444444',

    lineHeight: 14,

    marginBottom: 19,
  },


  /* Foto */

  problemImage: {
    width: '100%',

    height: 91,

    borderRadius: 3,

    marginTop: 0,
  },


  /* Botão */

  editButton: {
    height: 33,

    borderWidth: 1,

    borderColor: '#087FF5',

    borderRadius: 5,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 21,
  },


  editButtonText: {
    color: '#087FF5',

    fontSize: 12,

    fontWeight: '600',
  },

})