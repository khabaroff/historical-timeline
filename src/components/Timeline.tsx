import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTimeline } from '../context/TimelineContext';
import { Clock, Rocket } from 'lucide-react';
import { generateEvents } from '../utils/eventGenerator';

const Timeline: React.FC = () => {
  const { state, dispatch } = useTimeline();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeMarker, setActiveMarker] = useState<'past' | 'future' | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  
  const centerYear = 2025;
  const range = 100;
  const minYear = centerYear - range;
  const maxYear = centerYear + range;

  const getPositionPercentage = (year: number) => {
    return ((year - minYear) / (maxYear - minYear)) * 100;
  };

  const getYearFromPosition = (position: number) => {
    const rect = timelineRef.current?.getBoundingClientRect();
    if (!rect) return centerYear;

    const percentage = Math.max(0, Math.min(100, (position - rect.left) / rect.width * 100));
    const year = Math.round(minYear + (percentage / 100) * (maxYear - minYear));
    return year;
  };

  const updateEvents = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const events = await generateEvents(state.pastYear, state.futureYear);
    dispatch({ type: 'SET_EVENTS', payload: events });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [state.pastYear, state.futureYear]);

  const handleMarkerMouseDown = (marker: 'past' | 'future') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setActiveMarker(marker);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !activeMarker || !timelineRef.current) return;

    const year = getYearFromPosition(e.clientX);
    const offset = Math.abs(year - centerYear);
    
    dispatch({
      type: 'SET_YEARS',
      payload: {
        pastYear: centerYear - offset,
        futureYear: centerYear + offset,
      },
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveMarker(null);

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new timer to update events after dragging stops
    debounceTimerRef.current = setTimeout(() => {
      updateEvents();
    }, 500);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, activeMarker]);

  // Initial events load
  useEffect(() => {
    updateEvents();
  }, []);

  const pastMarkerPosition = getPositionPercentage(state.pastYear);
  const futureMarkerPosition = getPositionPercentage(state.futureYear);

  return (
    <div className="w-full px-4 py-8">
      <div className="relative max-w-4xl mx-auto">
        {/* Year Labels */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center">
            <Clock className="w-6 h-6 text-violet-600 mb-2" />
            <span className="text-2xl font-bold">{state.pastYear}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-violet-600">{centerYear}</span>
          </div>
          <div className="flex flex-col items-center">
            <Rocket className="w-6 h-6 text-violet-600 mb-2" />
            <span className="text-2xl font-bold">{state.futureYear}</span>
          </div>
        </div>
        
        {/* Timeline Track */}
        <div ref={timelineRef} className="relative h-2 bg-gray-200 rounded-full mb-8">
          {/* Active Range */}
          <div
            className="absolute h-full bg-violet-600 rounded-full transition-all duration-150"
            style={{
              left: `${pastMarkerPosition}%`,
              width: `${futureMarkerPosition - pastMarkerPosition}%`,
            }}
          />
          
          {/* Past Marker */}
          <div
            onMouseDown={handleMarkerMouseDown('past')}
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-violet-600 rounded-full z-10 cursor-grab active:cursor-grabbing hover:ring-4 hover:ring-violet-200 transition-all duration-150"
            style={{ left: `${pastMarkerPosition}%` }}
          />
          
          {/* Future Marker */}
          <div
            onMouseDown={handleMarkerMouseDown('future')}
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-violet-600 rounded-full z-10 cursor-grab active:cursor-grabbing hover:ring-4 hover:ring-violet-200 transition-all duration-150"
            style={{ left: `${futureMarkerPosition}%` }}
          />
        </div>
        
        {/* Year Ticks */}
        <div className="flex justify-between px-2">
          {[1925, 1975, 2025, 2075, 2125].map((year) => (
            <div
              key={year}
              className="flex flex-col items-center"
            >
              <div className="h-2 w-0.5 bg-gray-300" />
              <span className="text-sm text-gray-500 mt-1">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;