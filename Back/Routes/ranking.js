const express = require('express');
const router = express.Router();
const pool = require('../Config/connection');

router.get('/:torneio/:edicao', (req, res) => {
    const torneio = req.params.torneio;
    const edicao = req.params.edicao;
    pool.query('select a.id, a.buy_inn, a.qtd_rebuy, a.posicao, a.pontuacao, a.premio, c.etapa, d.torneio , b.player \n' +
        'from pkapp_ranking a, pkapp_players b, pkapp_etapas c, pkapp_torneios d \n' +
        'where a.id_player_id = b.id and a.id_etapa_id = c.id and a.id_torneio_id = d.id and d.torneio = $1 and c.etapa = $2 \n' +
        'order by a.pontuacao desc\n',[torneio,edicao], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
})

module.exports = router;