import { useState } from 'react';
import { useActionMutation } from '../queries/actions';

type Props = {
  telegramId: string;
};

export default function DKPActions({ telegramId }: Props) {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const mutation = useActionMutation(telegramId);

  const handleSubmit = () => {
    if (!note || amount === 0) return;
    mutation.mutate({ amount, note });
    setNote('');
    setAmount(0);
  };

  return (
    <div className="bg-white border mt-4 p-4 rounded shadow-md w-full lg:w-1/2">
      <h3 className="font-semibold mb-2">Manual DKP Action</h3>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="border px-3 py-1 rounded"
          placeholder="Amount"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border px-3 py-1 rounded"
          placeholder="Note or reason"
        />
        <button
          className="bg-blue-600 text-white py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={mutation.isPending || !note || amount === 0}
          onClick={handleSubmit}
        >
          Submit
        </button>
        {mutation.isError && (
          <span className="text-red-600 text-sm">Failed to send action</span>
        )}
        {mutation.isSuccess && (
          <span className="text-green-600 text-sm">Action submitted!</span>
        )}
      </div>
    </div>
  );
}
