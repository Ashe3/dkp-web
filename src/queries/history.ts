import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

type HistoryItem = {
  id: number;
  amount: number;
  createdAt: string;
  event: {
    title: string;
  };
};

export const useUserHistory = (telegramId: string, take: number = 10) => {
  return useQuery<HistoryItem[]>({
    queryKey: ['history', telegramId, take],
    queryFn: async () => {
      const res = await api.get(`/users/${telegramId}/history/${take}`);
      return res.data;
    },
    enabled: !!telegramId,
  });
};
