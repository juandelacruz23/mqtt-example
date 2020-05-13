import { Qos } from "paho-mqtt";

export default interface HistoryItem {
  topic: string;
  payload: string;
  time: number;
  qos: Qos;
}
