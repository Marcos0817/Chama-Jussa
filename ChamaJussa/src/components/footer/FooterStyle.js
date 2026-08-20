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

  iconeAtivo: {
    opacity: 1,
  },

  texto: {
    fontSize: 9,
    color: "#777777",
    textAlign: "center",
  },

  textoAtivo: {
    color: "#087FF5",
    fontWeight: "700",
  },

});