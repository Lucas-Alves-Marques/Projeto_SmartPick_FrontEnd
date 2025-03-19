import React from 'react';
import Style from './Cadastro.module.css';

import Input from '../../Form/Input';
import Button from '../../Form/Button';

function Cadastro() {


  
  return (
    <div className={Style.body}>
      <h1>Cadastrar</h1>

      <form>
        <Input
          type="text"
          name="txt_categoria"
          id="txt_categoria"
          placeholder="Digite o nome da categoria"
        />

        <Input 
          type="text"
          name="txt_item_1"
          id="txt_item_1"
          placeholder="Digite o nome do item"
        />

        <Input 
          type="text"
          name="txt_item_2"
          id="txt_item_2"
          placeholder="Digite o nome do item"
        />

        <Input 
          type="text"
          name="txt_item_3"
          id="txt_item_3"
          placeholder="Digite o nome do item"
        />

        <Button label="Cadastrar Sorteio" />
      </form>
    </div>
  );
}

export default Cadastro;
