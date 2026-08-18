import { StyleSheet } from 'react-native';

export const PerfilStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  scroll: {
    paddingHorizontal: 26,
    paddingTop: 34,
    paddingBottom: 20,
  },

  title: {
    fontSize: 21,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 30,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20, 

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },

  email: {
    fontSize: 14,
    color: '#777777',
  },

  logoutButton: {
    backgroundColor: '#FF4D4D',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});