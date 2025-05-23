import Style from './UptadeRaffle.module.css'
import { useNavigate } from "react-router-dom";
import Form from '../Register/Form/FormRegister';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function UptadeRaffle() {

    const { id_raffle } = useParams();

    const [raffle, setRaffle] = useState({

        raffleTitle: '',
        categories: [],
        items: {}

    })

    const [raffleSeleted, setRaffleSeleted] = useState({});

    const [newRaffleTitle, setNewRaffleTitle] = useState('')

    const [newCategories, setNewCategories] = useState({})

    const [newItems, setNewItems] = useState({})

    const [message, setMessage] = useState('')

    const [btnMessage, setBtnMessage] = useState('')

    const navigate = useNavigate()

    const handleItem = (e) => {

        e.preventDefault()

        setNewItems({ ...newItems, [e.target.id]: e.target.value })

        // console.log(newItems)

    }

    const removeItem = (cate, nitem) => {

        if (cate === 0) {

            delete newItems[`Cat1_item${nitem}`];

        }

        else {

            delete newItems[`Cat2_item${nitem}`];

        }

        // console.log(newItems)

    };

    const handleTitle = (e) => {

        setNewRaffleTitle(e.target.value)

        // console.log(newRaffleTitle)

    }

    const handleCategory = () => {

        if (newCategories.length === 2) {

            setNewCategories(newCategories.slice(0, -1));
        }

        else {

            setNewCategories([...newCategories, ''])

        }

        // console.log(newCategories)

    }

    const uptadeNameCategory = (index, value) => {

        const updated = [...newCategories];

        const [_, cod_title] = updated[index];

        updated[index] = [value, cod_title];

        setNewCategories(updated);

        // console.log(newCategories)

    }

    const saveRaffle = async (e) => {

        e.preventDefault()

        const validCategoty = newCategories.some(category => category === '');

        const validItems = Object.values(newItems).every(item => item !== "");

        if (newRaffleTitle === '') {

            setMessage('Coloque um titulo para o seu Sorteio')

            setBtnMessage('OK')

        }

        else if (validCategoty) {

            setMessage('Defina o nome das categorias')

            setBtnMessage('OK')


        }

        else if (newCategories.length === 1 && Object.keys(newItems).length < 2) {

            setMessage('Coloque no minimo 2 itens')

            setBtnMessage('OK')

        }

        else if (validItems === false) {

            setMessage('Preencha todos os items das categorias')

            setBtnMessage('OK')

            // console.log(newItems)

            // console.log(validItems)

        }

        else {

            setRaffle(prev => ({

                ...prev,

                raffleTitle: newRaffleTitle.toUpperCase(),
                categories: newCategories,
                items: newItems

            }))

        }

    }

    //Recupera os dados do Banco

    useEffect(() => {

        try {

            const getRaffle = async () => {

                const raffle = await axios.get(`http://localhost:3000/api/raffle/listRaffle/${id_raffle}`)

                setRaffleSeleted(raffle.data.message)

            }

            getRaffle()
        }

        catch (err) {

            console.log(err)
        }

    }, [id_raffle])

    const { title, categories, items } = raffleSeleted;

    //Teste de Separação

    // useEffect(() => {

    //     console.log(title)
    //     console.log(categories)
    //     console.log(items)


    // }, [title])

    //Atulização de estado do sorteio

    useEffect(() => {

        setNewRaffleTitle(title);

        const cat = Object.entries(categories ?? {})

        setNewCategories(cat);

        setNewItems(items)


    }, [categories, title, items]);

    // useEffect(() => {

    //     console.log(newRaffleTitle, newCategories, newItems);

    //     console.log(newItems);

    // }, [newRaffleTitle, newCategories]);

    //Atualiza os dados no Banco

    useEffect(() => {

        const sendToDataBase = async () => {

            try {

                await axios.post(' http://localhost:3000/api/raffle/createRaffle', raffle)

                console.log(raffle)

                setMessage('Sorteio Cadastrado')

                setBtnMessage('OK')

            } catch (err) {

                console.log(`Erro: ${err}`)

                setMessage('Erro ao Cadastrar Sorteio')

                setBtnMessage('Tentar Novamente')

            }

        }

        if (raffle.raffleTitle && raffle.categories.length && raffle.items) {

            sendToDataBase();

        }


    }, [raffle])


    return (

        <div className={Style.body}>

            <input className={Style.titulo} placeholder='Sorteio' onChange={handleTitle} required value={newRaffleTitle}></input>

            <div className={Style.forms}>

                {Object.entries(newCategories ?? {}).map(([index, cat]) => (

                    <Form
                        key={index}
                        handleTitleC={(e) => uptadeNameCategory(index, e.target.value)}
                        category={cat}
                        functioAddItem={handleItem}
                        functioRevItem={removeItem}
                        itemsCat={newItems}
                    />

                ))}

            </div>

            <div className={Style.bnts}>

                {newCategories.length < 2 &&

                    <>

                        <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); handleCategory() }}>Por Combinação</button>
                        <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>
                        <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); navigate('/listagem') }}>Voltar</button>

                    </>

                }

                {newCategories.length >= 2 &&

                    <>

                        <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); handleCategory() }}>Sorteio Simples</button>
                        <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>
                        <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); navigate('/listagem') }}>Voltar</button>

                    </>

                }

            </div>

            {message !== '' &&

                <div className={Style.message}>

                    <h3>{message}</h3>

                    <button
                        onClick={(e) => {

                            if (message === 'Sorteio Cadastrado') {

                                console.log(message)

                                navigate('/listagem');

                            } else {

                                e.preventDefault();

                            }

                            setMessage('');

                        }}>

                        {btnMessage}

                    </button>


                </div>

            }

        </div>
    );

}

export default UptadeRaffle;