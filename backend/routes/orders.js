const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const ordersDataPath = path.join(__dirname, '../data/orders.json');
const Order = require('../models/order');

// Read orders data
async function readOrdersData() {
  try {
    const data = await fs.readFile(ordersDataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders data:', error);
    return { orders: [] };
  }
}

// Write orders data
async function writeOrdersData(data) {
  try {
    await fs.writeFile(ordersDataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing orders data:', error);
    throw error;
  }
}

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    // Calculate summary statistics
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const activeOrders = orders.filter(order => ['pending', 'processing', 'shipped'].includes(order.status)).length;
    const recentOrders = orders.filter(order => {
      const orderDate = new Date(order.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return orderDate >= thirtyDaysAgo;
    }).length;
    const pendingOrders = orders.filter(order => ['pending', 'processing'].includes(order.status)).length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered');
    let avgRating = 0;
    if (deliveredOrders.length > 0) {
      const totalRating = deliveredOrders.reduce((sum, order) => {
        const baseRating = 4.0;
        const valueBonus = Math.min(order.total / 100, 0.5);
        const recencyBonus = 0.3;
        return sum + (baseRating + valueBonus + recencyBonus);
      }, 0);
      avgRating = Math.min(totalRating / deliveredOrders.length, 5.0);
    }
    const rewardPoints = Math.floor(totalSpent * 10);
    res.json({
      orders,
      summary: {
        totalOrders,
        totalSpent,
        activeOrders,
        recentOrders,
        pendingOrders,
        avgRating: parseFloat(avgRating.toFixed(1)),
        rewardPoints
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      id: `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await newOrder.save();
    res.status(201).json({ order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    const newStatus = req.body.status;
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { status: newStatus, updatedAt: new Date().toISOString() },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ id: req.params.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const { orders } = await readOrdersData();
    
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const activeOrders = orders.filter(order => ['pending', 'processing', 'shipped'].includes(order.status)).length;
    const recentOrders = orders.filter(order => {
      const orderDate = new Date(order.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return orderDate >= thirtyDaysAgo;
    }).length;
    const pendingOrders = orders.filter(order => ['pending', 'processing'].includes(order.status)).length;
    
    // Calculate average rating
    const deliveredOrders = orders.filter(order => order.status === 'delivered');
    let avgRating = 0;
    if (deliveredOrders.length > 0) {
      const totalRating = deliveredOrders.reduce((sum, order) => {
        const baseRating = 4.0;
        const valueBonus = Math.min(order.total / 100, 0.5);
        const recencyBonus = 0.3;
        return sum + (baseRating + valueBonus + recencyBonus);
      }, 0);
      avgRating = Math.min(totalRating / deliveredOrders.length, 5.0);
    }
    
    const rewardPoints = Math.floor(totalSpent * 10);
    
    // Status breakdown
    const statusBreakdown = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    
    // Category breakdown
    const categoryBreakdown = orders.reduce((acc, order) => {
      order.items.forEach(item => {
        acc[item.category] = (acc[item.category] || 0) + 1;
      });
      return acc;
    }, {});
    
    res.json({
      summary: {
        totalOrders,
        totalSpent,
        activeOrders,
        recentOrders,
        pendingOrders,
        avgRating: parseFloat(avgRating.toFixed(1)),
        rewardPoints
      },
      breakdown: {
        status: statusBreakdown,
        category: categoryBreakdown
      }
    });
  } catch (error) {
    console.error('Error getting order statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 