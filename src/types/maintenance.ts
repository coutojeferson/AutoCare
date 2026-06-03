export type MaintenanceType = 'oil_change';

export type Maintenance = {
  id: string;
  vehicleId: string;
  type: MaintenanceType;
  lastKm: number;
  intervalKm: number;
  createdAt: string;
};