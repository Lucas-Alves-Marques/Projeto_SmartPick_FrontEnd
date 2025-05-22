import React, { useEffect, useState } from "react";
import Style from './Listagem.module.css';
import axios from "axios";
import Card from "./Card_List/Card_List";
import ContainerRaffle from "../../Layout/Container/ContainerRaffle";


function Listagem() {

  const [registeredRaffle, setRegisteredRaffle] = useState([])

  const [message, setMessage] = useState('')

  useEffect(() => {

    const getRaffles = async () => {

      try {

        const raffles = await axios.get('http://localhost:3000/api/raffle/listRaffleName')

        if (raffles.data.message.length > 0) {

          setRegisteredRaffle(raffles.data.message)

        }

        else {

          setMessage('Não há sorteios cadastrados')

        }

      } catch (err) {

        console.log(err)
        setMessage('Não há sorteios cadastrados')

      }

    }

    getRaffles()


  }, []);


  return (

    <div className={Style.body}>


      {message ?

        <div className={Style.background}>

          <h1>{message}</h1>

        </div>

        :

        registeredRaffle.map((raffle) => {

          return (

            <div key={raffle.id_raffle}>

              <ContainerRaffle>

                <Card raffle={raffle}/>

              </ContainerRaffle>

            </div>

          )

        })

      }


    </div >
  );
}

export default Listagem;
