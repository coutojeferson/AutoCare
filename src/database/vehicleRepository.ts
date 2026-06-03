import { db } from "./database";
import { Vehicle, VehicleType } from "../types/vehicle";

type VehicleRow = {
  id: string;
  name: string;
  type: VehicleType;
  current_km: number;
  created_at: string;
}

export function getAllVehicles(): Vehicle[] {
  const rows = db.getAllSync('SELECT * FROM vehicles ORDER BY created_at DESC') as VehicleRow[];
  
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    type: row.type,
    currentKm: row.current_km,
    createdAt: row.created_at,
  }));
}

export function saveVehicle(vehicle: Vehicle): void {
  db.runSync(
    'INSERT INTO vehicles (id, name, type, current_km, created_at) VALUES (?, ?, ?, ?, ?)',
    [vehicle.id, vehicle.name, vehicle.type, vehicle.currentKm, vehicle.createdAt]
  );
}

export function updateVehicleKm(id: string, currentKm: number): void {
  db.runSync(
    'UPDATE vehicles SET current_km = ? WHERE id = ?',
    [currentKm, id]
  );
}

export function deleteVehicle(id: string): void {
  db.runSync('DELETE FROM vehicles WHERE id = ?', [id])
}