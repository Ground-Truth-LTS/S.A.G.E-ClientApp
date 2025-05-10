import * as SQLite from 'expo-sqlite';


// DB Creation
export const createDB = async  () => {

  const db = await SQLite.openDatabaseAsync('sage.db');
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
        timestamp_start TEXT,
        timestamp_end TEXT,
        location TEXT,
        device_id INTEGER,
        FOREIGN KEY (device_id) REFERENCES Device(device_id)
      );
    `)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Processed_Sensor_Data (
        data_id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER,
        nitrogen REAL,
        phosphorus REAL,
        potassium REAL,
        pH REAL,
        moisture REAL,
        temperature REAL,
        FOREIGN KEY (session_id) REFERENCES Session(session_id)
      );`)
    return db;
}

// Insert into Tables

export const insertDevice = async (db : SQLite.SQLiteDatabase, device_name: String) => {
  const result = await db.runAsync('INSERT INTO Device (device_name) VALUES (?)', device_name);
  //console.log(result.lastInsertRowId,result.changes);
}

export const insertSession = async (db : SQLite.SQLiteDatabase, timestamp_start : String,
  timestamp_end : String, location : String, device_id  : Number) => {
  const result = await db.runAsync(`
    INSERT INTO Session (
    timestamp_start,
    timestamp_end,
    location,
    device_id ) VALUES (?,?,?,?)`, timestamp_start, timestamp_end, location, device_id);
  //console.log(result.lastInsertRowId,result.changes);
}

export const insertSensorData = async (db : SQLite.SQLiteDatabase, session_id : Number,
   nitrogen : Number, phosphorus : Number, potassium : Number, pH : Number, moisture : Number, temperature : Number) => {
  const result = await db.runAsync(`INSERT INTO Processed_Sensor_Data (
        session_id,
        nitrogen,
        phosphorus,
        potassium,
        pH,
        moisture,
        temperature) VALUES (?,?,?,?,?,?,?)`, session_id, nitrogen, phosphorus, potassium, pH, moisture, temperature);
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

export const insertDummyData = async(db : SQLite.SQLiteDatabase) => {
  // Insert a dummy device
  await insertDevice(db, "Device A");

  // Insert a dummy session for the device with device_id = 1
  // (Assuming the device_id returned above is 1; adjust as needed)
  const startDate = "2023-04-01T10:00:00Z";
  const endDate = "2023-04-01T11:00:00Z";
  await insertSession(db, startDate, endDate, "New York", 1);

  // Insert dummy sensor data for the session with session_id = 1
  // (Assuming the session_id returned above is 1)
  await insertSensorData(db, 1, 10.5, 15.2, 20.3, 7.4, 30.0, 25.5);
}