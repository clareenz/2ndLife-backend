const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a notification
router.post('/notifications', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({
        success: true,
        messages,
      });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

// Get notifications for a user or seller
router.get('/notifications', async (req, res) => {
  const { userId, sellerId } = req.query;
  try {
    let notifications;
    if (userId) {
      notifications = await Notification.find({ userId });
    } else if (sellerId) {
      notifications = await Notification.find({ sellerId });
    } else {
      return res.status(400).send({ message: 'UserId or SellerId required' });
    }
    res.status(201).json({
        success: true,
        messages,
      });
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

module.exports = router;
