import { useState, useRef, useEffect } from 'react';
import style from './FormRegister.module.css'

function Form({ handleTitleC, category, functioAddItem, functioRevItem, itemsCat }) {

    const [items, setItems] = useState({})

    const lastItem = useRef(null);

    const [count, setCount] = useState(1);

    const [removeItemID, setRemoveItemID] = useState();

    const [seletedCat, setSeletedCat] = useState([])

    useEffect(() => {

        if (itemsCat) {

            const ItemsCat = itemsCat.filter(item => item.id_category == seletedCat[0])

            setItems(ItemsCat) 

        }

    }, [itemsCat])

    // useEffect(()=>{

    //     console.log(items)

    // },[items])

    //Vendo o que vem no category

    useEffect(() => {

        // console.log(category)

        setSeletedCat(Object.entries(category)[0])

        // console.log(seletedCat)

    }, [category])

    const addItem = (e) => {

        if (itemsCat) {

            e.preventDefault()

            // const newArray = {
                
            //     id_item : '', 
            //     id_category: parseInt(seletedCat[0]),
            //     name: `item ${items.length + 1}`

            // }

            // items.push(newArray)

            items.push('teste')

            console.log(items)
            
        }

        else {

            e.preventDefault()

            const uptadeItems = { ...items, [count]: { count: `Posição ${count}` } }

            setCount(count + 1)

            setItems(uptadeItems);

            console.log(uptadeItems)

        }

    };

    const removeItemList = (e) => {

        e.preventDefault()

        if (itemsCat == '') {

            functioRevItem(category, lastItemList)

            const keys = Object.keys(items);

            const ultimaChave = keys[keys.length - 1];

            const novoObj = { ...items };

            delete novoObj[ultimaChave];

            setItems(novoObj)

            console.log(items)
        }

        else {

            const ItemsCopy = [...items];

            for (let i = ItemsCopy.length - 1; i >= 0; i--) {

                if (ItemsCopy[i].name !== "") {

                    ItemsCopy[i].name = "";

                    setRemoveItemID(ItemsCopy[i].id_item);

                    setItems(ItemsCopy);

                    break;
                }
            }

            functioRevItem({

                target: {

                    id: removeItemID,
                }
            });

        }


    };

    const handleInputChange = (index, newValue) => {

        const updatedItems = [...items];

        updatedItems[index].name = newValue;

        setItems(updatedItems);

        functioAddItem({

            target: {

                id: updatedItems[index].id_item,
                value: newValue
            }
        });
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

                :

                <input className={style.inputSubt} placeholder="Categoria" required onChange={handleTitleC}></input>

            }

            <ul>

                {typeof category != 'number' ? (

                    <>

                        {Object.entries(items ?? {}).map((array) => {

                            if (array[1].name != '') {

                                return (

                                    <li key={array[0]}>

                                        <input
                                            id={array[1].id_item}
                                            placeholder={`item ${items.length + 1}`}
                                            onChange={(e) => { handleInputChange(array[0], e.target.value) }}
                                            value={items[array[0]].name}
                                            required>

                                        </input>

                                    </li>

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

                {Object.keys(items).length != 0 &&

                    <button className={style.btn} onClick={(e) => { removeItemList(e) }}>-</button>
                }

            </div>

        </form>

    )
}

export default Form;