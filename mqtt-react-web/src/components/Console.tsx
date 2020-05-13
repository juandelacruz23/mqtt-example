import React from "react";
import { useSelector } from "react-redux";
import ConsoleEvent from "../types/ConsoleEvents";
import { AppState } from "../redux";

const Console: React.FC = () => {
  const events: ConsoleEvent[] = useSelector(
    (state: AppState) => state.consoleEvents,
  );
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
