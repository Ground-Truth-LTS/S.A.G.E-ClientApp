import * as SQLite from 'expo-sqlite';
import { insertDevice, getDevices } from '../database/db';


export class Device {
  device_id: number | null;
  device_name: string;


  constructor(
    device_name: string,
    device_id: number | null = null
  ) {
    this.device_name = device_name;
    this.device_id = device_id;
  }
}