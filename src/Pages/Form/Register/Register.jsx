import React, { useEffect, useState } from 'react';
import Style from './Register.module.css';
import axios from 'axios';
import Form from '../FormRegister';
import { useNavigate } from "react-router-dom";

function Register() {

  const [raffle, setRaffle] = useState({

    raffleTitle: '',
    categories: [],
    items: {}

  })

  const [newRaffleTitle, setNewRaffleTitle] = useState('')

  const [newCategories, setNewCategories] = useState([''])

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

    const uptade = [...newCategories]

    uptade[index] = value

    setNewCategories(uptade)

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

      console.log(newItems)

      console.log(validItems)

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

  useEffect(() => {

    const sendToDataBase = async () => {


      try {

        await axios.post(' http://localhost:3000/api/raffle/createRaffle', raffle)

        // console.log(raffle)

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

      <input className={Style.titulo} placeholder='Sorteio' onChange={handleTitle} required></input>

      <div className={Style.forms}>

        {newCategories.map((cat, index) => {

          return (<Form key={index} 
                        handleTitleC={(e) => uptadeNameCategory(index, e.target.value)} 
                        category={index} 
                        functioAddItem={handleItem} 
                        functioRevItem={removeItem}
                        itemsCat={''}
                        type={'resgister'}
                        />)

        })

        }

      </div>

      <div className={Style.bnts}>

        {newCategories.length < 2 &&

          <>

            <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); handleCategory() }}>Por Combinação</button>
            <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>

          </>

        }

        {newCategories.length >= 2 &&

          <>

            <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); handleCategory() }}>Sorteio Simples</button>
            <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>

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


export default Register;

