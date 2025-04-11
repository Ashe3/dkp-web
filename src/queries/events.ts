import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export type Event = {
  id: number;
  title: string;
  reward: number;
  comment?: string;
  code: string;
  expiresAt: string;
  createdAt: string;
};

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await api.get('/events');
      return res.data;
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      reward: number;
      comment?: string;
      durationMinutes: number;
    }) => {
      const res = await api.post('/events', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
