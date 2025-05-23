import { useState, useRef, useEffect } from 'react';
import style from './FormRegister.module.css'

function Form({ handleTitleC, category, functioAddItem, functioRevItem, itemsCat }) {

    const [items, setItems] = useState([])

    const lastItem = useRef(null);

    // useEffect(()=>{

    //     console.log(category[1])

    // },[category])


    function uptadeItems() {

        const matchedItems = Object.entries(itemsCat ?? {})
            .filter(([_, item]) => item.id_category === category[1])
            .map(([_, item]) => item.name);

        setItems(matchedItems)

    }

    useEffect(() => {

        uptadeItems()

    }, [itemsCat])


    useEffect(() => {

        console.log(items)

    }, [items])

    // useEffect(() => {

    //     console.log(items)

    // }, [])


    const addItem = (e) => {

        e.preventDefault()

        setItems([...items, '']);

    };

    const removeItemList = (e) => {

        e.preventDefault()

        setItems(items.slice(0, -1));

    };

    const [lastItemList, setLastItemList] = useState('')

    useEffect(() => {

        // if (!itemsCat) {

        lastItem.current?.scrollIntoView({ behavior: 'smooth' })

        setLastItemList(items.length + 1)

        // }



    }, [items])


    return (

        <form className={style.form}>

            {category.length > 1 ?

                <input className={style.inputSubt} placeholder="Categoria" required onChange={handleTitleC} value={category[0]} ></input>

                :

                <input className={style.inputSubt} placeholder="Categoria" required onChange={handleTitleC}></input>

            }

            <ul>

                {category.length > 1 ? (

                    <>

                        {
                            items.map((value, index) => {

                                return (

                                    <li key={index}>
                                        <input id={`Cat${category + 1}_item${index + 2}`} placeholder={`item ${index + 2}`} onChange={functioAddItem} value={value} required></input>
                                    </li>

                                )
                            })
                        }

                    </>

                ) : (

                    <>

                        <li>

                            <input id={`Cat${category + 1}_item1`} placeholder='item 1' onChange={functioAddItem}></input>

                        </li>

                        {items.map((_, index) => {

                            return (

                                <li key={index}>
                                    <input id={`Cat${category + 1}_item${index + 2}`} placeholder={`item ${index + 2}`} onChange={functioAddItem} required></input>
                                </li>

                            )
                        })}

                    </>
                )}

                <div ref={lastItem} />

            </ul>

            <div className={items.length == 0 ? style.btns1 : style.btns2}>

                <button className={style.btn} onClick={addItem}>+</button>

                {items.length > 0 &&

                    <button className={style.btn} onClick={(e) => { functioRevItem(category, lastItemList); removeItemList(e) }}>-</button>
                }

            </div>

        </form>

    )
}

export default Form;