import Style from './Card.module.css';
import { GoPencil as Pencil } from "react-icons/go";
import { LuTrash as Trash } from "react-icons/lu";
import { LuDices as Dices } from "react-icons/lu";
import { RiInformation2Fill } from "react-icons/ri";
import defaultImg from '../../../Img/Fundo da Listagem.jpg'

const Card = ({ id, title }) => {

    return (

        <div className={Style.background}>

            <img src={defaultImg} />

            <h1><RiInformation2Fill />{title}</h1>

            <div className={Style.icons}>

                <Dices />
                <Pencil className={Style.Pencil} />
                <Trash />

            </div>

        </div>
    )

};

export default Card;