export function formatDate(createdAt?: string, id?: string) {
  if (createdAt) {
    return new Date(createdAt).toLocaleDateString('pt-BR');
  }

  const timestamp = Number(id);

  if (!Number.isNaN(timestamp) && timestamp > 1_000_000_000_000) {
    return new Date(timestamp).toLocaleDateString('pt-BR');
  }

  return '—';
}
