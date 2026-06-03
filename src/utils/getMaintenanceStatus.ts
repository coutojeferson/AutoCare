export type MaintenanceStatus = {status: 'ok', color: "green"} | {status: 'soon', color:'#F59E0B'} | {status: 'overdue', color: "red"};

export function getMaintenanceStatus(
  remainingKm: number
): MaintenanceStatus {

  if (remainingKm <= 0) {
   return {
     status: 'overdue',
     color: 'red'
   }
  }

  if (remainingKm <= 500) {
    return { status: 'soon', color: '#F59E0B' };
  }

  return { status: 'ok', color: 'green' };
}