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

    const [deleteMsg, setDeleteMsg] = useState('');

    const { title, categories, items } = raffleSeleted;

    const navigate = useNavigate();

    const confirmDelete = () => {

        setDeleteMsg('Deseja mesmo excluir o sorteio?');

    };

    const deleteRaffle = async (e) => {

        e.preventDefault();

        setDeleteMsg('Sorteio Deletado')

        await axios.delete(`http://localhost:3000/api/raffle/deleteRaffle/${id_raffle}`)


    };

    const clearDelete = (e) => {

        e.preventDefault();

        setDeleteMsg('');


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
                <img src={defaultImg} alt='Imagem com um ponto de interrogação' />

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
                        onClick={() => { navigate(`/raffle/uptade/${id_raffle}`) }}
                    />
                    <Trash
                        onClick={() => { confirmDelete() }}
                    />

                </div>

            </div>

            {deleteMsg &&

                <div className={Style.backgroundMSG}>

                    <h3>{deleteMsg}</h3>

                    {deleteMsg.includes("?")

                        ?

                        <div className={Style.alingBtns}>

                            <button onClick={(e) => { deleteRaffle(e) }}>Sim</button>
                            <button onClick={(e) => { clearDelete(e) }}>Não</button>

                        </div>

                        :

                        <button onClick={() => { setDeleteMsg(''); navigate('/raffle/list') }}>OK</button>

                    }


                </div >

            }

        </div>

    );

};

export default Details