import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Etapas() {
    let {id} = useParams();
    const [etapa, setEtapa] = useState([]);
    const fetchEtapas = async () => {
        const response = await axios.get(`http://localhost:5000/etapas/list/${id}`);
        setEtapa(response.data);
        console.log(response.data);
    }

    useEffect(() => {
            fetchEtapas()
        }
        , []);

    return (
        <div>
            <table className="table table-zebra w-1/2 mr-auto ml-auto mt-12">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ponuação</th>
                        <th>Posição</th>
                        <th>Premio</th>
                        <th>Rebuy</th>
                        <th>Etapa</th>
                        <th>Torneio</th>
                    </tr>
                </thead>
                <tbody>
                    {etapa.map(etapa => {
                        return (
                            <tr key={etapa.id}>
                                <td>{etapa.player}</td>
                                <td>{etapa.pontuacao}</td>
                                <td>{etapa.posicao}</td>
                                <td>{etapa.premio}</td>
                                <td>{etapa.qtd_rebuy}</td>
                                <td>{etapa.etapa}</td>
                                <td>{etapa.torneio}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Etapas;