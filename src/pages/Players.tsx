import PlayerList from '../components/PlayerList';

export default function Players() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Members</h1>
      <PlayerList />
    </div>
  );
}
