import { useEffect, useState } from 'react';
import Style from './Raffle.module.css';
import { useParams } from 'react-router-dom';
import defaultImg from '../../Img/Fundo da Listagem.jpg';
import CardDetails from '../Details/CardDetails/CardDetails';

function Raffle() {

    const { id_raffle } = useParams();

    const [raffle, setRaffle] = useState();

    const [results, setResults] = useState({

        cat1: ['Lucas Alves', 'Lucas Yohan', 'Leticia', 'João'],
        cat2: ['Slide 5', 'Slide 6', 'Slide 7', 'Slide 8']

    });

    const [paramsScreen, setParamsScreen] = useState(false);

    useEffect(() => {

        fetch(`http://localhost:3000/api/raffle/listRaffle/${id_raffle}`)
            .then(response => {

                if (!response.ok) {

                    throw new Error("Erro ao buscar os dados");

                }

                return response.json();

            })
            .then(data => setRaffle(data.message))
            .catch((err) => console.log(err));

    }, []);

    const handleResults = (e) => {

        setResults(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    return (

        <div className={Style.body}>

            <div className={`${Style.infoRaffle} ${paramsScreen ? Style.paramsEnabled : ''}`}>

                <img src={defaultImg} />
                <h1>{raffle?.title}</h1>
                <div className={Style.cards}>

                    {raffle?.categories && Object.entries(raffle.categories).length > 0 &&

                        Object.entries(raffle.categories).map(([id, title]) => (

                            <CardDetails cat={title} items={raffle.items} position={id} key={id} />

                        ))
                    }

                </div>
                <button className={Style.btnDefault}>Sortear</button>

            </div>
            <div className={`${Style.conteinerRaffle} ${paramsScreen ? Style.paramsEnabled : ''}`}>

                <h1>Resultados</h1>

                {results && Object.keys(results).length > 1 &&

                    <div className={Style.cardResults}>

                        {results && Object.entries(results).map(([key, values]) => {

                            if (key?.includes('cat')) {

                                return (

                                    <div className={Style.items}>

                                        {values.map((value) => <p>{value}</p>)}

                                    </div>

                                )



                            }

                        })}

                    </div>

                }

                {raffle?.categories && Object.keys(raffle.categories).length === 2 ? (

                    <div className={Style.ghostDiv}></div>

                ) : (

                    <button className={Style.btnDefault} onClick={() => { setParamsScreen(true) }}>

                        Parâmetros

                    </button>

                )}

            </div>

            {paramsScreen &&

                <div className={Style.params}>

                    <h2>Número de Resultados</h2>
                    <input
                        type='number'
                        name='numResults'
                        value={results?.numResults}
                        onChange={(e) => { handleResults(e) }}
                    />
                    <button className={Style.btnDefault}
                        onClick={() => { setParamsScreen(false) }}>

                        OK

                    </button>

                </div>

            }

        </div>
    );

}

export default Raffle;