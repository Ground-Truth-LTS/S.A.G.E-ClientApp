import { PrismaClient, Prisma } from '../generated/prisma'
import express from 'express'

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/device', async (req, res) => {
    const device = await prisma.device.findMany()
})

app.post(`/session`, async (req, res) => {
    const { timestamp_start, timestamp_end, location, device_id } = req.body
    const result = await prisma.session.create({
      data: {
        timestamp_start,
        timestamp_end,
        location,
        device: { connect: { device_id: device_id } },
      },
    })
    res.json(result)
  })

app.put('/device/:id', async (req, res) => {
const { id } = req.params
const device = await prisma.device.update({
    where: { device_id: Number(id) },
    data : { device_name : "example"}
})
res.json(device)
})

app.delete(`/device/:id`, async (req, res) => {
const { id } = req.params
const post = await prisma.device.delete({
    where: {
    device_id: Number(id),
    },
})
res.json(post)
})