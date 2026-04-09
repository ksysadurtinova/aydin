import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { useEventStore } from '../stores/eventStore';

interface EventCardProps {
  event: Event;
  isSaved?: boolean;
}

export default function EventCard({ event, isSaved }: EventCardProps) {
  const { saveEvent, unsaveEvent } = useEventStore();

  const handleSave = () => {
    if (isSaved) {
      unsaveEvent(event.id);
    } else {
      saveEvent(event.id);
    }
  };

  return (
    <Link to={`/event/${event.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {event.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium text-primary">{event.date}</span>
              {event.time && <span>• {event.time}</span>}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className={`p-2 rounded-full transition-colors ${
              isSaved
                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {event.location && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            📍 {event.location}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {event.category}
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>
    </Link>
  );
}