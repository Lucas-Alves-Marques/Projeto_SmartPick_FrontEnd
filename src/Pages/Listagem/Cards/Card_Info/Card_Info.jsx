import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const Card_Info = () => {

    const { id_raffle } = useParams();

    const [raffleSeleted, setRaffleSeleted] = useState({});

    useEffect(() => {

        try {

            const getRaffle = async () => {

                const raffle = await axios.get(`http://localhost:3000/api/raffle/listRaffle/${id_raffle}`)

                setRaffleSeleted(raffle)

            }

            getRaffle()
        }

        catch(err){

            console.log(err)
        }

    }, {id_raffle})

    return (

        <div>

            <h1>{raffleSeleted.name}</h1>

        </div>

    )

};

export default Card_Info