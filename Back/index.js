const bodyParser = require("body-parser");
const express = require("express");
const Ranking = require("./Routes/ranking");
const Torneios = require("./Routes/torneios");
const Etapas = require("./Routes/etapas");
const cors = require("cors")
const app = express();
const port = 5001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/ranking", Ranking);

app.use("/torneios", Torneios);

app.use("/etapas", Etapas);

app.listen(port, () =>
    console.log(
        `servidor rodando na porta ${port} link: http://localhost:${port}`
    )
);