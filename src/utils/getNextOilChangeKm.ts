import { Maintenance } from '../types/maintenance';

export function getNextOilChangeKm(latestOilChange: Maintenance) {
  return latestOilChange.lastKm + latestOilChange.intervalKm;
}
