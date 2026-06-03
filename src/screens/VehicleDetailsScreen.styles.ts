import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 20,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  iconCircleLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  currentKm: {
    fontSize: 14,
    color: '#666',
  },
  currentKmValue: {
    fontWeight: '700',
    color: '#000',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: '#FFF',
  },
  outlineButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  statusBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusDot: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 0.1
  },
  boxLabel : {
    marginLeft: 16,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusSubtext: {
    flex: 1,
    fontSize: 13,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginBottom: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 20,
  },
  primaryButtonSpaced: {
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timeline: {
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 56,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#DDD',
    marginTop: 4,
    minHeight: 32,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineKm: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  timelineType: {
    fontSize: 13,
    color: '#666',
  },
  timelineDate: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  cancelButton: {
    padding: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#555',
    fontWeight: '600',
  },
});
