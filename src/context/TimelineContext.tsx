import React, { createContext, useContext, useReducer } from 'react';
import { TimelineState } from '../types';

type Action =
  | { type: 'SET_YEARS'; payload: { pastYear: number; futureYear: number } }
  | { type: 'SET_EVENTS'; payload: TimelineEvent[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_TIMELINE' };

const initialState: TimelineState = {
  pastYear: 1975,
  futureYear: 2075,
  events: [],
  isLoading: false,
};

const TimelineContext = createContext<{
  state: TimelineState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const timelineReducer = (state: TimelineState, action: Action): TimelineState => {
  switch (action.type) {
    case 'SET_YEARS':
      return {
        ...state,
        pastYear: action.payload.pastYear,
        futureYear: action.payload.futureYear,
      };
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'RESET_TIMELINE':
      return initialState;
    default:
      return state;
  }
};

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timelineReducer, initialState);

  return (
    <TimelineContext.Provider value={{ state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => useContext(TimelineContext);