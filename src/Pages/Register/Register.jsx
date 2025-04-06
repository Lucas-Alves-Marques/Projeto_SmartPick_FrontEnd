import React, { useState } from 'react';
import Style from './Register.module.css';

import Form from './Form/FormRegister';

function Register() {

  const [category, setCategory] = useState(1)

  const [raffle, setRaffle] = useState([])

  const [message, setMessage] = useState('')

  function registerRaffle(e) {

    e.preventDefault()

    setRaffle({ ...raffle, [e.target.id]: e.target.value })

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

      <input id={'raffle'} className={Style.titulo} placeholder='Sorteio' onChange={registerRaffle} required></input>

      <div className={Style.forms}>

        <Form idCategory={'category_1'} action={registerRaffle} />

        {category === 2 &&

          <>

            <Form idCategory={'category_2'} action={registerRaffle} />

          </>

        }

      </div>

      <div className={Style.bnts}>

        {category === 1 &&

          <>

            <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); setCategory(2) }}>Por Combinação</button>
            <button className={Style.btnSave} onClick={saveRaffle}>Salvar</button>

          </>

        }

        {category === 2 &&

          <>

            <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); setCategory(1) }}>Sorteio Simples</button>
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
