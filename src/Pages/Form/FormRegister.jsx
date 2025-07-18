import { useState, useRef, useEffect } from 'react';
import style from './FormRegister.module.css'

function Form({ handleTitleC, category, functioAddItem, functioRevItem, itemsCat, type }) {

    const [count, setCount] = useState(2);

    const [items, setItems] = useState([]);

    const lastItem = useRef(null);

    const [removeItemID, setRemoveItemID] = useState();

    const [seletedCat, setSeletedCat] = useState([]);

    const [lastItemList, setLastItemList] = useState('');

    useEffect(() => {

        if (itemsCat.length > 1) {

            const ItemsCat = itemsCat.filter(item => item.id_category == seletedCat[0])

            setItems(ItemsCat)

        }

    }, [itemsCat, seletedCat])

    useEffect(() => {

        setSeletedCat(Object.entries(category)[0])

    }, [category])

    useEffect(() => {

        if (!itemsCat) {

            lastItem.current?.scrollIntoView({ behavior: 'smooth' })

            setLastItemList(items.length + 1)

        }

    }, [items, itemsCat])

    const addItem = (e) => {

        if (itemsCat.length > 0) {

            e.preventDefault()

            const notName = items.filter((item) => {

                const validItem = Object.entries(item).every((item) => item[1] !== "deleteItem")

                if (validItem == false) {

                    return item
                }

                return null;

            })

            if (notName.length < 1) {

                setItems(prevItems => [

                    ...prevItems,

                    {
                        id_item: `NewItem${count}`,
                        id_category: seletedCat[0],
                        name: `item ${prevItems.length + 1}`,
                    }

                ]);

                setCount(count + 1)

            }

            else {

                items.map((item, index) => {

                    if (item.id_item == notName[0].id_item) {

                        const newItems = [...items];

                        newItems[index].name = `Item ${index + 1}`

                        if (!category) {

                            newItems[index].id_category = "NewCategory"
                        }

                        setItems(newItems)

                    }

                    return null;

                })

            }

            lastItem.current?.scrollIntoView({ behavior: 'smooth' })

        }

        else {

            e.preventDefault()

            if (type == 'update') {

                for (const item in items) {

                    let countItem = 0;

                    if (typeof item.id_item == 'number' && item.name == 'deleteItem') {

                        item.name = `Item ${countItem + 1}`

                        break;

                    }

                    else {

                        if (item.name == 'deleteItem') {

                            item.name = `Item ${count}`

                            break;
                        }

                        else if (countItem == items.length) {

                            const addItem = {
                                id_item: `NewItem${count}`,
                                id_category: 'NewCategory',
                                name: `item ${count}`,
                            }

                            setItems(prevItems => [

                                ...prevItems,

                                addItem
                            ]

                            )

                            break;

                        }

                        else {
                            countItem++;
                        }


                    }

                }

            }

            else {

                const addItem = {
                    id_item: `NewItem${count}`,
                    id_category: 'NewCategory',
                    name: `item ${count}`,
                }

                setItems(prevItems => [

                    ...prevItems,

                    addItem
                ]

                )
            }

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

        }

        else {

            const ItemsCopy = [...items];

            for (let i = ItemsCopy.length - 1; i >= 0; i--) {

                if (ItemsCopy[i].name !== "deleteItem") {

                    ItemsCopy[i].name = "deleteItem";

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

        setCount(count - 1)

    };

    const handleInputChange = (index, newValue) => {

        const updatedItems = [...items];

        updatedItems[index].name = newValue;

        setItems(updatedItems);


        functioAddItem({

            target: {

                id: updatedItems[index].id_item,
                cat: seletedCat[0],
                value: newValue

            }
        });


    };
    
    return (

        <form className={style.form}>

            {type == 'update' ?

                <input className={style.inputSubt} placeholder="Categoria" required onChange={handleTitleC} value={seletedCat[1]} ></input>

                :

                <input className={style.inputSubt} placeholder="Categoria" required onChange={handleTitleC}></input>

            }

            <ul>

                {type == 'update' ? (

                    <>

                        {items.map((item, index) => {

                            if (item.name !== 'deleteItem') {

                                return (

                                    <li key={item.id_item}>

                                        <input
                                            id={item.id_item}
                                            placeholder={`item ${index + 1}`}
                                            onChange={(e) => { handleInputChange(index, e.target.value) }}
                                            value={item.name}
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

            <div className={items[1] && items[1]?.name !== 'deleteItem' ? style.btns2 : style.btns1}>

                <button className={style.btn} onClick={addItem}>+</button>

                {items[1] && items[1]?.name !== 'deleteItem' ?

                    <button className={style.btn} onClick={removeItemList}>-</button>

                    : <></>
                }

            </div>

        </form>

    )
}

export default Form;