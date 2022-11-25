import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const cors = require('cors');
const ical = require('ical-generator');
const calendar = ical({ name: 'my first iCal' });

const ABSENCES_PATH = path.join(__dirname, 'json_files', 'absences.json');
const MEMBERS_PATH = path.join(__dirname, 'json_files', 'members.json');

const app: Express = express();
app.use(cors());
app.use(express.json());

const readJsonFile = (path: fs.PathOrFileDescriptor) =>
  new Promise((resolve) => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
    .then((data) => JSON.parse(data as string))
    .then((data) => data.payload);

app.get('/absences', async (req: Request, res: Response) => {
  const absences = await readJsonFile(ABSENCES_PATH);
  res.json(absences);
});

app.get('/members', async (req: Request, res: Response) => {
  const members = await readJsonFile(MEMBERS_PATH);
  res.json(members);
});

app.post('/addToCalendar', (req: Request, res: Response) => {
  const { startTime, endTime, name, summary } = req.body;
  calendar.createEvent({
    start: startTime,
    end: endTime,
    name: name,
    summary: summary,
    description: 'Absence',
    location: 'Crewmeister',
  });
  res.send('Added to calendar');
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/calendar', async (req: Request, res: Response) => {
  calendar.serve(res);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`⚡️[server]: Server is running at ${process.env.PORT || 8080}`);
});