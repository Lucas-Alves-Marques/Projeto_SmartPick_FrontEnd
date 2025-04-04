import { useState, useRef, useEffect } from 'react';
import style from './FormCadastro.module.css'

function Form() {

    const [itens, setItens] = useState([])

    const adicionarItem = (e) => {

        e.preventDefault()

        setItens([...itens, '']);

    };

    const removerItem = (e) => {

        e.preventDefault()

        setItens(itens.slice(0,-1));

    };

    const finalDaListaRef = useRef(null);

    useEffect(()=>{

        finalDaListaRef.current?.scrollIntoView({behavior: 'smooth',  block: 'end'})

    },[itens])

    return (
        <form className={style.form}>

            <input className={style.inputSubt} placeholder="Categoria"></input>
            <ul>

                <li>

                    <input placeholder='item 1'></input>


                </li>

                {itens.map((_, index) => {

                    return (
                        <div className={style.item}>

                            <li key={index}>
                                <input placeholder={`item ${index + 2}`}></input>
                            </li>

                        </div>

                    )
                })}

                <div ref={finalDaListaRef}/>

            </ul>

            <div className={itens.length == 0 ? style.btns1 : style.btns2}>

                <button className={style.btn} onClick={adicionarItem}>+</button>

                { itens.length > 0 &&

                    <button className={style.btn} onClick={removerItem}>-</button>
                }

            </div>

        </form>

    )
}

export default Form;