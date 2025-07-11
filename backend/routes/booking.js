const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bookingsPath = path.join(__dirname, '../data/bookings.json');

router.post('/', (req, res) => {
  const booking = req.body;
  fs.readFile(bookingsPath, 'utf8', (err, data) => {
    let bookings = [];
    if (!err && data) bookings = JSON.parse(data);
    bookings.push({ ...booking, id: Date.now() });
    fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to save booking' });
      res.json({ success: true });
    });
  });
});

module.exports = router; 