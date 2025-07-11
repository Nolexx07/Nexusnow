const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/wishlist.json');

// Get wishlist
router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load wishlist' });
    res.json(JSON.parse(data));
  });
});

// Add to wishlist
router.post('/', (req, res) => {
  const newItem = req.body;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load wishlist' });
    let wishlist = JSON.parse(data);
    if (wishlist.find(i => i.id === newItem.id)) {
      return res.status(400).json({ error: 'Item already in wishlist' });
    }
    wishlist.push(newItem);
    fs.writeFile(dataPath, JSON.stringify(wishlist, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to save wishlist' });
      res.json(wishlist);
    });
  });
});

// Remove from wishlist
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load wishlist' });
    let wishlist = JSON.parse(data);
    wishlist = wishlist.filter(i => i.id !== id);
    fs.writeFile(dataPath, JSON.stringify(wishlist, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to save wishlist' });
      res.json(wishlist);
    });
  });
});

module.exports = router; 