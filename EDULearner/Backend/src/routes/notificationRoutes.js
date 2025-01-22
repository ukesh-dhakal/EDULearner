const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/middleware');


router.get('/', verifyToken, getNotifications);


router.put('/:id', verifyToken, markAsRead);

module.exports = router;
