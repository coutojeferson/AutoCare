import { clearDatabase } from '../../__mocks__/expo-sqlite';
import { initDatabase } from '../../src/database/database';
import {
  saveVehicle,
  getAllVehicles,
  updateVehicleKm,
  deleteVehicle,
} from '../../src/database/vehicleRepository';
import { Vehicle } from '../../src/types/vehicle';

const mockVehicle: Vehicle = {
  id: 'vehicle-1',
  name: 'Honda Civic',
  type: 'car',
  currentKm: 50000,
  createdAt: '2024-01-01T00:00:00.000Z',
};

beforeEach(() => {
  initDatabase();
  clearDatabase();
});

describe('VehicleRepository', () => {
  it('should save a vehicle and retrieve it', () => {
    saveVehicle(mockVehicle);

    const vehicles = getAllVehicles();

    expect(vehicles).toHaveLength(1);
    expect(vehicles[0]).toEqual(mockVehicle);
  });

  it('should return empty array when no vehicles exist', () => {
    const vehicles = getAllVehicles();

    expect(vehicles).toHaveLength(0);
  });

  it('should update vehicle km', () => {
    saveVehicle(mockVehicle);
    updateVehicleKm('vehicle-1', 60000);

    const vehicles = getAllVehicles();

    expect(vehicles[0].currentKm).toBe(60000);
  });

  it('should delete a vehicle', () => {
    saveVehicle(mockVehicle);
    deleteVehicle('vehicle-1');

    const vehicles = getAllVehicles();

    expect(vehicles).toHaveLength(0);
  });
});