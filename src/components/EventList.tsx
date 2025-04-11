import { useEvents } from '../queries/events';

export default function EventList() {
  const { data: events } = useEvents();

  return (
    <div className="w-full md:w-2/3">
      <h2 className="text-xl font-semibold mb-4">Events</h2>
      <div className="flex flex-col gap-4">
        {events?.map((event) => {
          const isExpired = new Date(event.expiresAt) < new Date();

          return (
            <div
              key={event.id}
              className={`w-full border rounded p-4 shadow-sm ${
                isExpired ? 'bg-gray-200 opacity-60 text-gray-600' : 'bg-white'
              }`}
            >
              <div className="font-bold text-lg">{event.title}</div>
              <div className="text-gray-700">Reward: {event.reward}</div>
              {event.comment && (
                <div className="text-sm text-gray-500 italic">{event.comment}</div>
              )}
              <div className="text-xs text-gray-400 mt-2">
                Code: {event.code} <br />
                Expires at: {new Date(event.expiresAt).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
