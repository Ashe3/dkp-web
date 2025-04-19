import { useState, useMemo } from 'react';
import { useActionMutation } from '../queries/actions';
import { Player } from '../queries/players';

type Props = {
  telegramId: string;
  players: Player[];
};

export default function DKPActions({ telegramId, players }: Props) {
  const [amountInt, setAmountInt] = useState(0);
  const [amountDec, setAmountDec] = useState(0);
  const [note, setNote] = useState('');
  const [useMultiplier, setUseMultiplier] = useState(false);
  const mutation = useActionMutation(telegramId);
  const player = players.find((p) => p.telegramId.toString() === telegramId);

  const totalAmount = useMemo(() => {
    const base = (!isNaN(amountInt) ? amountInt : 0) + amountDec / 100;
    return useMultiplier && player ? base * player.multiplier : base;
  }, [amountInt, amountDec, useMultiplier, player]);

  const handleSubmit = () => {
    if (!note || totalAmount === 0) return;
    mutation.mutate({ amount: totalAmount, note });
    setNote('');
    setAmountInt(0);
    setAmountDec(0);
  };

  return (
    <div className="bg-white border mt-4 p-4 rounded shadow-md w-full lg:w-1/2">
      <h3 className="font-semibold mb-2">Manual DKP Action</h3>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={amountInt}
            onChange={(e) => setAmountInt(parseInt(e.target.value))}
            className="border px-3 py-1 rounded w-1/2"
            placeholder="Whole"
          />
          <span>,</span>
          <input
            type="number"
            value={amountDec}
            min={0}
            max={99}
            onChange={(e) => {
              const value = Math.min(99, Math.max(0, parseInt(e.target.value)));
              setAmountDec(isNaN(value) ? 0 : value);
            }}
            className="border px-3 py-1 rounded w-1/2"
            placeholder="Decimal (0-99)"
          />
        </div>
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={useMultiplier}
            onChange={(e) => setUseMultiplier(e.target.checked)}
          />
          Apply multiplier ({player?.multiplier ?? 1})
        </label>
        <div className="text-sm text-gray-600">
          Total DKP to apply: <strong>{totalAmount.toFixed(2)}</strong>
        </div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border px-3 py-1 rounded"
          placeholder="Note or reason"
        />
        <button
          className="bg-blue-600 text-white py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={
            mutation.isPending || !note || (amountInt === 0 && amountDec === 0)
          }
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
