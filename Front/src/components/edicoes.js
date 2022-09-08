import {useEffect, useState} from "react";
import axios from "axios";


function Edicoes() {
    const url = "http://localhost:5001"
    const [torneiros, setTorneiros] = useState([]);
    const fetchTorneiros = async () => {
        try {
            const response = await axios.get( `${url}/torneios/listAll`);
            setTorneiros(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
            document.title = "Pktour Edições";
            fetchTorneiros();
        }
        , []);
    return (
        <div>
            <table className="table table-striped table-zebra mt-10 ml-auto mr-auto w-1/2">
                <thead>
                <tr>
                    <th>Edição</th>
                    <th>Etapas</th>
                    <th>Rebuy</th>
                    <th>Players</th>
                    <th>BuyInn</th>
                    <th>ReBuy</th>
                    <th>JackPot</th>
                    <th>TXADM</th>
                </tr>
                </thead>
                <tbody>
                {torneiros.map(torneiro => {
                    return (
                        <tr key={torneiro.id}>
                            <td><a href={`/etapas/${torneiro.id}`}>{torneiro.torneio}</a></td>
                            <td>{torneiro.qtd_etapas}</td>
                            <td>{torneiro.qtd_rebuy}</td>
                            <td>{torneiro.qtd_players}</td>
                            <td>{torneiro.vlr_buyinn}</td>
                            <td>{torneiro.vlr_rebuy}</td>
                            <td>{torneiro.vlr_jackpot}</td>
                            <td>{torneiro.vlr_txadm}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Edicoes;
