import { Maintenance } from '../types/maintenance';

export function getOilChangeMaintenances(
  maintenances: Maintenance[],
): Maintenance[] {
  return maintenances
    .filter((maintenance) => maintenance.type === 'oil_change')
    .sort((a, b) => b.lastKm - a.lastKm);
}
