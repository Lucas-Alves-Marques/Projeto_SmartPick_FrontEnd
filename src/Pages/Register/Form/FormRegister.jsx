import { useState, useRef, useEffect } from 'react';
import style from './FormRegister.module.css'

function Form({handleTitleC}) {

    const [items, setItems] = useState([])
    const lastItem = useRef(null);

    const addItem = (e) => {

        e.preventDefault()

        setItems([...items, '']);

    };

    const removeItem = (e) => {

        e.preventDefault()

        setItems(items.slice(0, -1));

    };

    useEffect(() => {

        lastItem.current?.scrollIntoView({ behavior: 'smooth' })

    }, [items])


    return (
        <form className={style.form}>

            <input className={style.inputSubt} placeholder="Categoria" required onChange={handleTitleC}></input>
            <ul>

                <li>

                    {/* <input placeholder='item 1' id={`${idCategory}-item1`} onChange={action}></input> */}
                    <input placeholder='item 1' ></input>

                </li>

                {items.map((_, index) => {

                    return (

                        <li key={index}>
                            {/* <input id={`${idCategory}-item${index + 2}`} placeholder={`item ${index + 2}`} onChange={action} required></input> */}
                            <input placeholder={`item ${index + 2}`} required></input>
                        </li>

                    )
                })}

                <div ref={lastItem} />

            </ul>

            <div className={items.length == 0 ? style.btns1 : style.btns2}>

                <button className={style.btn} onClick={addItem}>+</button>

                {items.length > 0 &&

                    <button className={style.btn} onClick={removeItem}>-</button>
                }

            </div>

        </form>

    )
}

export default Form;