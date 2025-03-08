import React from 'react'
import Logo from '../../Img/Logo Smart Pick.png'
import Style from './Home.module.css'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <div className={Style.body}>
      <img className={Style.img} src={Logo} alt='Logo do Projeto Smart Pick' />
      <div className={Style.text}>
        <h1>Bem-Vindo ao Melhor Site de Sorteios Online</h1>
        <h4>Clique em <span>"Sorteios"</span> para começar ou crie um personalizado em <span>"Cadastrar"</span></h4>
        <div>
          <button className={Style.btn}><Link to={'/listagem'}>Sorteios</Link></button>
        </div>
      </div>
    </div>
  )

}

export default Home