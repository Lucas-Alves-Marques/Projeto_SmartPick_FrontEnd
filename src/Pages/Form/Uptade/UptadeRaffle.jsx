import Style from './UptadeRaffle.module.css'
import { useNavigate } from "react-router-dom";
import Form from '../FormRegister';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function UptadeRaffle() {

    const { id_raffle } = useParams();

    const [raffle, setRaffle] = useState({

        raffleTitle: '',
        categories: {},
        items: {}

    })

    const [newRaffleTitle, setNewRaffleTitle] = useState('')

    const [newCategories, setNewCategories] = useState({})

    const [newItems, setNewItems] = useState({})

    const [message, setMessage] = useState('')

    const [btnMessage, setBtnMessage] = useState('')

    const navigate = useNavigate()

    const handleItem = (e) => {

        const found = newItems.some(item => item.id_item === e.target.id);

        if (found) {

            return newItems.map(item => {

                if( item.id_item === e.target.id && e.target.cat === item.id_category ){

                    return {...item, name: e.target.value}
                }

                else{

                    return item
                }

            }


            );
        }

        else {

            const UptadeItems = [...newItems,

                {
                    id_item: e.target.id,
                    id_category: parseInt(e.target.cat),
                    name: e.target.value,
                    
                }
            ]

            setNewItems(UptadeItems)

            console.log(newItems)
        }
    }

    const removeItem = (e) => {

        const updatedItems = newItems.map(item => {

            if (item.id_item === e.target.id) {

                return { ...item, name: '' };

            }

            return item;

        });

        // setNewItems(updatedItems);

        console.log(updatedItems);

    };

    const handleTitle = (e) => {

        setNewRaffleTitle(e.target.value)

        console.log(newRaffleTitle)

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

        setNewCategories(prev => ({

            ...prev,

            [index]: value

        }))

        console.log(newCategories)

    }

    const saveRaffle = async (e) => {

        e.preventDefault()

        //Fazer um Map em Categoria

        const validCategoty = Object.values(newCategories).every(category => category !== '');

        const validItems = Object.values(newItems).every(item => item !== "");

        if (newRaffleTitle === '') {

            setMessage('Coloque um titulo para o seu Sorteio')

            setBtnMessage('OK')

        }

        else if (!validCategoty) {

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

            console.log(raffle)

            setMessage('Sorteio Salvo')
            setBtnMessage('OK')

        }

    }

    //Recupera os dados do Banco

    useEffect(() => {

        const GetRaffle = async () => {

            try {

                const raffle = await axios.get(`http://localhost:3000/api/raffle/listRaffle/${id_raffle}`)

                const { title, categories, items } = raffle.data.message;

                setNewRaffleTitle(title);

                setNewCategories(categories);

                setNewItems(items)


            }

            catch (err) {

                console.log(err)
            }

        }

        GetRaffle()

    }, [id_raffle])

    //Teste para ver se o estado esta atualizando

    // useEffect(() => {

    //     console.log(newRaffleTitle)
    //     console.log(newCategories)
    //     console.log(newItems)

    // }, [newRaffleTitle, newCategories, newItems])

    return (

        <div className={Style.body}>

            <input className={Style.titulo} placeholder='Sorteio' onChange={handleTitle} required value={newRaffleTitle}></input>

            <div className={Style.forms}>

                {Object.entries(newCategories ?? {}).map(([index, cat]) => (

                    <Form
                        key={index}
                        handleTitleC={(e) => uptadeNameCategory(index, e.target.value)}
                        category={{ [index]: cat }}
                        functioAddItem={handleItem}
                        functioRevItem={removeItem}
                        itemsCat={newItems}
                    />

                ))}

            </div>

            <div className={Style.bnts}>

                {Object.entries(newCategories ?? {}).length < 2 &&

                    <>

                        <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); handleCategory() }}>Por Combinação</button>
                        <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>
                        <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); navigate('/listagem') }}>Voltar</button>

                    </>

                }

                {Object.entries(newCategories ?? {}).length >= 2 &&

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

                            if (message === 'Sorteio Salvo') {

                                console.log(message)

                                // navigate('/listagem');

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