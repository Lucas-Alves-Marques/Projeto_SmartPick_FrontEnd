import Style from './Card.module.css';
import { GoPencil as Pencil } from "react-icons/go";
import { LuTrash as Trash } from "react-icons/lu";
import { LuDices as Dices } from "react-icons/lu";

const Card = ({ id, title }) => {

    return (

        <div className={Style.background}>

            <h1>{title}</h1>

            <div className={Style.icons}>

                <Dices />
                <Pencil className={Style.Pencil} />
                <Trash />

            </div>

        </div>
    )

};

export default Card;