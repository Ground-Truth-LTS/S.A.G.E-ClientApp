import { insertSensorData, insertSession } from "@/database/db";
import { Session } from "@/models/session";
import * as SQLite from 'expo-sqlite';

export async function jsonToDB(db: SQLite.SQLiteDatabase, result: any): Promise<void> {
    
    if(result.data) {

        const data = result.data;

        const startDate = new Date(data.date);
        let largestTimestamp = 0;

        if (data.data && Array.isArray(data.data)) {
          data.data.forEach((reading: { Timestamp: string }) => {
            const timestamp = parseInt(reading.Timestamp, 10);
            if (!isNaN(timestamp) && timestamp > largestTimestamp) {
              largestTimestamp = timestamp;
            }
          });
        }
        
        // Calculate the end date by adding the largest timestamp (in seconds) to the start date
        const endDate = new Date(startDate.getTime() + (largestTimestamp * 1000));
        
        const timestampStart = startDate.toISOString();
        const timestampEnd = endDate.toISOString();

        const new_session = new Session(
            timestampStart,
            timestampEnd,
            "N/A",
            1,
            data.id,
            data.name,
        );

        console.log("newsession", new_session)

        // Insert Session to Database
        const sessionInsertResult = await insertSession(
          db,
          new_session.timestamp_start,
          new_session.timestamp_end,
          new_session.location,
          new_session.device_id,
          new_session.session_name
        );

        if (data.data && Array.isArray(data.data)) {
          for (const reading of data.data) {
            await insertSensorData(
              db,
              sessionInsertResult.lastInsertRowId,
              parseFloat(reading.Nitrogen) || 0,
              parseFloat(reading.Phosphorus) || 0,
              parseFloat(reading.Potassium) || 0,
              parseFloat(reading.pH) || 0,
              parseFloat(reading.Moisture) || 0,
              parseFloat(reading.Humidity) || 0,
              parseFloat(reading.SoilTemp) || 0,
              parseFloat(reading.AirTemp) || 0
            );
          }
        }
    }else{
        console.log("There is no data for this log")
    }

} 
