const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const shoppingRouter = require('./routes/shopping');
const transportRouter = require('./routes/transport');
const bookingRouter = require('./routes/booking');
const authRouter = require('./routes/auth');
const groceryRouter = require('./routes/grocery');
const wishlistRouter = require('./routes/wishlist');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = 'mongodb://localhost:27017/nexusnow'; // 'nexusnow' is your database name

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/shopping', shoppingRouter);
app.use('/api/transport', transportRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/auth', authRouter);
app.use('/api/grocery', groceryRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/orders', ordersRouter);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Nexusnow server running on http://localhost:${PORT}`);
}); 