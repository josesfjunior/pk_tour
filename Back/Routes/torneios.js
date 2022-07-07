const express = require('express');
const router = express.Router();
const pool = require('../Config/connection');

router.get('/', (req, res) => {
    pool.query("select torneio from pkapp_torneios", (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
})
router.get('/listAll', (req, res) => {
    pool.query("select * from pkapp_torneios a order by  a.torneio;", (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
})

module.exports = router;


