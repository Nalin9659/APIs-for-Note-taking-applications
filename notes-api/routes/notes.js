const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const notesFilePath = path.join(__dirname, '../data/notes.json');

// Utility: Read notes from the file
function getNotes() {
  const data = fs.readFileSync(notesFilePath, 'utf-8');
  return JSON.parse(data);
}

// Utility: Write notes to the file
function saveNotes(notes) {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}

// 1. GET /notes - Fetch all notes
router.get('/', (req, res) => {
  const { sort } = req.query;
  let notes = getNotes();

  // Sorting logic
  if (sort === 'date') {
    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === 'length') {
    notes.sort((a, b) => b.content.length - a.content.length);
  }

  res.json(notes);
});

// 2. POST /notes - Create a new note
router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const notes = getNotes();
  const newNote = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  saveNotes(notes);

  res.status(201).json(newNote);
});

// 3. GET /notes?search={query} - Search notes by title or content
router.get('/search', (req, res) => {
  const { query } = req.query;
  const notes = getNotes();

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const filteredNotes = notes.filter(note =>
    note.title.includes(query) || note.content.includes(query)
  );

  res.json(filteredNotes);
});

// 4. DELETE /notes/:id - Delete a note
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let notes = getNotes();

  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes.splice(noteIndex, 1);
  saveNotes(notes);

  res.status(204).send();
});

module.exports = router;
