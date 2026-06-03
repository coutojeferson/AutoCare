import { MaintenanceStatus } from "./getMaintenanceStatus";

export function getMaintenanceStatusLabel(status: MaintenanceStatus) {
  const labels = {
    ok: 'Em dia',
    soon: 'Próximo da troca',
    overdue: 'Troca vencida',
  };

  return labels[status.status];
}