import { VehicleType } from '../types/vehicle';

export function getVehicleTypeLabel(type: VehicleType) {
  return type === 'motorcycle' ? 'Moto' : 'Carro';
}
