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

    const [key, setKey] = useState(null)

    const navigate = useNavigate()

    const handleTitle = (e) => {

        setNewRaffleTitle(e.target.value)

    } //OK

    const uptadeNameCategory = (index, value) => {

        setNewCategories(prev => ({

            ...prev,

            [index]: value

        }))

        console.log(newCategories)

    }//OK

    const handleCategory = () => {

        //[ ['1', 'Alunos'], ['2', 'Slides'] ]

        const deleteCat = Object.entries(newCategories)[1]

        if (deleteCat) {

            setKey(deleteCat[0])

        }

        if (deleteCat && deleteCat[1] !== ' ') {

            const UpdateItems = newItems.map((item) => {

                if (item.id_category == key) {

                    item.name = ' '

                }

                return item

            })

            setNewCategories(prev => ({

                ...prev,

                [key]: ' '

            }))

            setNewItems(UpdateItems)

        }

        else {

            setNewCategories(prev => ({

                ...prev,

                [key]: 'Categoria 2'

            }))

            for (let item of newItems) {

                if (item.id_category == key) {

                    item.name = 'Item 1'

                    break;

                }

            }

            console.log(newItems)

        }

        console.log(key)


    }//OK

    const handleItem = (e) => {

        const found = newItems.some(item => item.id_item === e.target.id);

        if (found) {

            const updatedItems = newItems.map(item => {

                if (item.id_item === e.target.id && e.target.cat === item.id_category) {

                    return { ...item, name: e.target.value }
                }

                else {

                    return item
                }

            }


            );

            setNewItems(updatedItems)

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

        }

        console.log(newItems)

    } //OK

    const removeItem = (e) => {

        const updatedItems = newItems.map(item => {

            if (item.id_item === e.target.id) {

                return { ...item, name: ' ' };

            }

            return item;

        });

        setNewItems(updatedItems);

    };//OK

    // useEffect(() => {

    //     console.log(newItems)

    // }, [newItems]) 

    const saveRaffle = async (e) => {

        e.preventDefault()

        const validCategoty = Object.values(newCategories).every(([_, cat]) => cat !== ' ' || cat !== '');

        const solidItems = newItems.filter((item) => {

            if (typeof item.id_item == "string") {

                if (item.name !== ' ') {

                    return item
                }
            }

            else {

                return item
            }

        })

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

        else {

            setRaffle(prev => ({

                ...prev,

                raffleTitle: newRaffleTitle.toUpperCase(),
                categories: newCategories,
                items: solidItems

            }))

            console.log(raffle)

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

                console.log(categories)


            }

            catch (err) {

                console.log(err)
            }

        }

        GetRaffle()

    }, [id_raffle])

    // Envia os dados para o back

    useEffect(() => {

        if (raffle.raffleTitle && raffle.categories && raffle.items) {

            axios.put(`http://localhost:3000/api/raffle/uptadeRaffle/${id_raffle}`, raffle)
            setMessage('Sorteio Salvo')
            setBtnMessage('OK')

        }





    }, [raffle])

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

                {Object.entries(newCategories ?? {}).map(([index, cat]) => {

                    if (cat != ' ') {

                        return (

                            <Form
                                key={index}
                                handleTitleC={(e) => uptadeNameCategory(index, e.target.value)}
                                category={{ [index]: cat }}
                                functioAddItem={handleItem}
                                functioRevItem={removeItem}
                                itemsCat={newItems}
                            />

                        )

                    }


                })}

            </div>

            <div className={Style.bnts}>

                {Object.entries(newCategories).every(([_, cat]) => cat !== ' ') && newCategories.length > 2 ?

                    <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); handleCategory() }}>Sorteio Simples</button>

                    : <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); handleCategory() }}>Por Combinação</button>

                }

                <>

                    <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>
                    <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); navigate('/listagem') }}>Voltar</button>

                </>

            </div>

            {message !== '' &&

                <div className={Style.message}>

                    <h3>{message}</h3>

                    <button
                        onClick={(e) => {

                            if (message === 'Sorteio Salvo') {

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