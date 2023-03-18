import axios from "axios";
import {useEffect, forceUpdate, useState} from "react";

const initialState = {
	ranking: [],
	torneios: [],
	edicao: "",
	etapas: [],
	rankingApi: [],
	rankingGeral: [],
	players: [],
	etapaDesativada: true
};

function Torneios() {
	const url = "http://localhost:5001"
	const [state,setState] = useState(initialState);

	useEffect(() => {
			const fetchTorneios = async () => {
				const resposta = await axios.get(`${url}/torneios`);

				await setState((state) => {
					return {...state, torneios: resposta.data.sort( (a,b) => a.torneio < b.torneio)}
				})

				console.log('state: ', state);
			}
			fetchTorneios().catch(e => {
				console.log(e);
			});

		},
		[]);

	useEffect(() => {
		const fetchEtapa = async () => {
			if(state.edicao === "") return;
			const etapas = await axios.get(`${url}/etapas/${state.edicao}`);
			const geral  = await axios.get(`${url}/ranking/geral/${state.edicao}`);


			console.log('rankingApi: ', geral)

			setState((state) => {
				return { ...state, etapas:  etapas.data.sort( (a,b) => a.id > b.id ), rankingApi: geral.data }
				})
		};
		fetchEtapa().catch(e => { console.log('fetchEtapa:', e)})
	}, [state.edicao]);

	useEffect(() => {
		const adjustRanking = async () => {
			// console.log('adjustRanking')
			const unique = (arr) => [...new Set(arr)];
			const players = state.rankingApi.map((r) => (r.player));

			// console.log('adjustRanking: players: ', players)

			setState((state) => {
				return { ...state, players: unique(players) }
			})
		};
		adjustRanking().catch(e => { console.log('adjustRanking:', e)})
	}, [state.etapas,state.rankingApi]);

	useEffect(() => {
		return () => {
			// console.log('useEffect: players:', state.players)
			const ranking = globalRanking();

			setState((state) => {
				return Object.assign(state, {
					rankingGeral: ranking
				}, () => {
					forceUpdate();
				})
			})
		};
	}, [state.players]);


	const globalRanking = () => {
		// console.log('globalRanking: players:', state.players)
		const initGlobalRanking = () => {
			let ranking;

			ranking = [];
			state.players.forEach((p) => { ranking[p] = [] } );

			(state.etapas.map((e) => (e.id))).forEach((id) => {
				state.players.forEach((p) => { ranking[p][id] = {
					pontuacao: 0,
					premio: 0.0
				}; })
			})

			console.info("ranking init: ", ranking)
			return ranking;
		}
		const ranking = initGlobalRanking();
		state.rankingApi.forEach((rg) => {
			if(ranking[rg.player] !== undefined && ranking[rg.player][rg.id_etapa_id] !== undefined) {
				ranking[rg.player][rg.id_etapa_id].pontuacao = rg.pontuacao;
				ranking[rg.player][rg.id_etapa_id].premio    = rg.premio;
			}
		})

		console.log('retorno ranking:', ranking)
		console.log('globalRanking: players: players: ', state.players)
		console.log('globalRanking: players: etapas: ', state.etapas)
		console.log('globalRanking: players: ranking: ', Object.keys(ranking))
		return ranking;
	}

	async function fetchRanking(etapa) {
		const resposta = await axios.get(`${url}/ranking/list/${state.edicao}/${etapa}`);
		await setState((state) => ( { ...state, ranking: resposta.data } ))
	}

	async function fetchEdicao(value) {
		await setState((state) => ( { ...state, edicao: value } ))
	}

	function RenderTableEtapa() {
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
					{state.ranking.map((item, index) => {
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

	function RenderClassificationTable() {
		const unique_ids = state.etapas.map((e) => (e.id)).sort()
		const players = state.players
		const rankingGeral = state.rankingGeral
		// console.log("ClassificationTable: Players: ",state.players);
		// console.log("ClassificationTable: RankingGeral: ",state.rankingGeral);
		console.log('state on render: ', state)

		return (
			<table className="table table-zebra w-1/2 ml-auto mr-auto mt-4">
				<thead>
				<tr>
					<th>Player</th>
					{
						unique_ids.map((id,idx) => (<th key={idx}>{id}</th>))
					}
				</tr>
				</thead>
				<tbody>
				{
					players.map((player,idx) => {
						return (<tr key={idx}>
							<td>{player}</td>
							{
								unique_ids.map((id,idx2) => {
									return rankingGeral[player] === undefined || rankingGeral[player][id] === undefined ? "" :
										(<td key={idx2}>{ rankingGeral[player][id].pontuacao}</td>)
								})
							}
						</tr>)
					})
				}
				</tbody>
			</table>
		)
	}

	const clickGeral = () => { setState((state) => ( Object.assign(state, { etapaDesativada: true }) )) }
	const clickEtapa = () => { setState((state) => ( Object.assign(state, { etapaDesativada: false }) )) }

	// console.log(state.torneios);

	return (
		<div>
			<div>
				<h3>Classificação</h3>
				<p>
					<div className={"cursor-pointer"} onClick={e => clickGeral(e)}>Geral</div>
					<div className={"cursor-pointer"} onClick={e => clickEtapa(e)}>Etapa</div>
				</p>
			</div>
			<div className="ml-4 mt-4">
				<select className="select select-accent " defaultValue={0} onChange={async ({...e}) => {
					await fetchEdicao(e.target.value);
				}}>
					<option disabled selected>Selecione a Edição</option>
					{state.torneios.map((torneio, index) => {
						return <option key={index}>{torneio.torneio}</option>
					})}
				</select>
				<select className="select ml-4" defaultValue={0} disabled={state.etapaDesativada} onChange={ async ({...e}) => {
					await fetchRanking(e.target.value)
				}}>
					<option>Etapa</option>
					{state.etapas.map((etapa, index) => {
						return <option key={index}>{etapa.etapa}</option>
					})}
				</select>
			</div>
			<div className="overflow-x-auto">
				{!state.etapaDesativada ? <RenderTableEtapa />: ""}
				{state.etapaDesativada ? <RenderClassificationTable />: ""}
			</div>
		</div>
	);
}

export default Torneios;