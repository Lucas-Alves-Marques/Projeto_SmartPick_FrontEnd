import React, { useState } from 'react';
import Style from './Register.module.css';

import Form from './Form/FormRegister';

function Register() {

  const [category, setCategory] = useState(1)

  const [raffle, setRaffle] = useState([])

  const [categories, setCategories] = useState(['',''])

  const [raffleTitle, setRaffleTitle] = useState('')

  const [message, setMessage] = useState('')

  function registerRaffle(e) {

    e.preventDefault()

    setRaffle({ ...raffle, [e.target.id]: e.target.value })

  }

  const handleTitle = (e) =>{

    setRaffleTitle(e.target.value)

    console.log(raffleTitle)

  }

  const handleCategory = () =>{

    if(categories.length == 2) {

      setCategories(categories.slice(0, -1));
    }

    else{

    setCategories([...categories,'1'])

    }

    console.log(categories)

  }

  const uptadeNameCategory = (index, value) =>{

    const uptade = [...categories]

    uptade[index] = value

    setCategories(uptade)

    console.log(categories)

  }

  const saveRaffle = (e) => {

    e.preventDefault()

    if (Object.keys(raffle).length < 4) {

      setMessage('Preencha pelo menos 4 campos para continuar')

      return;

    }

    else {

      const validateField = Object.values(raffle).some(

        (field) => field.trim() === ""

      )

      if (validateField) {

        setMessage('Preencha todos os campos')
      }

      else {

        if (category === 1) {

          const raffleDefined = Object.fromEntries(

            Object.entries(raffle).filter(([chave, _]) => chave.includes("category_1") || chave === "raffle")

          );

          console.log(raffleDefined)

          setRaffle(raffleDefined)

          setMessage('Sorteio Cadastrado')

        }

        else {
          console.log(raffle)

          setMessage('Sorteio Cadastrado')
        }

      }

    }


  }

  return (
    <div className={Style.body}>

      <input className={Style.titulo} placeholder='Sorteio' onChange={handleTitle} required></input>

      <div className={Style.forms}>

        {categories.map((cat, index)=>{

          return <Form key={index} handleTitleC={(e) => uptadeNameCategory(index, e.target.value)} />

        })

        }

      </div>

      <div className={Style.bnts}>

        {categories.length < 2 &&

          <>

            <button className={Style.bntDefault} onClick={(e) => {e.preventDefault();handleCategory()}}>Por Combinação</button>
            <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>

          </>

        }

        {categories.length >= 2 &&

          <>

            <button className={Style.bntDefault} onClick={(e) => {e.preventDefault();handleCategory()}}>Sorteio Simples</button>
            <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>

          </>

        }

      </div>

      {message != '' &&

        <div className={Style.message}>

          <h3>{message}</h3>
          <button onClick={()=>{setMessage('')}}>Ir para Sorteios</button>

        </div>

      }

    </div>
  );
}

export default Register;
