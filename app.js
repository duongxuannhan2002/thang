import express from 'express';
import route from './route.js';
import path from "path"
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1',route)
app.get('/', (req, res) => {
  res.sendFile(path.join(currentDir, 'index.html'));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
