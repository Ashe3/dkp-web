import { useUserHistory } from '../queries/history';

type Props = {
  telegramId: string;
  take?: number;
};

export default function History({ telegramId, take = 10 }: Props) {
  const { data, isLoading, error } = useUserHistory(telegramId, take);

  if (isLoading)
    return <p className="text-sm text-gray-500">Loading history...</p>;
  if (error)
    return <p className="text-sm text-red-500">Failed to load history</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">DKP History</h3>
      <ul className="space-y-2">
        {data?.map((entry) => (
          <li
            key={entry.id}
            className="border p-3 rounded bg-white shadow-sm text-sm text-gray-700"
          >
            <div>
              <strong>
                {entry.amount >= 0 ? '+' : ''}
                {entry.amount.toFixed(2)}
              </strong>{' '}
              DKP — {entry.description}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(entry.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
