import { useEffect, useState } from 'react';
import Style from './Raffle.module.css';
import { useParams } from 'react-router-dom';
import defaultImg from '../../Img/Fundo da Listagem.jpg';
import CardDetails from '../Details/CardDetails/CardDetails';
import html2canvas from 'html2canvas';

function Raffle() {

    const { id_raffle } = useParams();

    const [raffle, setRaffle] = useState();

    const [results, setResults] = useState({});

    const [paramsScreen, setParamsScreen] = useState(false);

    const [message, setMessage] = useState('');

    const handleResults = (e) => {

        setResults(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    const drawItems = (e) => {

        e.preventDefault();

        if (Object.keys(raffle.categories).length === 2) {

            let itemsCat1 = [];
            let itemsCat2 = [];

            let orderCat1 = [];
            let orderCat2 = [];

            const FinalItems1 = [];
            const FinalItems2 = [];

            const [cat1, _] = Object.keys(raffle.categories);

            raffle.items.map((item) => {

                if (item.id_category == cat1) {

                    itemsCat1.push(item.name);

                }

                else {

                    itemsCat2.push(item.name);
                }



            });

            const repetitions = Math.max(itemsCat1.length, itemsCat2.length);

            if (results.ordem && results.ordem.trim() !== '') {

                if (results.ordem == cat1) {

                    let p = 0;

                    while (FinalItems1.length <= repetitions) {

                        FinalItems1.push(itemsCat1[p]);

                        if (p == itemsCat1.length) {

                            p = 0;
                        }

                        else {

                            p++;

                        }


                    };

                    while ((FinalItems2.length + orderCat2.length) < repetitions) {

                        const number2 = Math.floor(Math.random() * (itemsCat2.length));

                        if (orderCat2.length === itemsCat2.length) {

                            FinalItems2.push(...orderCat2);

                            orderCat2 = [];

                        }

                        if (!orderCat2.includes(itemsCat2[number2])) {

                            orderCat2.push(itemsCat2[number2]);

                        }

                        if ((FinalItems2.length + orderCat2.length) == repetitions) {

                            FinalItems2.push(...orderCat2)

                        };

                    };

                }

                else {

                    let p = 0;

                    while (FinalItems2.length <= repetitions) {

                        FinalItems2.push(itemsCat2[p]);

                        if (p == itemsCat2.length) {

                            p = 0;
                        }

                        else {

                            p++;

                        }


                    };

                    while ((FinalItems1.length + orderCat1.length) < repetitions) {

                        const number1 = Math.floor(Math.random() * (itemsCat1.length));

                        if (orderCat1.length === itemsCat1.length) {

                            FinalItems1.push(...orderCat1);

                            orderCat1 = [];

                        }

                        if (!orderCat1.includes(itemsCat1[number1])) {

                            orderCat1.push(itemsCat1[number1]);
                        }

                        if ((FinalItems1.length + orderCat1.length) == repetitions) {

                            FinalItems1.push(...orderCat1);
                        }

                    };

                }

                setResults(prev => ({

                    ...prev,

                    cat1: FinalItems1,
                    cat2: FinalItems2,


                }));

            }

            else {

                setMessage('Defina a ordem da Combinação');
            }

        }

        else {

            if (results.numResults && results.numResults > 0 && results.numResults < raffle.items.length) {

                const positions = [];

                while (positions.length < results.numResults) {

                    const number = Math.floor(Math.random() * (raffle.items.length));

                    if (!positions.includes(number)) {

                        positions.push(number);

                    }

                };

                const resultsDraw = positions.map((number) => {

                    const item = raffle.items[number];

                    const name = item.name;

                    return name;

                });

                setResults(prev => ({

                    ...prev,

                    cat1: resultsDraw

                }));

            }

            else {

                setMessage('Defina um número de resultados válido');
            }

        } //OK

    };

    const exportarImagem = () => {

        const elemento = document.getElementById('results');

        const divOverFlw = document.getElementById('divOverFlow');

        divOverFlw.classList.remove(Style.overFlow);

        html2canvas(elemento).then(canvas => {

            const link = document.createElement('a');

            link.download = 'slides.jpg';

            link.href = canvas.toDataURL('image/jpeg');

            link.click();

        });

        divOverFlw.classList.add(Style.overFlow);

    };

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

    }, [id_raffle]);

    return (

        <div className={Style.body}>

            <div className={`${Style.infoRaffle} ${paramsScreen ? Style.paramsEnabled : ''}`}>

                <img src={defaultImg} alt='Imagem com um ponto de interrogação' />
                <h1>{raffle?.title}</h1>
                <div className={Style.cards}>

                    {raffle?.categories && Object.entries(raffle.categories).length > 0 &&

                        Object.entries(raffle.categories).map(([id, title]) => (

                            <CardDetails cat={title} items={raffle.items} position={id} />

                        ))
                    }

                </div>
                <button className={Style.btnDefault} onClick={(e) => { drawItems(e) }}>Sortear</button>

            </div>
            <div className={`${Style.conteinerRaffle} ${paramsScreen ? Style.paramsEnabled : ''}`}>

                <div className={Style.Results}>

                    <h1>Resultados:</h1>

                    {results && Object.keys(results).length > 1 &&

                        <div className={Style.cardResults} id='results' >

                            <div className={`${Style.itemsResults} ${Style.overFlow}`} id='divOverFlow'>

                                {results.cat1 && Object.entries(results).map(([key, values]) => {

                                    if (key?.includes('cat')) {

                                        return (

                                            <div className={Style.items}>

                                                {values.map((value) => <p>{value}</p>)}

                                            </div>

                                        )

                                    }

                                    return null;

                                })}

                            </div>

                        </div>

                    }

                </div>
                <div className={Style.alingBtns}>

                    <button className={Style.btnDefault} onClick={() => { setParamsScreen(true) }}>

                        Parâmetros

                    </button>

                    {results && Object.keys(results).length > 1 &&

                        <button className={Style.btnDefault} onClick={() => { exportarImagem() }}>

                            Exportar

                        </button>
                    }

                </div>

            </div>

            {paramsScreen &&

                <div className={Style.params}>

                    {Object.keys(raffle?.categories).length == 2 ?

                        <>
                            <h2>Ordem de Combinação</h2>
                            <select
                                name='ordem'
                                value={results?.ordem}
                                onChange={(e) => { handleResults(e) }}
                            >

                                <option></option>

                                {Object.entries(raffle?.categories).map(([key, value]) => (

                                    <option value={key}>{value}</option>

                                ))



                                }

                            </select>

                        </>

                        :

                        <>
                            <h2>Número de Resultados</h2>
                            <input
                                type='number'
                                name='numResults'
                                value={results?.numResults}
                                onChange={(e) => { handleResults(e) }}
                            />

                        </>

                    }

                    <button className={Style.btnDefault}
                        onClick={() => { setParamsScreen(false) }}>

                        OK

                    </button>

                </div>

            }

            {message &&

                <div className={Style.message}>

                    <h3>{message}</h3>

                    <button
                        onClick={() => { setMessage('') }}
                        className={Style.btnDefault}
                    >

                        OK

                    </button>

                </div>

            }

        </div>
    );

}

export default Raffle;