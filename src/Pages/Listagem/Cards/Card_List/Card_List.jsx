import Style from './Card_List.module.css';
import { GoPencil as Pencil } from "react-icons/go";
import { LuTrash as Trash } from "react-icons/lu";
import { LuDices as Dices } from "react-icons/lu";
import { RiInformation2Fill as Info } from "react-icons/ri";
import defaultImg from '../../../../Img/Fundo da Listagem.jpg'
import { Link, useNavigate } from 'react-router-dom';

const Card = ({ raffle }) => {

    const navigate = useNavigate();

    const navigateTo = (url, id_raffle) => {

        navigate(`${url}/${id_raffle}`)
    }

    return (

        <div className={Style.background}>

            <img src={defaultImg} />

            <h1>{raffle.name}</h1>

            <div className={Style.icons}>

                <Dices />
                <Pencil />
                <Trash />
                <Info onClick={()=>{navigateTo('/info_card', raffle.id_raffle )}}/>

            </div>

        </div>
    )

};

export default Card;