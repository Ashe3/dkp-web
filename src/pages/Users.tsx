import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useState } from 'react';

type Operator = {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export default function Users() {
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data: operators, isLoading } = useQuery<Operator[]>({
    queryKey: ['operators'],
    queryFn: async () => {
      const res = await api.get('/operators');
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      setLoadingId(id);
      await api.patch(`/operators/${id}`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operators'] });
      setLoadingId(null);
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      await api.post('/operators', { username, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operators'] });
      setUsername('');
      setPassword('');
      setShowModal(false);
    },
  });

  const toggleRoleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: number; role: string }) => {
      await api.patch(`/operators/${id}`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operators'] });
    },
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Operators</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : !operators || operators.length === 0 ? (
        <p>No operators found.</p>
      ) : (
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {operators.map((op) => (
              <tr key={op.id} className="border-t">
                <td className="p-2 border">{op.username}</td>
                <td className="p-2 border">{op.role}</td>
                <td className="p-2 border">
                  {op.isActive ? 'Active' : 'Inactive'}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: op.id,
                        isActive: !op.isActive,
                      })
                    }
                    className={`px-2 py-1 rounded text-white ${
                      op.isActive ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    disabled={loadingId === op.id}
                  >
                    {op.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() =>
                      toggleRoleMutation.mutate({
                        id: op.id,
                        role: op.role === 'admin' ? 'operator' : 'admin',
                      })
                    }
                    className={`ml-2 px-2 py-1 rounded text-white ${
                      op.role === 'admin' ? 'bg-yellow-600' : 'bg-yellow-500'
                    }`}
                  >
                    {op.role === 'admin' ? 'Revoke Admin' : 'Set Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Add Operator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  className="w-full border px-3 py-2 rounded mt-1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border px-3 py-2 rounded mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={() => createMutation.mutate()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
