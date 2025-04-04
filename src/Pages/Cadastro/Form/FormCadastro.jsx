import { useState } from 'react';
import style from './FormCadastro.module.css'

function Form() {

    const [itens, setItens] = useState([])


    const adicionarElemento = (e) => {

        e.preventDefault()

        setItens([...itens, '']);

    };

    return (
        <form className={style.form}>

            <input placeholder="Categoria"></input>
            <ul>

                <li>

                    <input placeholder='item 1'></input>

                </li>

                {itens.map((_, index) => {
                    
                    return (

                        <li key={index}>
                            <input placeholder={`item ${index + 2}`}></input>
                        </li>

                    )})}

            </ul>

            <button onClick={adicionarElemento}>Novo Item</button>
        </form>

    )
}

export default Form;