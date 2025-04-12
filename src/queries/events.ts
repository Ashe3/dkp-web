import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

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
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      reward: number;
      comment?: string;
      durationMinutes: number;
    }) => {
      const res = await api.post('/events', { ...data, createdById: user?.id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};
