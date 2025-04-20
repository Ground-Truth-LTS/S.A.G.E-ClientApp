-- CreateTable
CREATE TABLE "Device" (
    "device_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "device_name" TEXT
);

-- CreateTable
CREATE TABLE "Session" (
    "session_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp_start" DATETIME,
    "timestamp_end" DATETIME,
    "location" TEXT,
    "device_id" INTEGER NOT NULL,
    CONSTRAINT "Session_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device" ("device_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Processed_Sensor_Data" (
    "data_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME,
    "nitrogen" REAL,
    "phosphorus" REAL,
    "potassium" REAL,
    "pH" REAL,
    "moisture" REAL,
    "temperature" REAL,
    "session_id" INTEGER NOT NULL,
    CONSTRAINT "Processed_Sensor_Data_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session" ("session_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
