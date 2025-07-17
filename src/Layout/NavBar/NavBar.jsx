import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Style from './NavBar.module.css';

function NavBar() {

  const location = useLocation().pathname;

  const navigate = useNavigate();

  return (

    <nav className={Style.navegacao}>

      <ul>

        <li className={location === '/' ? Style.item_marcado : Style.item}
          onClick={() => { navigate('/') }} >

          Home

        </li>
        <li className={location === '/register' ? Style.item_marcado : Style.item}
          onClick={() => { navigate('/register') }} >

          Cadastrar

        </li>
        <li className={location.includes('/raffle') ? Style.item_marcado : Style.item}
          onClick={() => { navigate('/raffle/list') }}>

          Sorteios

        </li>

      </ul>

    </nav>
  )

};

export default NavBar;