export function getRemainingKmMessage(remainingKm: number) {
  if (remainingKm > 0) {
    return `Faltam ${remainingKm.toLocaleString('pt-BR')} km para a próxima troca`;
  }

  return 'A troca de óleo está vencida';
}
