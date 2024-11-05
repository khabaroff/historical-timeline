import React from 'react';
import { TimelineEvent } from '../types';
import { Lightbulb, Landmark } from 'lucide-react';

interface EventCardProps {
  event: TimelineEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-4 mb-4">
        {event.category === 'invention' ? (
          <Lightbulb className="w-8 h-8 text-yellow-500" />
        ) : (
          <Landmark className="w-8 h-8 text-blue-500" />
        )}
        <div>
          <h3 className="text-xl font-bold">{event.title}</h3>
          <span className="text-sm text-gray-500">{event.year}</span>
        </div>
      </div>
      <p className="text-gray-600">{event.description}</p>
    </div>
  );
};

export default EventCard;