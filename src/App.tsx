import React from 'react';
import { TimelineProvider } from './context/TimelineContext';
import Timeline from './components/Timeline';
import EventsDisplay from './components/EventsDisplay';
import { Clock } from 'lucide-react';

function App() {
  return (
    <TimelineProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Temporal Explorer</h1>
            </div>
            <p className="mt-2 text-gray-600">Journey through time: Past meets Future</p>
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto py-12">
            <Timeline />
            <EventsDisplay />
          </div>
        </main>

        <footer className="bg-white mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} Temporal Explorer. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </TimelineProvider>
  );
}

export default App;