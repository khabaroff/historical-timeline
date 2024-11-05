import { TimelineEvent } from '../types';

// This is a mock implementation. In a real application, you would make API calls to ChatGPT here
export async function generateEvents(pastYear: number, futureYear: number): Promise<TimelineEvent[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const events: TimelineEvent[] = [
    {
      year: pastYear,
      title: `Innovation in ${pastYear}`,
      description: `A groundbreaking invention that revolutionized technology in ${pastYear}`,
      category: 'invention',
    },
    {
      year: pastYear + 10,
      title: `Discovery of ${pastYear + 10}`,
      description: `Scientists made an incredible breakthrough in ${pastYear + 10}`,
      category: 'invention',
    },
    {
      year: pastYear + 20,
      title: `Tech Evolution ${pastYear + 20}`,
      description: `A new era of computing began in ${pastYear + 20}`,
      category: 'invention',
    },
    {
      year: futureYear - 20,
      title: `Historic Summit ${futureYear - 20}`,
      description: `World leaders gathered to address global challenges in ${futureYear - 20}`,
      category: 'historical',
    },
    {
      year: futureYear - 10,
      title: `Global Achievement ${futureYear - 10}`,
      description: `Humanity reached a significant milestone in ${futureYear - 10}`,
      category: 'historical',
    },
    {
      year: futureYear,
      title: `Future Milestone ${futureYear}`,
      description: `A pivotal moment in human history occurred in ${futureYear}`,
      category: 'historical',
    },
  ];

  return events;
}