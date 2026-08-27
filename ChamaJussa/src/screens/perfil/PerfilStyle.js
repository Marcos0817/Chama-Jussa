
import { StyleSheet } from "react-native";


export const PerfilStyle = StyleSheet.create({

  // =====================================================
  // CONTAINER PRINCIPAL
  // =====================================================

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },


  // =====================================================
  // TÍTULO
  // =====================================================

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
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
  },


  // =====================================================
  // AVATAR
  // =====================================================

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#087FF5",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 5,
  },


  // =====================================================
  // EMAIL
  // =====================================================

  email: {
    fontSize: 12,
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
  // INFORMAÇÕES
  // =====================================================

  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    padding: 15,
    marginBottom: 10,
  },


  label: {
    fontSize: 11,
    color: "#888888",
    marginBottom: 5,
  },


  value: {
    fontSize: 13,
    color: "#111111",
  },


  // =====================================================
  // BOTÃO SAIR
  // =====================================================

  logoutButton: {
    height: 42,
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },


  logoutText: {
    color: "#E53935",
    fontSize: 13,
    fontWeight: "600",
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

