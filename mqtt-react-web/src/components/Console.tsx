import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/mainDuck";
import ConsoleEvent from "../types/ConsoleEvents";

const Console: React.FC = () => {
  const events: ConsoleEvent[] = useSelector((state: AppState) => state.events);
  return (
    <div id="console" className="full-width">
      {events.map(event => (
        <span key={`event-${event.timestamp}`}>
          {new Date(event.timestamp).toLocaleString()} - {event.value}
        </span>
      ))}
    </div>
  );
};

export default Console;
