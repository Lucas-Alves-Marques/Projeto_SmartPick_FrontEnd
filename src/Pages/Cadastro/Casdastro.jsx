import React, { use, useState } from 'react';
import Style from './Cadastro.module.css';

import Form from './Form/FormCadastro';

function Cadastro() {

  const [categoria, setCategoria] = useState(1)



  return (
    <div className={Style.body}>

      <input className={Style.titulo} placeholder='Sorteio'></input>

      <div className={Style.forms}>

        <Form />

        {categoria === 2 &&

          <>

            <Form />

          </>

        }

      </div>

      <div className={Style.bnts}>

        {categoria === 1 &&

          <>

            <button className={Style.bntDefault} onClick={(e) => { e.preventDefault(); setCategoria(2) }}>Por Combinação</button>
            <button className={Style.btnSave}>Salvar</button>

          </>

        }

        {categoria === 2 &&

          <>

            <button  className={Style.bntDefault} onClick={(e) => { e.preventDefault(); setCategoria(1) }}>Sorteio Simples</button>
            <button className={Style.btnSave} onClick={(e)=>{e.preventDefault()}}>Salvar</button>

          </>

        }

      </div>
    </div>
  );
}

export default Cadastro;
