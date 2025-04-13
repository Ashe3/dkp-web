import { useState } from 'react';
import { usePlayers } from '../queries/players';
import Actions from './Actions';
import History from './History';
import DKPActions from './DKPActions';

export default function PlayerList() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<'username' | 'dkp' | 'bs' | 'multiplier' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const { data: players, isLoading, error } = usePlayers();

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">Error loading players</div>
    );
  }

  const sortedPlayers = players?.slice().sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (sortKey === 'username') {
      return sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    }
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th
              onClick={() => {
                setSortKey('username');
                setSortDirection(
                  sortKey === 'username' && sortDirection === 'desc' ? 'asc' : 'desc'
                );
              }}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase cursor-pointer select-none hover:underline"
            >
              Nickname <span className="inline-block w-4">{sortKey === 'username' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</span>
            </th>
            <th
              onClick={() => {
                setSortKey('dkp');
                setSortDirection(
                  sortKey === 'dkp' && sortDirection === 'desc' ? 'asc' : 'desc'
                );
              }}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase cursor-pointer select-none hover:underline"
            >
              DKP <span className="inline-block w-4">{sortKey === 'dkp' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</span>
            </th>
            <th
              onClick={() => {
                setSortKey('bs');
                setSortDirection(
                  sortKey === 'bs' && sortDirection === 'desc' ? 'asc' : 'desc'
                );
              }}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase cursor-pointer select-none hover:underline"
            >
              BS <span className="inline-block w-4">{sortKey === 'bs' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</span>
            </th>
            <th
              onClick={() => {
                setSortKey('multiplier');
                setSortDirection(
                  sortKey === 'multiplier' && sortDirection === 'desc' ? 'asc' : 'desc'
                );
              }}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase cursor-pointer select-none hover:underline"
            >
              Multiplier <span className="inline-block w-4">{sortKey === 'multiplier' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {Array(20)
                    .fill(0)
                    .map((_, i) => (
                      <td key={i} className="px-6 py-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
                      </td>
                    ))}
                </tr>
              ))
            : sortedPlayers
                ?.filter((player) =>
                  selectedId ? player.telegramId === selectedId : true
                )
                .map((player, index) => (
                  <tr
                    key={player.id}
                    className={
                      index % 2 === 0
                        ? 'bg-white  cursor-pointer'
                        : 'bg-gray-50  cursor-pointer'
                    }
                    onClick={() => setSelectedId(player.telegramId)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 ">
                      {player.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {player.dkp.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 ">
                      {player.bs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {player.multiplier}
                    </td>
                  </tr>
                ))}
        </tbody>
      </table>
      {selectedId && (
        <>
          <Actions
            player={players?.find(
              ({ telegramId }) => selectedId === telegramId
            )}
            cancelSelected={() => setSelectedId(null)}
          />
          <DKPActions telegramId={selectedId} />
          <History telegramId={selectedId} />
        </>
      )}
    </div>
  );
}
