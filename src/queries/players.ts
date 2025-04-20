import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface Player {
  id: number;
  username: string;
  dkp: number;
  bs: number;
  multiplier: number;
  telegramId: string;
  isBanned: boolean;
  weeklyCheckins: number;
}

export const usePlayers = () =>
  useQuery<Player[]>({
    queryKey: ['players'],
    queryFn: async () => {
      const res = await api.get('/users');
      return res.data;
    },
  });

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; username: string; bs: number }) => {
      await api.patch(`/users/${data.id}`, {
        username: data.username,
        bs: data.bs,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
};

export const useToggleBanPlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, banned }: { id: string; banned: boolean }) => {
      await api.patch(`/users/${id}`, { banned });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
};
