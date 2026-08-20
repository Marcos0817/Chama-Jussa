import { StyleSheet } from "react-native";

export const NotificStyle = StyleSheet.create({
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
    marginBottom: 40,
  },

  notification: {
    backgroundColor: '#FFFFFF',
    minHeight: 122,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  icon: {
    fontSize: 28,
    color: '#55D4F5',
    width: 34,
    textAlign: 'center',
    marginRight: 11,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    color: '#777777',
    lineHeight: 17,
    marginBottom: 5,
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  date: {
    fontSize: 13,
    color: '#777777',
  },

  time: {
    fontSize: 13,
    color: '#777777',
  },
});