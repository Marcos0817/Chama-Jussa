
import { StyleSheet } from "react-native";


export const PerfilStyle = StyleSheet.create({

  // =====================================================
  // CONTAINER PRINCIPAL
  // =====================================================

  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },


  // =====================================================
  // TÍTULO
  // =====================================================

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111111",
    marginLeft: 26,
    marginTop: 20,
    marginBottom: 20,
  },


  // =====================================================
  // SCROLL
  // =====================================================

  scroll: {
    flex: 1,
  },


  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 30,
  },


  // =====================================================
  // CARREGANDO
  // =====================================================

  loading: {
    textAlign: "center",
    marginTop: 30,
    color: "#666666",
  },


  // =====================================================
  // CARD DO USUÁRIO
  // =====================================================

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 25,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 3,
    marginBottom: 20,
    height: 300
  },


  // =====================================================
  // AVATAR
  // =====================================================

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: "#087FF5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 12,
    overflow: "hidden",
  },


  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },


  avatarText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },


  // =====================================================
  // NOME
  // =====================================================

  nome: {
    fontSize: 25,
    fontWeight: "700",
    color: "#111111",
    marginTop: 25,
    marginBottom: 5,
  },


  // =====================================================
  // EMAIL
  // =====================================================

  email: {
    fontSize: 15,
    color: "#777777",
  },


  // =====================================================
  // SEÇÃO
  // =====================================================

  section: {
    marginBottom: 20,
  },


  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 10,
  },



 // =====================================================
// BOTÃO SAIR
// =====================================================

logoutButton: {
  height: 54,
  backgroundColor: "#EF4444",
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,

  
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,

 
  elevation: 5,
},

logoutText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "700",
},


  // =====================================================
  // MODAL DA FOTO
  // =====================================================

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    justifyContent: "center",
    alignItems: "center",
  },


  // =====================================================
  // FOTO EXPANDIDA
  // =====================================================

  expandedImage: {
    width: "90%",
    height: "70%",
  },


  // =====================================================
  // BOTÃO FECHAR
  // =====================================================

  closeButton: {
    position: "absolute",
    top: 50,
    right: 25,
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },


  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },

});

