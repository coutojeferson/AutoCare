import { Maintenance } from '../types/maintenance';
import { getOilChangeMaintenances } from './getOilChangeMaintenances';

export function getLatestOilChange(
  maintenances: Maintenance[],
): Maintenance | undefined {
  return getOilChangeMaintenances(maintenances)[0];
}
