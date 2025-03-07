import React from 'react'
import { Link } from 'react-router-dom'
import Style from  './NavBar.module.css'
import Logo from '../Img/Logo Smart Pick.png'

function NavBar() {
    
  return (
    <nav className={Style.navegacao}>
        <div className={Style.titulo}>
        <img className={Style.logo} src={Logo} />
        <h1>Smart Pick</h1>
        </div>
        <ul>
            <Link to='/'> <li>Home</li> </Link>

            <Link to='/cadastro'><li>Cadastro</li></Link>

            <Link to='/listagem'><li>Listagem</li></Link>
        </ul>
    </nav>
  )
  
}

export default NavBar