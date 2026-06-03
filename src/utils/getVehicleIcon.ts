import { MaterialCommunityIcons } from '@expo/vector-icons';

import { VehicleType } from '../types/vehicle';

export function getVehicleIcon(
  type: VehicleType,
): keyof typeof MaterialCommunityIcons.glyphMap {
  return type === 'motorcycle' ? 'motorbike' : 'car-side';
}
