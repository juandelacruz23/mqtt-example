import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/mainDuck";

export interface ConsoleEvent {
  value: string;
  timestamp: number;
}

const Console: React.FC = () => {
  const event: ConsoleEvent[] = useSelector((state: AppState) => state.events);
  console.log(event);
  return (
    <div id="console" className="full-width">
      {event.map(event => (
        <span key={`event-${event.timestamp}`}>
          {new Date(event.timestamp).toLocaleString()} - {event.value}
        </span>
      ))}
    </div>
  );
};

export default Console;
