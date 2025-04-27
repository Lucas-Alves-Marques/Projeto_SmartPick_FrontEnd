import React, { useEffect, useState } from "react";
import Style from './Listagem.module.css';
import axios from "axios";
import Card from "./Card/Card";

function Listagem() {

  const [registeredRaffle, setRegisteredRaffle] = useState([])

  useEffect(() => {

    const getRaffles = async () => {

      try {

        const raffles = await axios.get('http://localhost:3000/api/raffle/listRaffleName')

        setRegisteredRaffle(raffles.data.message)

      } catch (err) {

        console.log(err)

      }

    }

    getRaffles()


  }, []);

  //So para ver se o sorteio está vindo

  useEffect(() => {

    const viewRaffle = () => {

      console.log(registeredRaffle)

    }

    viewRaffle();


  }, [registeredRaffle]);

  return (

    <div className={Style.body}>

      {registeredRaffle.map((raffle)=>{

        return(

          <Card id={raffle.id_raffle} title={raffle.name} />

        )

      })

      }

    </div>
  );
}

export default Listagem;
