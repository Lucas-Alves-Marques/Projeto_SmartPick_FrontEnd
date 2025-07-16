import Style from './Card_List.module.css';
import { GoPencil as Pencil } from "react-icons/go";
import { LuTrash as Trash } from "react-icons/lu";
import { LuDices as Dices } from "react-icons/lu";
import { RiInformation2Fill as Info } from "react-icons/ri";
import defaultImg from '../../../Img/Fundo da Listagem.jpg'
import { useNavigate } from 'react-router-dom';

const Card = ({ raffle, deleteFunction }) => {

    const navigate = useNavigate();

    return (

        <>

            <div className={Style.background} >

                <img src={defaultImg} />

                <h1>{raffle.name}</h1>

                <div className={Style.icons}>

                    <Dices
                        onClick={() => { navigate(`/raffle/prizeDraw/${raffle.id_raffle}`) }}
                    />
                    <Pencil
                        onClick={() => { navigate(`/raffle/uptade/${raffle.id_raffle}`) }}
                    />
                    <Trash
                        onClick={() => { deleteFunction(raffle.id_raffle) }}
                    />
                    <Info
                        onClick={() => { navigate(`/raffle/info_card/${raffle.id_raffle}`) }}
                    />

                </div>

            </div>


        </>



    )

};

export default Card;