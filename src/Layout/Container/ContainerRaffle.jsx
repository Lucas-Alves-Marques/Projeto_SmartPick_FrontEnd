import style from '../Container/ContainerRaffle.module.css'

const ContainerRaffle = (props) => {

    return (

        <div className={style.container_raffle}>

            {props.children}

        </div>
    )
}

export default ContainerRaffle;