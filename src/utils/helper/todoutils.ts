export function statusColor(status: string) {
  if (status === 'low') return 'bg-green-600';
  if (status === 'medium') return 'bg-violet-500';
  if (status === 'high') return 'bg-red-600';
}