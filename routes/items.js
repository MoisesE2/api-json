const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../utils/dbHelper');


router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.portfolio || db.items || []);
});


router.get('/:id', (req, res) => { 
  const db = readDB();
  const id = parseInt(req.params.id);
  const items = db.portfolio || db.items || [];
  const item = items.find(i => i.id === id);
  
  if (!item) return res.status(404).json({ message: 'Item não encontrado' });
  res.json(item);
});


router.post('/', (req, res) => {
  const db = readDB();
  const newItem = {
    id: Date.now(),
    ...req.body
  };
  
  // Suporta tanto 'portfolio' quanto 'items' para compatibilidade
  if (db.portfolio) {
    db.portfolio.push(newItem);
  } else {
    if (!db.items) db.items = [];
    db.items.push(newItem);
  }
  
  writeDB(db);
  res.status(201).json(newItem);
});


router.put('/:id', (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const items = db.portfolio || db.items || [];
  const index = items.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }
  
  items[index] = { ...items[index], ...req.body, id };
  
  // Atualizar a propriedade correta
  if (db.portfolio) {
    db.portfolio = items;
  } else {
    db.items = items;
  }
  
  writeDB(db);
  res.json(items[index]);
});


router.delete('/:id', (req, res) => { 
  const db = readDB();
  const id = parseInt(req.params.id);
  const items = db.portfolio || db.items || [];
  const initialLength = items.length;
  
  const filteredItems = items.filter(i => i.id !== id);
  
  if (filteredItems.length === initialLength) {
    return res.status(404).json({ message: 'Item não encontrado' });
  }
  
  // Atualizar a propriedade correta
  if (db.portfolio) {
    db.portfolio = filteredItems;
  } else {
    db.items = filteredItems;
  }
  
  writeDB(db);
  res.status(204).send();
});

module.exports = router;