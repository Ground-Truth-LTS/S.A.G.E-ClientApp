import { PrismaClient} from '@/generated/prisma';
import express from 'express';
import http from 'http';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// GET all devices
app.get('/devices', async (_req, res, next) => {
  try {
    const devices = await prisma.device.findMany();
    res.json(devices);
  } catch (err) {
    next(err);
  }
});

// GET all sessions
app.get('/sessions', async (_req, res, next) => {
  try {
    const sessions = await prisma.session.findMany();
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

// GET all sensor readings
app.get('/sensor', async (_req, res, next) => {
  try {
    const sensors = await prisma.processed_Sensor_Data.findMany();
    res.json(sensors);
  } catch (err) {
    next(err);
  }
});

// CREATE a session
app.post('/session', async (req, res, next) => {
  try {
    const { timestamp_start, timestamp_end, location, device_id } = req.body;
    const result = await prisma.session.create({
      data: {
        timestamp_start,
        timestamp_end,
        location,
        device: { connect: { device_id: Number(device_id) } },
      },
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// UPDATE a device’s name
app.put('/device/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await prisma.device.update({
      where: { device_id: Number(id) },
      data: { device_name: 'example' },
    });
    res.json(device);
  } catch (err) {
    next(err);
  }
});

// DELETE a device
app.delete('/device/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await prisma.device.delete({
      where: { device_id: Number(id) },
    });
    res.json(device);
  } catch (err) {
    next(err);
  }
});


const port = process.env.PORT ? Number(process.env.PORT) : 3000;
async function main() {
      await prisma.$connect();
      app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
          });
        }
        
        main()
          .catch(e => console.error(e))
          .finally(async () => {
                await prisma.$disconnect();
              });
