import EventCreateForm from '../components/EventCreateForm';
import EventList from '../components/EventList';

export default function EventsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
      <EventCreateForm />
      <EventList />
    </div>
  );
}
