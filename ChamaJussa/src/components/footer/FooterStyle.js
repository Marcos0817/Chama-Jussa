import { StyleSheet } from "react-native";

export const FooterStyle = StyleSheet.create({

  footer: {
    flexDirection: "row",

    backgroundColor: "#FFFFFF",

    minHeight: 65,

    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",

    elevation: 8,

    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 3,

    alignItems: "center",
    justifyContent: "space-around",
  },


  item: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingTop: 7,
  },


  icone: {
    width: 21,
    height: 21,

    marginBottom: 4,
  },


  // ==============================
  // ÍCONE ATIVO
  // ==============================

  iconeAtivo: {
    tintColor: "#087FF5",
    opacity: 1,
  },


  // ==============================
  // ÍCONE INATIVO
  // ==============================

  iconeInativo: {
    tintColor: "#777777",
    opacity: 1,
  },


  // ==============================
  // TEXTO
  // ==============================

  texto: {
    fontSize: 9,
    textAlign: "center",
  },


  // TEXTO ATIVO

  textoAtivo: {
    color: "#087FF5",
    fontWeight: "700",
  },


  // TEXTO INATIVO

  textoInativo: {
    color: "#777777",
    fontWeight: "400",
  },

});