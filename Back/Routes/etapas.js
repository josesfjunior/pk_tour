const express = require('express');
const router = express.Router();
const pool = require('../Config/connection');


router.get('/:edicao', (req, res) => {
    const edicao = req.params.edicao;
    console.log(edicao);
    pool.query('select a.id, etapa from pkapp_etapas a, pkapp_torneios b where a.id_torneio_id = b.id and b.torneio = $1 ', [edicao] ,(error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);

    })
})

router.get('/list/:id', (req, res) => {
    const id = req.params.id;
    pool.query('select a.buy_inn, a.pontuacao, a.posicao, a.premio, a.qtd_rebuy, b.etapa, c.player,d.torneio\n' +
        'from pkapp_ranking a, pkapp_etapas b, pkapp_players c, pkapp_torneios d\n' +
        'where  d.id = $1  and a.id_etapa_id = b.id and a.id_player_id = c.id and a.id_torneio_id = d.id\n' +
        'order by d.qtd_etapas asc', [id] ,(error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    }
    )
});

module.exports = router;