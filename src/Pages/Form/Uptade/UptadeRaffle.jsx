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

    const [newItems, setNewItems] = useState([])

    const [message, setMessage] = useState('')

    const [btnMessage, setBtnMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {

        console.log(raffle)

    }, [raffle])

    //Recupera os dados do Banco

    useEffect(() => {

        const GetRaffle = async () => {

            try {

                const raffle = await axios.get(`http://localhost:3000/api/raffle/listRaffle/${id_raffle}`)

                const { title, categories, items } = raffle.data.message;

                setNewRaffleTitle(title);

                setNewCategories(categories);

                setNewItems(items)

                // console.log(categories)


            }

            catch (err) {

                console.log(err)
            }

        }

        GetRaffle()

    }, [id_raffle])

    // Envia os dados para o back

    // useEffect(() => {

    //     if (raffle.raffleTitle && raffle.categories && raffle.items) {

    //         axios.put(`http://localhost:3000/api/raffle/uptadeRaffle/${id_raffle}`, raffle)
    //         setMessage('Sorteio Salvo')
    //         setBtnMessage('OK')

    //     }

    // }, [raffle])

    //Teste para ver se o estado esta atualizando

    // useEffect(() => {

    //     console.log(newRaffleTitle)
    //     console.log(newCategories)
    //     console.log(newItems)

    // }, [newRaffleTitle, newCategories, newItems])

    // useEffect(() => {

    //     console.log(newItems)

    // }, [newItems])

    const handleTitle = (e) => {

        setNewRaffleTitle(e.target.value)

    } //OK

    const uptadeNameCategory = (index, value) => {

        setNewCategories(prev => ({

            ...prev,

            [index]: value

        }))

        // console.log(newCategories)

    }//OK

    const handleCategory = () => {

        //[ ['1', 'Alunos'], ['2', 'Slides'] ]

        const deleteCat = Object.entries(newCategories)[1]

        if (deleteCat) {

            if (deleteCat[1].trim() !== 'DeleteCat') {

                setNewCategories(prev => ({

                    ...prev,

                    [deleteCat[0]]: 'DeleteCat'

                }))

                const UpdateItems = newItems.map((item) => {

                    if (item.id_category == deleteCat[0]) {

                        item.name = ' '

                    }

                    return item

                })

                setNewItems(UpdateItems)

            }

            else {

                setNewCategories(prev => ({

                    ...prev,

                    [deleteCat[0]]: 'Categoria 2'

                }))


                for (let item of newItems) {

                    if (item.id_category == deleteCat[0]) {

                        item.name = 'Item 1'

                        break;

                    }

                }

            }

            {// CONSOLES TESTE

                // console.log(deleteCat) ok

                // console.log(key) oK
            }

        }

        else {

            setNewCategories(prev => ({

                ...prev,

                ["NewCategory"]: 'Categoria 2'

            }))

            setNewItems(prevItems => [

                ...prevItems,

                {
                    id_item: 'NewItem1',
                    id_category: 'NewCategory',
                    name: 'Item1'
                }


            ])

        }


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

            const idCat = Number.isNaN(parseInt(e.target.cat)) ? "NewCategory" : parseInt(e.target.cat);

            const UptadeItems = [...newItems,

            {
                id_item: e.target.id,
                id_category: idCat,
                name: e.target.value,

            }
            ]

            setNewItems(UptadeItems)

        }

        // console.log(newItems)

    } //OK

    const removeItem = (e) => {

        const updatedItems = newItems.map(item => {

            if (item.id_item === e.target.id) {

                return { ...item, name: 'deleteItem' };

            }

            return item;

        });

        setNewItems(updatedItems);

    };//OK

    const saveRaffle = async (e) => {

        e.preventDefault()

        const solidItems = newItems.filter(item =>

            typeof item.id_item === "string" &&

            item.name !== "deleteItem" ||

            typeof item.id_item === "number"

        )

        const validNewCat = solidItems.some(item => item.id_category === "NewCategory")

        const solidCat = Object.entries(newCategories).filter(cat => cat[1] !== 'DeleteCat')

        // console.log(solidCat)

        if (validNewCat) {

            // Object.value(newCategories) = ['Alunos', '']

            const validName = Object.values(newCategories)

            validName.map((nameCat) => {

                if (nameCat.trim() == '') {

                    setMessage('Defina o nome da categoria')

                    setBtnMessage('OK')

                }


            })

            if (newRaffleTitle === '') {

                setMessage('Coloque um titulo para o seu Sorteio')

                setBtnMessage('OK')

            }

            else if (validName.length == 1 && solidItems[1].name == ' ' || validName.length == 2 && solidItems[1].name == ' ') {

                setMessage('Coloque no minimo 2 itens na primeira categoria')

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

        else {

            console.log(typeof newRaffleTitle)

            const namesCat = Object.values(newCategories)

            if (newRaffleTitle.trim() === '') {

                setMessage('Coloque um titulo para o seu Sorteio')

                setBtnMessage('OK')

            }

            else if (namesCat[1]?.trim() == '') {

                setMessage('Defina o nome da primeira categoria')

                setBtnMessage('OK')

            }

            else {

                setRaffle(prev => ({

                    ...prev,

                    raffleTitle: newRaffleTitle.toUpperCase(),
                    categories: newCategories,
                    items: solidItems

                }))

            }

        }

    } //OK (eu acho)

    return (

        <div className={Style.body}>

            <input className={Style.titulo} placeholder='Sorteio' onChange={handleTitle} required value={newRaffleTitle}></input>

            <div className={Style.forms}>

                {Object.entries(newCategories ?? {}).map(([index, cat]) => {

                    if (cat.trim() !== 'DeleteCat') {

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

                {
                    //['Alunos', 'Slides']
                }

                {Object.keys(newCategories).length > 1 && Object.values(newCategories).every(value => value.trim() !== 'DeleteCat') ?

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