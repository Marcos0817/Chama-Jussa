import { StyleSheet } from "react-native";

export const PerfilStyle = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 30,
  },

  loading: {
    textAlign: "center",
    marginTop: 30,
    color: "#666666",
  },

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

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#087FF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
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
},

avatarText: {
  color: "#FFFFFF",
  fontSize: 30,
  fontWeight: "700",
},

    // importante
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

  nome: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 5,
  },

  email: {
    fontSize: 12,
    color: "#777777",
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 10,
  },

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

});