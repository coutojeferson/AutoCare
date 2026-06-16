import { initDatabase } from '../../src/database/database';
import { saveVehicle } from '../../src/database/vehicleRepository';
import {
  saveMaintenance,
  getMaintenancesByVehicle,
} from '../../src/database/maintenanceRepository';
import { clearDatabase } from '../../__mocks__/expo-sqlite';
import { Vehicle } from '../../src/types/vehicle';
import { Maintenance } from '../../src/types/maintenance';

const mockVehicle: Vehicle = {
  id: 'vehicle-1',
  name: 'Honda Civic',
  type: 'car',
  currentKm: 50000,
  createdAt: '2024-01-01T00:00:00.000Z',
};

const mockMaintenance: Maintenance = {
  id: 'maintenance-1',
  vehicleId: 'vehicle-1',
  type: 'oil_change',
  lastKm: 50000,
  intervalKm: 5000,
  createdAt: '2024-01-01T00:00:00.000Z',
};

beforeEach(() => {
  initDatabase();
  clearDatabase();
});

describe('MaintenanceRepository', () => {
  it('should save a maintenance and retrieve it', () => {
    saveVehicle(mockVehicle);
    saveMaintenance(mockMaintenance);

    const maintenances = getMaintenancesByVehicle('vehicle-1');

    expect(maintenances).toHaveLength(1);
    expect(maintenances[0]).toEqual(mockMaintenance);
  });

  it('should return empty array when vehicle has no maintenances', () => {
    saveVehicle(mockVehicle);

    const maintenances = getMaintenancesByVehicle('vehicle-1');

    expect(maintenances).toHaveLength(0);
  });

  it('should return only maintenances of the given vehicle', () => {
    const otherVehicle: Vehicle = {
      id: 'vehicle-2',
      name: 'Toyota Corolla',
      type: 'car',
      currentKm: 30000,
      createdAt: '2024-01-02T00:00:00.000Z',
    };

    const otherMaintenance: Maintenance = {
      id: 'maintenance-2',
      vehicleId: 'vehicle-2',
      type: 'oil_change',
      lastKm: 30000,
      intervalKm: 5000,
      createdAt: '2024-01-02T00:00:00.000Z',
    };

    saveVehicle(mockVehicle);
    saveVehicle(otherVehicle);
    saveMaintenance(mockMaintenance);
    saveMaintenance(otherMaintenance);

    const maintenances = getMaintenancesByVehicle('vehicle-1');

    expect(maintenances).toHaveLength(1);
    expect(maintenances[0].vehicleId).toBe('vehicle-1');
  });
});