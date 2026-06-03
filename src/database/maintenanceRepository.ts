import { db } from './database';
import { Maintenance, MaintenanceType } from '../types/maintenance';

type MaintenanceRow = {
  id: string 
  vehicle_id: string
  type: MaintenanceType
  last_km: number
  interval_km: number,
  created_at: string

}

export function getMaintenancesByVehicle(vehicleId: string): Maintenance[] {
  const rows = db.getAllSync(
    'SELECT * FROM maintenances WHERE vehicle_id = ? ORDER BY created_at DESC',
    [vehicleId]
  ) as MaintenanceRow[];

  return rows.map(row => ({
    id: row.id,
    vehicleId: row.vehicle_id,
    type: row.type,
    lastKm: row.last_km,
    intervalKm: row.interval_km,
    createdAt: row.created_at
  }))
}

export function saveMaintenance(maintenance: Maintenance): void {
  db.runSync(
    'INSERT INTO maintenances (id, vehicle_id, type, last_km, interval_km, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      maintenance.id,
      maintenance.vehicleId,
      maintenance.type,
      maintenance.lastKm,
      maintenance.intervalKm,
      maintenance.createdAt,
    ]
  );
}