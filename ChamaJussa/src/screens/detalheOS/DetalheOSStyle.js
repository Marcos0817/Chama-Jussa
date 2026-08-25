import { StyleSheet } from "react-native";

export const DetalheStyle = StyleSheet.create({

  buttonsContainer: {
  marginTop: 21,
},

deleteButton: {
  height: 33,
  borderWidth: 1,
  borderColor: "#E53935",
  borderRadius: 5,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
},

deleteButtonText: {
  color: "#E53935",
  fontSize: 12,
  fontWeight: "600",
},

cancelButton: {
  height: 33,
  borderWidth: 1,
  borderColor: "#E53935",
  borderRadius: 5,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
},

cancelButtonText: {
  color: "#E53935",
  fontSize: 12,
  fontWeight: "600",
},

  noImage: {
  fontSize: 11,
  color: "#777777",
  marginBottom: 10,
},
    container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  scroll: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 18,
  },

 pageTitle: {
  fontSize: 19,
  fontWeight: "700",
  color: "#111111",
  textAlign: "center",
  marginTop: 36,
  marginBottom: 50,
},

  card: {
    
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 3,
  },

  osTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },

  date: {
    fontSize: 15,
    color: '#777777',
    marginBottom: 17,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  infoIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginTop: 4,
    marginRight: 9,
  },

  infoTextContainer: {
    flex: 1,
  },

  label: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 2,
  },

  value: {
    fontSize: 16,
    color: '#111111',
    lineHeight: 15,
  },

  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginTop: 3,
    marginBottom: 19,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 7,
    marginTop: 0,
  },

  description: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 14,
    marginBottom: 19,
  },

  problemImage: {
    width: '100%',
    height: 250,
    borderRadius: 3,
    marginTop: 0,
  },

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