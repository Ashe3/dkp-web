import { useState } from 'react';
import { useCreateEvent } from '../queries/events';

export default function EventCreateForm() {
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState(1);
  const [comment, setComment] = useState('');
  const [duration, setDuration] = useState(5);

  const { mutate: createEvent } = useCreateEvent();

  const handleCreate = () => {
    if (!title) return;
    createEvent({ title, reward, comment, durationMinutes: duration });
    setTitle('');
    setReward(1);
    setComment('');
    setDuration(5);
  };

  return (
    <div className="w-full md:w-1/3">
      <h1 className="text-xl font-bold mb-4">Create Event</h1>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded mb-2"
        required
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">Reward (DKP)</label>
      <input
        value={reward}
        onChange={(e) => setReward(Number(e.target.value))}
        type="number"
        min={1}
        placeholder="Reward"
        className="w-full border p-2 rounded mb-2"
        required
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
      <input
        value={duration}
        onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
        type="number"
        min={1}
        placeholder="Duration (minutes)"
        className="w-full border p-2 rounded mb-2"
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment"
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!title || reward <= 0}
      >
        Create
      </button>
    </div>
  );
}
