import * as SQLite from 'expo-sqlite';
import { insertSession, getSessionByTimeframe, getAllSession } from '../database/db';


export class Session {
  session_id: number | null;
  timestamp_start: string;
  timestamp_end: string;
  location: string;
  device_id: number;
  session_name: string;

  /**
   * Create a new Session instance
   * 
   * @param timestamp_start ISO string for session start time
   * @param timestamp_end ISO string for session end time
   * @param location Location where data was collected
   * @param device_id ID of the device used for data collection
   * @param session_id Optional ID (set automatically by DB if not provided)
   * @param session_name Name of the session
   */
  constructor(
    timestamp_start: string,
    timestamp_end: string,
    location: string,
    device_id: number,
    session_id: number | null = null,
    session_name: string,
  ) {
    this.timestamp_start = timestamp_start;
    this.timestamp_end = timestamp_end;
    this.location = location;
    this.device_id = device_id;
    this.session_id = session_id;
    this.session_name = session_name;
  }

  /**
   * Format the timestamps to a more readable format
   * 
   * @returns Object with formatted dates
   */
  getFormattedDates(): { formattedStart: string, formattedEnd: string } {
    const startDate = new Date(this.timestamp_start);
    const endDate = new Date(this.timestamp_end);
    
    const formattedStart = startDate.toLocaleString();
    const formattedEnd = endDate.toLocaleString();
    
    return { formattedStart, formattedEnd };
  }

  /**
   * Calculate the duration of the session in minutes
   * 
   * @returns Number representing minutes the session lasted
   */
  getDurationMinutes(): number {
    const startDate = new Date(this.timestamp_start);
    const endDate = new Date(this.timestamp_end);
    
    const durationMs = endDate.getTime() - startDate.getTime();
    return Math.round(durationMs / (1000 * 60));
  }
}