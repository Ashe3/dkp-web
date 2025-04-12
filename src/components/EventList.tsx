import { useState } from 'react';
import { useEvents } from '../queries/events';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function EventList() {
  const { data: events } = useEvents();
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const selectedEvent = events?.find((e) => e.id === selectedEventId);

  const { data: users } = useQuery({
    queryKey: ['event-users', selectedEvent?.code],
    queryFn: async () => {
      const res = await api.get(`/events/${selectedEvent?.code}/users`);
      return res.data;
    },
    enabled: !!selectedEvent?.code,
  });

  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const totalPages = events ? Math.ceil(events.length / itemsPerPage) : 1;
  const paginatedEvents = events?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="w-full md:w-2/3">
      <h2 className="text-xl font-semibold mb-4">Events</h2>
      <div className="flex flex-col gap-4">
        {(selectedEvent ? [selectedEvent] : paginatedEvents)?.map((event) => {
          const isExpired = new Date(event.expiresAt) < new Date();

          return (
            <div
              key={event.id}
              className={`w-full border rounded p-4 shadow-sm cursor-pointer ${
                isExpired ? 'bg-gray-200 opacity-60 text-gray-600' : 'bg-white'
              }`}
              onClick={() =>
                selectedEventId === event.id
                  ? setSelectedEventId(null)
                  : setSelectedEventId(event.id)
              }
            >
              <div className="font-bold text-lg">{event.title}</div>
              <div className="text-gray-700">Reward: {event.reward}</div>
              {event.comment && (
                <div className="text-sm text-gray-500 italic">
                  {event.comment}
                </div>
              )}
              <div className="text-xs text-gray-400 mt-2">
                Code: {event.code} <br />
                Expires at: {new Date(event.expiresAt).toLocaleString()}
              </div>

              {selectedEventId === event.id && users && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">
                    Users who claimed:
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-800">
                    {users.map((user: string) => (
                      <div
                        key={user}
                        className="border rounded px-2 py-1 bg-gray-100"
                      >
                        {user}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {totalPages > 1 && !selectedEvent && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 py-1">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
