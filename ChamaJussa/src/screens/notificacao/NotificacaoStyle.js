import { StyleSheet } from "react-native";

export const NotificStyle = StyleSheet.create({

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

  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#666666",
    fontSize: 13,
  },

  notification: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 2,
  },

  notificationSelected: {
    borderLeftWidth: 4,
    borderLeftColor: "#087FF5",
  },

  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
    marginTop: 6,
    resizeMode: "contain",
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
  },

  description: {
    fontSize: 11,
    color: "#555555",
    lineHeight: 16,
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  date: {
    fontSize: 10,
    color: "#888888",
  },

  time: {
    fontSize: 10,
    color: "#888888",
  },

  unreadText: {
    color: "#087FF5",
    fontWeight: "500",
  },

});