import axios from "axios";
import {useEffect, useState} from "react";


function Torneios() {
    const url = "http://localhost:5001"

    const [ranking, setRanking] = useState([]);
    const [torneios, setTorneios] = useState([]);
    const [edicao, setEdicao] = useState();
    const [etapas, setEtapas] = useState([]);
    const [destivado, setDestivado] = useState("disabled");


    const fetchRanking = async (etapa) => {
        let resposta = await axios.get(`${url}/ranking/list/${edicao}/${etapa}`);
        setRanking(resposta.data);

    }

    async function fetchEtapa(value) {
        setEdicao(value);
        try {
            let resposta = await axios.get(`${url}/etapas/${value}`);
            setEtapas(resposta.data);
            setDestivado("")
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const fetchTorneios = async () => {
            let resposta = await axios.get(`${url}/torneios`);
            setTorneios(resposta.data);
        }

        fetchTorneios();

    }, []);

    function RenderTable() {
        if (ranking.length > 0) {
            return (
                <table className="table table-zebra w-1/2 ml-auto mr-auto mt-4">
                    <thead>
                    <tr>
                        <th>Player</th>
                        <th>Buy Inn</th>
                        <th>Qtd Rebuy</th>
                        <th>Posição</th>
                        <th>Pontuação</th>
                        <th>Premio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ranking.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.player}</td>
                                <td>{item.buy_inn}</td>
                                <td>{item.qtd_rebuy}</td>
                                <td>{item.posicao}</td>
                                <td>{item.pontuacao}</td>
                                <td>{item.premio}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )
        }
    }

    return (
        <div>
            <div className="ml-4 mt-4">
                <select className="select select-accent " onChange={async ({...e}) => {
                    fetchEtapa(e.target.value);
                }}>
                    <option disabled selected>Selecione a Edição</option>
                    {torneios.map((torneio, index) => {
                        return <option key={index}>{torneio.torneio}</option>
                    })}
                </select>
                <select className="select ml-4" disabled={destivado} onChange={({...e}) => {
                    fetchRanking(e.target.value)
                }}>
                    <option disabled selected>Selecione a Etapa</option>
                    {etapas.map((etapa, index) => {
                        return <option key={index}>{etapa.etapa}</option>
                    })}
                </select>
            </div>
            <div className="overflow-x-auto">
                <RenderTable/>
            </div>
        </div>
    );
}

export default Torneios;