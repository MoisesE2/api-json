const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../utils/dbHelper');


router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.items);
});


router.get('/:id', (req, res) => { 
  const db = readDB();
  const id = parseInt(req.params.id);
  const item = db.items.find(i => i.id === id);
  
  if (!item) return res.status(404).json({ message: 'Item não encontrado' });
  res.json(item);
});


router.post('/', (req, res) => {
  const db = readDB();
  const newItem = {
    id: Date.now(),
    ...req.body
  };
  
  db.items.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});


router.put('/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.items.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }
  
 
  db.items[index] = { ...db.items[index], ...req.body, id };
  writeDB(db);
  res.json(db.items[index]);
});


router.delete('/:id', (req, res) => { 
  const db = readDB();
  const id = parseInt(req.params.id);
  const initialLength = db.items.length;
  
  db.items = db.items.filter(i => i.id !== id);
  
  if (db.items.length === initialLength) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }
  
  writeDB(db);
  res.status(204).send();
});

module.exports = router;