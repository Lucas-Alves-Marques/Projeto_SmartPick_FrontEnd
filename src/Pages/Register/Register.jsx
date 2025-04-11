import React, { useState } from 'react';
import Style from './Register.module.css';
import axios from 'axios';
import Form from './Form/FormRegister';
import { wait } from '@testing-library/user-event/dist/utils';

function Register() {

  const [raffle, setRaffle] = useState({

    raffleTitle: '',
    categories: [],
    items: {}

  })

  const [newCategories, setNewCategories] = useState([''])

  const [newRaffleTitle, setNewRaffleTitle] = useState('')

  const [newItems, setNewItems] = useState({})

  const [message, setMessage] = useState('')

  const handleItem = (e) => {

    e.preventDefault()

    setNewItems({ ...newItems, [e.target.id]: e.target.value })

    // console.log(newItems)

  }

  const removeItem = (cate, nitem) => {

    if (cate == 0) {

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

    if (newCategories.length == 2) {

      setNewCategories(newCategories.slice(0, -1));
    }

    else {

      setNewCategories([...newCategories, '1'])

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

    // if (Object.keys(raffle).length < 4) {

    //   setMessage('Preencha pelo menos 4 campos para continuar')

    //   return;

    // }

    // else {

    // const validateField = Object.values(raffle).some(

    //   (field) => field.trim() != ""

    // )

    // if (validateField) {

    //   setMessage('Preencha todos os campos')
    // }

    // else {

    setRaffle(prev => ({

      ...prev,

      raffleTitle: newRaffleTitle,
      categories: newCategories,
      items: newItems

    }))

    try {

      await axios.post(' http://localhost:3000/api/raffle/createRaffle', raffle)

      setMessage('Sorteio Cadastrado')

    } catch (err) {

      console.log(`Erro: ${err}`)

      setMessage('Erro ao Cadastrar Sorteio')

    }





  }

  return (

    <div className={Style.body}>

      <input className={Style.titulo} placeholder='Sorteio' onChange={handleTitle} required></input>

      <div className={Style.forms}>

        {newCategories.map((cat, index) => {

          return <Form key={index} handleTitleC={(e) => uptadeNameCategory(index, e.target.value)} category={index} functioAddItem={handleItem} functioRevItem={removeItem} />

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

      {message != '' &&

        <div className={Style.message}>

          <h3>{message}</h3>
          <button onClick={() => { setMessage(''); console.log(raffle) }}>Ir para Sorteios</button>

        </div>

      }

    </div>
  );
}

export default Register;
