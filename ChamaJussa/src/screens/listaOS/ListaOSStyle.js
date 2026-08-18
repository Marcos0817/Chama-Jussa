import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 22,
    paddingTop: 32,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hello: {
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },

  title: {
    fontSize: 21,
    fontWeight: '700',
    color: '#111',
  },

  newButton: {
    backgroundColor: '#087FF5',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 5,
  },

  newButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },

  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap",
    gap: 8,
    marginTop: 20,
    marginBottom: 10,
  },

  filter: {
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
  },

  activeFilter: {
    backgroundColor: '#087FF5',
    borderColor: '#087FF5',
  },

  filterText: {
    color: '#B4B4B4',
    fontSize: 13,
  },

  activeFilterText: {
    color: '#FFFFFF',
    fontSize: 13,
  },

  
  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  /* Card */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 10,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#087FF5',
  },

  badge: {
    backgroundColor: '#DDF0FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    color: '#087FF5',
    fontSize: 13,
    fontWeight: '600',
  },

  cardSubtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },

  cardDescription: {
    fontSize: 13,
    color: '#777777',
    lineHeight: 18,
  },
});