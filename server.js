import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the books directory
app.use('/books', express.static(path.join(__dirname, 'books')));

// Serve the Vite/React application
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/books', (req, res) => {
  const booksDir = path.join(__dirname, 'books');
  fs.readdir(booksDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read books directory' });
    }
    const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
    res.json(pdfFiles);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});