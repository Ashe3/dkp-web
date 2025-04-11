import { useEffect, useState } from 'react';
import {
  Player,
  useDeletePlayer,
  useToggleBanPlayer,
  useUpdatePlayer,
} from '../queries/players';

interface Props {
  player: Player | undefined;
  cancelSelected: () => void;
}

export default function Actions(props: Props) {
  const { player } = props;
  const { telegramId, isBanned, username, bs } = player!;

  const { mutate: updatePlayer } = useUpdatePlayer();
  const { mutate: deletePlayer } = useDeletePlayer();
  const { mutate: toggleBanPlayer } = useToggleBanPlayer();

  const [isEditing, setIsEditing] = useState(false);

  const [editedUsername, setEditedUsername] = useState(username);
  const [editedBS, setEditedBS] = useState(bs);

  useEffect(() => {
    if (isEditing) {
      setEditedUsername(username);
      setEditedBS(bs);
    }
  }, [isEditing, bs, username]);

  return (
    <div>
      <div className="flex space-x-4 py-4">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isEditing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
        >
          Edit
        </button>
        <button
          className={`bg-red-700 text-white px-4 py-2 rounded ${
            isEditing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => deletePlayer(telegramId)}
          disabled={isEditing}
        >
          Delete
        </button>
        <button
          className={`bg-${
            isBanned ? 'green' : 'red'
          }-500 text-white px-4 py-2 rounded ${
            isEditing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => toggleBanPlayer({ id: telegramId, banned: !isBanned })}
          disabled={isEditing}
        >
          {isBanned ? 'Unban' : 'Ban'}
        </button>
        <button
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            isEditing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={props.cancelSelected}
          disabled={isEditing}
        >
          Cancel
        </button>
      </div>
      {isEditing && (
        <form
          className="flex flex-col md:flex-row gap-4 items-start md:items-center py-4"
          onSubmit={(e) => {
            e.preventDefault();
            updatePlayer({
              id: telegramId,
              username: editedUsername,
              bs: editedBS,
            });
            setIsEditing(false);
          }}
        >
          <input
            type="text"
            name="username"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-64"
            placeholder="Username"
          />
          <input
            type="number"
            name="bs"
            value={editedBS}
            onChange={(e) => setEditedBS(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full md:w-40"
            placeholder="BS"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={editedUsername.length === 0 || editedBS === 0}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
