import { useState, useRef, useEffect } from 'react';
import style from './FormRegister.module.css'

function Form({ handleTitleC, category, functioAddItem, functioRevItem, itemsCat }) {

    const [items, setItems] = useState({})

    const lastItem = useRef(null);

    const [seletedCat, setSeletedCat] = useState([])

    const handleItem = (value, index) => {

        setItems(prevItems => {

            const updated = [...prevItems];

            updated[index] = value;

            return updated;
        });

        // console.log(newItems)
    }

    // useEffect(() => {

    //     const matchedItems = Object.entries(itemsCat ?? {})
    //         .filter(([_, item]) => item.id_category === category[1])

    //     setItems(matchedItems)

    //     console.log(items)

    // }, [])

    useEffect(() => {

        // console.log(itemsCat)
        setItems(itemsCat)

    }, [itemsCat])

    //Vendo o que vem no category

    useEffect(() => {

        // console.log(category)

        setSeletedCat(Object.entries(category)[0])

        // console.log(seletedCat)

    }, [category])

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

        if (!itemsCat) {

            lastItem.current?.scrollIntoView({ behavior: 'smooth' })

            setLastItemList(items.length + 1)

        }

    }, [items])


    return (

        <form className={style.form}>

            {typeof category != 'number' ?

                <input className={style.inputSubt} placeholder="Categoria" required onChange={handleTitleC} value={seletedCat[1]} ></input>

                : <input className={style.inputSubt} placeholder="Categoria" required onChange={handleTitleC}></input>

            }

            <ul>

                {typeof category != 'number' ? (

                    <>

                        {Object.entries(items ?? {}).map((array) => {

                            if (array[1].id_category == seletedCat[0]) {

                                return (

                                    <li key={array[0]}>

                                        <input
                                            id={array[1].id_item}
                                            placeholder={`item ${array[0] + 2}`}
                                            onChange={(e) => { handleItem(e.target.value, array[0]); functioAddItem(e) }}
                                            value={array[1].name}
                                            required>

                                        </input>

                                    </li>

                                    // console.log(array)


                                )

                            }

                        })}

                    </>

                ) : (

                    <>

                        <li>

                            <input id={`Cat${category + 1}_item1`} placeholder='item 1' onChange={functioAddItem}></input>

                        </li>

                        {Object.entries(items ?? {}).map((_, index) => {

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

            <div className={Object.keys(items).length === 0 ? style.btns1 : style.btns2}>

                <button className={style.btn} onClick={addItem}>+</button>

                {items.length > 0 &&

                    <button className={style.btn} onClick={(e) => { functioRevItem(category, lastItemList); removeItemList(e) }}>-</button>
                }

            </div>

        </form>

    )
}

export default Form;