export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: 'invention' | 'historical';
  icon?: string;
}

export interface TimelineState {
  pastYear: number;
  futureYear: number;
  events: TimelineEvent[];
  isLoading: boolean;
}