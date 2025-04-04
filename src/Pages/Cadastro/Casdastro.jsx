import React, { use, useState } from 'react';
import Style from './Cadastro.module.css';

import Input from '../../Form/Input';
import Button from '../../Form/Button';
import Form from './Form/FormCadastro';

function Cadastro() {

  const [categoria, setCategoria] = useState(1)



  return (
    <div className={Style.body}>

      <input className={Style.titulo} placeholder='Sorteio'></input>

      <form>

        <Form />

        {categoria === 2 &&

          <>

            <Form />

          </>

        }

        <div className={Style.botao}>

          {categoria === 1 &&

            <button onClick={(e) => { e.preventDefault(); setCategoria(2) }}> + </button>

          }

          <button onClick={(e) => { e.preventDefault(); setCategoria(1) }}> - </button>

        </div>

      </form>
    </div>
  );
}

export default Cadastro;
