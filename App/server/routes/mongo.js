const express = require('express');
const router = express.Router();
const { connectDB } = require('../lib/mongodb');

router.get('/test-db', async (req, res) => {
    try {
        await connectDB();
        res.status(200).json({
            success: true,
            message: "MongoDB connected",
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

module.exports = router;
