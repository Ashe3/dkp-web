import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

export function useActionMutation(telegramId: string) {
  const client = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: { amount: number; note: string }) =>
      api.post('/actions', {
        ...data,
        targetTelegramId: telegramId,
        operatorId: user?.id,
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['history', telegramId] });
    },
  });
}
