import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Style from './NavBar.module.css'

function NavBar() {

  const location = useLocation().pathname;

  return (
    <nav className={Style.navegacao}>
      <ul>
        <Link to='/'>
          <li className={location === '/' ? Style.item_marcado : Style.item}>
            Home
          </li>
        </Link>

        <Link to='/cadastro'>
          <li className={location === '/cadastro' ? Style.item_marcado : Style.item}>
            Cadastrar
          </li>
        </Link>

        <Link to='/listagem'>
          <li className={location === '/listagem' || location === '/info_card'  ? Style.item_marcado : Style.item}>
            Sorteios
          </li>
        </Link>
      </ul>
    </nav>
  )

}

export default NavBar