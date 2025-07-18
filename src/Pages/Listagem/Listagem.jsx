import { useEffect, useState } from "react";
import Style from './Listagem.module.css';
import axios from "axios";
import Card from "./Card_List/Card_List";
import ContainerRaffle from "../../Layout/Container/ContainerRaffle";

function Listagem() {

  const [registeredRaffle, setRegisteredRaffle] = useState([]);

  const [message, setMessage] = useState('');

  const [deleteMsg, setDeleteMsg] = useState('');

  const [id_Del, setId_Del] = useState(null);

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

  };

  useEffect(() => {

    getRaffles()

  }, []);

  const confirmDelete = (id_raffle) => {

    setDeleteMsg('Deseja mesmo excluir o sorteio?');

    setId_Del(id_raffle);

  };

  const deleteRaffle = async (e) => {

    e.preventDefault();

    setDeleteMsg('Sorteio Deletado');

    await axios.delete(`http://localhost:3000/api/raffle/deleteRaffle/${id_Del}`);


  };

  const clearDelete = (e) => {

    e.preventDefault();

    setDeleteMsg('');

    setId_Del(null);


  };

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

                <Card raffle={raffle} deleteFunction={confirmDelete} />

              </ContainerRaffle>

            </div>

          )

        })

      }

      {deleteMsg &&

        <div className={Style.backgroundMSG}>

          <h3>{deleteMsg}</h3>

          {deleteMsg.includes("?")

            ?

            <div>

              <button onClick={(e) => { deleteRaffle(e) }}>Sim</button>
              <button onClick={(e) => { clearDelete(e) }}>Não</button>

            </div>

            :

            <button onClick={() => { setDeleteMsg(''); getRaffles() }}>OK</button>

          }


        </div >

      }


    </div >

  );
}

export default Listagem;
