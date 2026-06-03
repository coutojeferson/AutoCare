import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#000',
  },
  typeText: {
    color: '#000',
  },
  typeTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
});
