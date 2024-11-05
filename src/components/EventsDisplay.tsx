import React from 'react';
import { useTimeline } from '../context/TimelineContext';
import EventCard from './EventCard';
import { Loader2 } from 'lucide-react';

const EventsDisplay: React.FC = () => {
  const { state } = useTimeline();
  
  const inventions = state.events.filter(event => event.category === 'invention').slice(0, 3);
  const historical = state.events.filter(event => event.category === 'historical').slice(0, 3);

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-indigo-600">Major Inventions</h2>
          <div className="space-y-6">
            {inventions.map(event => (
              <EventCard key={event.year + event.title} event={event} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6 text-indigo-600">Historical Events</h2>
          <div className="space-y-6">
            {historical.map(event => (
              <EventCard key={event.year + event.title} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsDisplay;