import * as SQLite from 'expo-sqlite';


// DB Creation
export const createEmptyDB = async (db : SQLite.SQLiteDatabase) => {
  console.log("[DB] Creating empty database...");
  try {

    const tables: any = await db.getAllAsync("SELECT name FROM sqlite_master WHERE type='table'");
    
    if (tables && tables.length > 0 && tables[0].rows && tables[0].rows.length > 0) {
      console.log("[DB] Database already initialized with tables:", 
        tables[0].rows.map((row: any) => row.name).join(', '));
      return;
    }


    await db.withTransactionAsync(async () => {
      console.log("[DB] Transaction started. Setting PRAGMA...");
      await db.execAsync(`PRAGMA foreign_keys = ON;`);
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Device (
          device_id INTEGER PRIMARY KEY AUTOINCREMENT,
          device_name TEXT
        );
      `);
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Session (
          session_id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_name TEXT,
          timestamp_start TEXT,
          timestamp_end TEXT,
          location TEXT,
          device_id INTEGER,
          FOREIGN KEY (device_id) REFERENCES Device(device_id)
        );
      `);
      console.log("[DB] Creating Processed_Sensor_Data table...");
      await db.execAsync(`        CREATE TABLE IF NOT EXISTS Processed_Sensor_Data (
          data_id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id INTEGER,
          nitrogen REAL,
          phosphorus REAL,
          potassium REAL,
          pH REAL,
          moisture REAL,
          humidity REAL,
          soil_temperature REAL,
          air_temperature REAL,
          FOREIGN KEY (session_id) REFERENCES Session(session_id)
        );
      `);
    });
    console.log("[DB] Schema creation transaction completed successfully.");
  } catch (error) {
    //console.error("[DB] Error during schema creation transaction:", error);
    //throw error;
  }
}

// Insert into Tables

export const insertDevice = async (db : SQLite.SQLiteDatabase, device_name: string) => {
  const result = await db.runAsync('INSERT INTO Device (device_name) VALUES (?)', [device_name]);
  //console.log(result.lastInsertRowId,result.changes);
}

export const insertSession = async (
  db: SQLite.SQLiteDatabase,
  timestamp_start: string,
  timestamp_end: string,
  location: string,
  device_id: number,
  session_name?: string
) => {
  if (session_name) {
    const result = await db.runAsync(`
      INSERT INTO Session (
        session_name,
        timestamp_start,
        timestamp_end,
        location,
        device_id) VALUES (?,?,?,?,?)`, 
      session_name, timestamp_start, timestamp_end, location, device_id);
    return result;
  } else { // If session_name is not provided, assign id as name
    const result = await db.runAsync(`
      INSERT INTO Session (
        timestamp_start,
        timestamp_end,
        location,
        device_id) VALUES (?,?,?,?)`, 
      timestamp_start, timestamp_end, location, device_id);
    
    // Then update with session_id as the name
    const sessionId = result.lastInsertRowId;
    await db.runAsync(
      'UPDATE Session SET session_name = ? WHERE session_id = ?',
      [`Log ${sessionId}`, sessionId]
    );
    
    return result;
  }
}

export const insertSensorData = async (db : SQLite.SQLiteDatabase, session_id : number,
   nitrogen : number, phosphorus : number, potassium : number, pH : number, moisture : number, humidity : number, soil_temperature : number, air_temperature : number) => {
  const result = await db.runAsync(`INSERT INTO Processed_Sensor_Data (
        session_id,
        nitrogen,
        phosphorus,
        potassium,
        pH,
        moisture,
        humidity,
        soil_temperature,
        air_temperature) VALUES (?,?,?,?,?,?,?,?,?)`, session_id, nitrogen, phosphorus, potassium, pH, moisture, humidity, soil_temperature, air_temperature);
  //(result.lastInsertRowId,result.changes);
}

// Get device data
export const getDevices = async (db : SQLite.SQLiteDatabase) => {
  const allRows = await db.getAllAsync('SELECT * FROM Device');
  return JSON.stringify(allRows);
}

// Get Session data
export const getAllSession = async (db : SQLite.SQLiteDatabase) => {
  const allRows = await db.getAllAsync('SELECT * FROM Session');
  return JSON.stringify(allRows);
}

/**
 * Update an existing session in the database
 * @param db SQLite database instance
 * @param sessionId The current session ID to update
 * @param updates Object containing the fields to update
 * @returns Promise resolving to a result object with changes count
 */
export const updateSession = async (
  db: SQLite.SQLiteDatabase, 
  sessionId: number,
  updates: {
    session_id?: string | number,
    timestamp_start?: string,
    timestamp_end?: string,
    location?: string,
    device_id?: number,
    session_name?: string
  }
) => {
  try {
    // Start building the SQL query
    let sql = 'UPDATE Session SET ';
    const params: any[] = [];
    const setClauses: string[] = [];

    // Add each field that needs updating
    if (updates.session_id !== undefined) {
      setClauses.push('session_id = ?');
      params.push(updates.session_id);
    }
    if (updates.timestamp_start !== undefined) {
      setClauses.push('timestamp_start = ?');
      params.push(updates.timestamp_start);
    }
    if (updates.timestamp_end !== undefined) {
      setClauses.push('timestamp_end = ?');
      params.push(updates.timestamp_end);
    }
    if (updates.location !== undefined) {
      setClauses.push('location = ?');
      params.push(updates.location);
    }
    if (updates.device_id !== undefined) {
      setClauses.push('device_id = ?');
      params.push(updates.device_id);
    }
    if (updates.session_name !== undefined) {
      setClauses.push('session_name = ?');
      params.push(updates.session_name);
    }

    // If no fields to update, return early
    if (setClauses.length === 0) {
      console.log('No fields to update for session:', sessionId);
      return { changes: 0 };
    }

    // Complete the SQL query
    sql += setClauses.join(', ') + ' WHERE session_id = ?';
    params.push(sessionId);

    // Execute the query
    const result = await db.runAsync(sql, params);
    console.log(`Updated session ${sessionId}, changes: ${result.changes}`);
    return result;
  } catch (error) {
    console.error(`Error updating session ${sessionId}:`, error);
    throw error;
  }
}

export const getSessionByTimeframe = async (db : SQLite.SQLiteDatabase,
  start: string,
  end: string
) => {
  const allRows = await db.getAllAsync(
    ` SELECT *
        FROM Session
      WHERE timestamp_start >= ?
        AND timestamp_end   <= ?
      ORDER BY timestamp_start`, start, end);
  return JSON.stringify(allRows);
}

// Get Sensor
export const getSensorData = async (db : SQLite.SQLiteDatabase) => {
  const allRows = await db.getAllAsync('SELECT * FROM Processed_Sensor_Data');
  return JSON.stringify(allRows);
}

export const getSensorDataBySessionId = async (db: SQLite.SQLiteDatabase, sessionId: number) => {
  try {
    // First get the session details
    const sessionDetails = await db.getAllAsync(
      'SELECT * FROM Session WHERE session_id = ?', 
      [sessionId]
    );
    
    if (sessionDetails.length === 0) {
      console.log(`No session found with ID: ${sessionId}`);
      return JSON.stringify({ session: null, sensorData: [] });
    }
      // Then get all sensor readings for this session
    const sensorReadings = await db.getAllAsync(
      `SELECT 
        data_id, 
        nitrogen, 
        phosphorus, 
        potassium, 
        pH, 
        moisture, 
        humidity,
        soil_temperature,
        air_temperature
       FROM Processed_Sensor_Data 
       WHERE session_id = ? 
       ORDER BY data_id ASC`, 
      [sessionId]
    );
    
    // Return both session metadata and readings
    return JSON.stringify({
      session: sessionDetails[0],
      sensorData: sensorReadings
    });
  } catch (error) {
    console.error(`Error getting sensor data for session ID ${sessionId}:`, error);
    throw error;
  }
}

/**
 * Get a full session with all related data
 * @param db SQLite database instance
 * @param sessionId The session ID to retrieve
 * @returns Promise resolving to a complete session object with sensor data
 */
export const getCompleteSession = async (db: SQLite.SQLiteDatabase, sessionId: number) => {
  try {
    // Get session with device info using JOIN
    const sessionWithDevice = await db.getAllAsync(
      `SELECT 
        s.session_id,
        s.timestamp_start,
        s.timestamp_end,
        s.location,
        d.device_id,
        d.device_name
       FROM Session s
       JOIN Device d ON s.device_id = d.device_id
       WHERE s.session_id = ?`,
      [sessionId]
    );
    
    if (sessionWithDevice.length === 0) {
      console.log(`No session found with ID: ${sessionId}`);
      return JSON.stringify(null);
    }
    
    // Get sensor readings for this session
    const sensorData: Array<{
      nitrogen: number;
      phosphorus: number;
      potassium: number;
      pH: number;
      moisture: number;
      humidity: number;
      soil_temperature: number;
      air_temperature: number;
    }> = await db.getAllAsync(
      `SELECT * FROM Processed_Sensor_Data 
       WHERE session_id = ? 
       ORDER BY data_id ASC`,
      [sessionId]
    );
      // Calculate some statistics for the session
    const stats = {
      readingsCount: sensorData.length,
      averages: {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        pH: 0,
        moisture: 0,
        humidity: 0,
        soil_temperature: 0,
        air_temperature: 0
      }
    };
    
    // Calculate averages if there's data
    if (sensorData.length > 0) {
      let totalNitrogen = 0;
      let totalPhosphorus = 0;
      let totalPotassium = 0;
      let totalPH = 0;
      let totalMoisture = 0;
      let totalHumidity = 0;
      let totalSoilTemperature = 0;
      let totalAirTemperature = 0;
      
      for (const reading of sensorData) {
        totalNitrogen += reading.nitrogen || 0;
        totalPhosphorus += reading.phosphorus || 0;
        totalPotassium += reading.potassium || 0;
        totalPH += reading.pH || 0;
        totalMoisture += reading.moisture || 0;
        totalHumidity += reading.humidity || 0;
        totalSoilTemperature += reading.soil_temperature || 0;
        totalAirTemperature += reading.air_temperature || 0;
      }
      
      stats.averages = {
        nitrogen: totalNitrogen / sensorData.length,
        phosphorus: totalPhosphorus / sensorData.length,
        potassium: totalPotassium / sensorData.length,
        pH: totalPH / sensorData.length,
        moisture: totalMoisture / sensorData.length,
        humidity: totalHumidity / sensorData.length,
        soil_temperature: totalSoilTemperature / sensorData.length,
        air_temperature: totalAirTemperature / sensorData.length
      };
    }
    
    // Combine all data into one comprehensive object
    const completeSession = {
      ...(sessionWithDevice[0] as Record<string, any>),
      stats,
      sensorData
    };
    
    return JSON.stringify(completeSession);
  } catch (error) {
    console.error(`Error getting complete session with ID ${sessionId}:`, error);
    throw error;
  }
}


// Delete Session (log)
export const deleteSession = async (db: SQLite.SQLiteDatabase, sessionId: number) => {
  try {
    await db.execAsync('BEGIN TRANSACTION');
    
    //delete related sensor data to maintain referential integrity
    const sensorDeleteResult = await db.runAsync(
      'DELETE FROM Processed_Sensor_Data WHERE session_id = ?', 
      [sessionId]
    );
    console.log(`Deleted ${sensorDeleteResult.changes} sensor readings for session ${sessionId}`);
    
    // Then delete the session itself
    const sessionDeleteResult = await db.runAsync(
      'DELETE FROM Session WHERE session_id = ?', 
      [sessionId]
    );
    
    // Commit the transaction
    await db.execAsync('COMMIT');
    
    console.log(`Session ${sessionId} deleted, changes: ${sessionDeleteResult.changes}`);
    return {
      success: true,
      sessionDeleted: sessionDeleteResult.changes > 0,
      sensorReadingsDeleted: sensorDeleteResult.changes,
      changes: sessionDeleteResult.changes + sensorDeleteResult.changes
    };
  } catch (error) {
    // Roll back on error
    await db.execAsync('ROLLBACK');
    console.error(`Error deleting session ${sessionId}:`, error);
    throw error;
  }
};

/**
 * Delete multiple sessions by their IDs
 * @param db SQLite database instance
 * @param sessionIds Array of session IDs to delete
 * @returns Promise resolving to a result object with total changes count
 */
export const deleteMultipleSessions = async (db: SQLite.SQLiteDatabase, sessionIds: number[]) => {
  try {
    if (!sessionIds || sessionIds.length === 0) {
      return { success: true, changes: 0 };
    }
    
    // Start a transaction
    await db.execAsync('BEGIN TRANSACTION');
    
    let totalSensorReadingsDeleted = 0;
    let totalSessionsDeleted = 0;
    
    // Process each session ID
    for (const sessionId of sessionIds) {
      // Delete related sensor data
      const sensorDeleteResult = await db.runAsync(
        'DELETE FROM Processed_Sensor_Data WHERE session_id = ?', 
        [sessionId]
      );
      totalSensorReadingsDeleted += sensorDeleteResult.changes;
      
      // Delete the session
      const sessionDeleteResult = await db.runAsync(
        'DELETE FROM Session WHERE session_id = ?', 
        [sessionId]
      );
      totalSessionsDeleted += sessionDeleteResult.changes;
    }
    
    // Commit the transaction
    await db.execAsync('COMMIT');
    
    console.log(`Deleted ${totalSessionsDeleted} sessions and ${totalSensorReadingsDeleted} sensor readings`);
    return {
      success: true,
      sessionsDeleted: totalSessionsDeleted,
      sensorReadingsDeleted: totalSensorReadingsDeleted,
      changes: totalSessionsDeleted + totalSensorReadingsDeleted
    };
  } catch (error) {
    // Roll back on error
    await db.execAsync('ROLLBACK');
    console.error('Error deleting multiple sessions:', error);
    throw error;
  }
};


// Delete from Tables
export const deleteAllFromDevice = async (db: SQLite.SQLiteDatabase) => {

  await db.execAsync(`DELETE FROM Device;`);

  await db.execAsync(`DELETE FROM sqlite_sequence WHERE name='Device';`);

  console.log('All rows removed and auto-increment reset for Device table');
};

export const deleteAllFromSession = async (db: SQLite.SQLiteDatabase) => {

  await db.execAsync(`DELETE FROM Session;`);

  await db.execAsync(`DELETE FROM sqlite_sequence WHERE name='Session';`);
  
  console.log('All rows removed and auto-increment reset for Session table');
};

export const deleteAllFromSensorData = async (db: SQLite.SQLiteDatabase) => {

  await db.execAsync(`DELETE FROM Processed_Sensor_Data;`);

  await db.execAsync(`DELETE FROM sqlite_sequence WHERE name='Processed_Sensor_Data';`);
  
  console.log('All rows removed and auto-increment reset for Processed_Sensor_Data table');
};

export const dropAllTables = async (db : SQLite.SQLiteDatabase) => {
  await db.execAsync('PRAGMA foreign_keys = OFF;');
  await db.execAsync(`DROP TABLE IF EXISTS Processed_Sensor_Data;`);
  await db.execAsync(`DROP TABLE IF EXISTS Session;`);
  await db.execAsync(`DROP TABLE IF EXISTS Device;`);
  console.log('Deleted')
  await db.execAsync('PRAGMA foreign_keys = ON;');
};


/**
 * Parse and insert CSV data into database
 */
export const insertCSVData = async(db: SQLite.SQLiteDatabase) => {
  try {
    // Create a new session for this dataset
    const startTimestamp = new Date(1747015860 * 1000).toISOString();
    const endTimestamp = new Date(1747018800 * 1000).toISOString();
    
    // Insert the session
    const result = await insertSession(
      db, 
      startTimestamp, 
      endTimestamp, 
      "CSV Test Location", 
      1
    );
    
    const sessionId = result.lastInsertRowId;
    console.log(`Created new session with ID: ${sessionId}`);
    
    // Process and insert each row of CSV data
    const csvData = `Timestamp,Moisture,Humidity,SoilTemp,AirTemp,pH,Nitrogen,Phosphorus,Potassium
1747015860,29.0,48.59,20.81,23.24,5.51,49.94,30.03,39.45
1747015920,29.19,50.07,20.55,22.74,5.53,49.64,29.66,38.51
1747015980,28.1,49.5,20.89,22.35,6.06,49.23,30.76,39.84
1747016040,28.02,49.21,20.81,23.06,7.0,48.83,31.57,40.69
1747016100,28.24,49.24,20.48,23.12,7.02,47.63,31.27,41.71
1747016160,29.61,48.93,21.07,24.24,6.65,47.21,31.0,41.46
1747016220,29.55,49.44,22.42,24.92,7.5,47.35,31.58,41.27
1747016280,30.72,50.14,23.66,23.86,6.6,46.91,31.66,40.76
1747016340,30.38,50.35,24.29,23.43,6.36,45.83,32.32,39.55
1747016400,31.09,50.44,22.89,23.82,6.82,46.51,31.18,40.04
1747016460,29.95,49.38,24.36,23.38,7.5,45.37,30.26,40.14
1747016520,31.14,47.99,25.51,24.61,7.5,46.65,31.08,41.01
1747016580,30.52,48.02,25.92,23.16,7.5,46.5,30.11,39.54
1747016640,29.56,49.07,27.18,24.05,7.5,46.42,29.06,40.2
1747016700,30.38,47.79,27.03,23.81,7.5,46.64,28.96,41.67
1747016760,29.91,46.62,26.06,24.93,6.11,47.35,27.97,40.24
1747016820,30.64,45.52,25.83,23.49,5.5,46.34,26.81,39.19
1747016880,31.92,46.87,27.13,24.44,6.64,45.15,28.13,39.34
1747016940,31.21,46.02,26.26,23.05,5.67,44.8,29.47,38.53
1747017000,32.26,46.07,26.6,24.37,6.01,44.76,29.11,38.25
1747017060,32.06,45.49,25.78,25.37,5.81,44.32,30.11,39.6
1747017120,33.02,45.17,26.75,25.55,7.18,43.7,30.9,39.34
1747017180,33.49,45.7,26.06,25.44,7.48,44.02,32.12,40.63
1747017240,32.71,44.36,26.16,25.17,7.5,45.24,31.52,40.11
1747017300,33.88,45.78,26.51,25.77,7.5,44.52,31.63,41.21
1747017360,33.11,45.98,26.8,25.45,7.5,43.9,31.53,40.39
1747017420,33.36,44.86,26.58,26.05,7.4,42.71,32.55,39.59
1747017480,33.6,44.37,25.18,26.73,7.5,44.11,33.7,40.38
1747017540,34.53,43.63,26.58,25.91,7.5,44.23,33.36,39.11
1747017600,35.32,42.85,27.42,25.16,7.5,42.85,32.42,40.22
1747017660,35.32,43.82,28.83,24.94,7.27,43.64,33.38,40.4
1747017720,34.09,42.47,27.54,25.73,6.17,42.84,34.19,40.28
1747017780,34.62,43.87,27.8,26.36,5.88,42.97,34.51,41.54
1747017840,35.19,42.4,27.17,25.46,6.18,42.36,34.14,41.56
1747017900,35.4,42.87,28.09,24.15,6.44,41.95,32.8,41.31
1747017960,35.9,41.6,29.51,25.5,5.55,43.22,32.07,42.56
1747018020,36.8,41.54,30.86,25.49,5.5,43.74,32.03,43.75
1747018080,36.56,41.12,30.14,26.04,6.14,44.08,32.99,43.95
1747018140,35.91,40.13,29.98,26.85,6.38,42.96,32.79,44.18
1747018200,34.66,40.6,29.39,25.51,5.5,42.34,34.21,44.74
1747018260,35.45,41.14,29.95,24.12,5.6,42.64,33.12,45.7
1747018320,34.55,41.39,30.37,24.01,5.79,43.86,33.63,45.06
1747018380,35.43,42.16,31.1,25.07,5.5,43.32,34.28,46.42
1747018440,35.27,41.85,32.02,25.01,6.19,43.74,34.92,47.18
1747018500,35.31,41.57,30.77,23.55,5.5,43.66,34.91,47.98
1747018560,34.25,41.12,30.18,22.47,6.61,44.24,33.49,47.53
1747018620,33.65,41.79,29.35,23.19,7.5,44.13,32.42,46.17
1747018680,33.89,41.77,30.66,23.41,7.5,45.18,31.16,46.29
1747018740,34.92,41.68,29.77,22.62,7.11,44.71,31.3,44.88
1747018800,34.94,41.89,30.53,21.15,7.45,45.13,30.48,45.26`;
    
    // Skip the header
    const rows = csvData.split('\n').slice(1);
    
    // Begin a transaction for better performance
    await db.execAsync('BEGIN TRANSACTION');
    
    for (const row of rows) {
      const columns = row.split(',');
      
      // Use corresponding values from CSV
      const moisture = parseFloat(columns[1]);
      const humidity = parseFloat(columns[2]);
      const soilTemp = parseFloat(columns[3]);
      const airTemp = parseFloat(columns[4]);
      const pH = parseFloat(columns[5]);
      const nitrogen = parseFloat(columns[6]);
      const phosphorus = parseFloat(columns[7]);
      const potassium = parseFloat(columns[8]);
        // Insert the sensor data
      await insertSensorData(
        db, 
        Number(sessionId), 
        nitrogen, 
        phosphorus, 
        potassium, 
        pH,
        moisture,
        humidity,
        soilTemp,
        airTemp
      );
    }

    // Commit the transaction
    await db.execAsync('COMMIT');
    
    console.log(`Inserted ${rows.length} sensor readings into the database`);
    return true;
  } catch (error) {
    // If there's an error, roll back changes
    await db.execAsync('ROLLBACK');
    console.error('Error inserting CSV data:', error);
    throw error;
  }
}