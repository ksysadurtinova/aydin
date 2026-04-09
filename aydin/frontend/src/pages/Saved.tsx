import { useEffect } from 'react';
import { useEventStore } from '../stores/eventStore';
import EventCard from '../components/EventCard';
import Layout from '../components/Layout';

export default function Saved() {
  const { savedEvents, fetchSavedEvents } = useEventStore();

  useEffect(() => {
    fetchSavedEvents();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Saved Events
        </h1>

        {savedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No saved events yet. Start saving events you like!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedEvents.map((event) => (
              <EventCard key={event.id} event={event} isSaved />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}