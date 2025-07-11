const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  id: String,
  userId: String,
  date: String,
  status: String,
  total: Number,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      category: String
    }
  ],
  deliveryAddress: String,
  paymentMethod: String,
  trackingNumber: String,
  createdAt: String,
  updatedAt: String,
  category: String // Add this if you use it in your JSON
});

module.exports = mongoose.model('Order', OrderSchema);