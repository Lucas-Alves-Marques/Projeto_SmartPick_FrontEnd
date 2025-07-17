import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImg from '../../Img/Fundo da Listagem.jpg'
import Style from './Details.module.css'
import CardDetails from "./CardDetails/CardDetails";
import { GoPencil as Pencil } from "react-icons/go";
import { LuTrash as Trash } from "react-icons/lu";
import { LuDices as Dices } from "react-icons/lu";
import { IoMdArrowRoundBack as Return } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Details = () => {

    const { id_raffle } = useParams();

    const [raffleSeleted, setRaffleSeleted] = useState({});

    const [deleteMsg, setdDeleteMsg] = useState(false);

    const { title, categories, items } = raffleSeleted;

    const navigate = useNavigate();

    const deleteRaffle = async (id_raffle) => {

        setdDeleteMsg(true)

        await axios.delete(`http://localhost:3000/api/raffle/deleteRaffle/${id_raffle}`)

        console.log(id_raffle)

    };

    useEffect(() => {

        try {

            const getRaffle = async () => {

                const raffle = await axios.get(`http://localhost:3000/api/raffle/listRaffle/${id_raffle}`)

                setRaffleSeleted(raffle.data.message)

            }

            getRaffle()
        }

        catch (err) {

            console.log(err)
        }

    }, [id_raffle]);


    return (

        <div className={Style.body}>

            <div className={Style.iniData}>

                <h1>{title}</h1>
                <img src={defaultImg} alt='Imagem com um ponto de interrogação'/>

            </div>
            <div className={Style.listCat}>

                <h1>Categorias</h1>
                <div className={Style.categories}>

                    {Object.entries(categories ?? {}).map(([key, value], index) => (

                        <div key={index}>

                            <CardDetails cat={value} items={items} position={key} />

                        </div>
                    ))}

                </div>
                <div className={Style.icons}>

                    <Return
                        onClick={() => { navigate('/raffle/list') }}
                    />
                    <Dices
                        onClick={() => { navigate(`/raffle/prizeDraw/${id_raffle}`) }}
                    />
                    <Pencil
                        onClick={() => { navigate(`/raffle/uptade/${id_raffle}`)  }}
                    />
                    <Trash
                        onClick={() => { deleteRaffle(id_raffle) }}
                    />

                </div>

            </div>

            {deleteMsg &&

                <div className={Style.backgroundMSG}>

                    <h1>Sorteio Deletado</h1>

                    <button onClick={() => { setdDeleteMsg(false); navigate('/raffle/list')  }}>OK</button>

                </div >

            }

        </div>

    );

};

export default Details