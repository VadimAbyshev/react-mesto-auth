
import { Link, Route, Routes } from 'react-router-dom';

import logo from '../../images/logo.png'
export default function Header({ dataUser, onLogout }) {
  return (
  <header className="header">
      <img
        className="header__logo"
        alt="Логотип Место"
        src={logo}
      />

      <div className='header__links'>
        <Routes>
          <Route path="/sign-in" element={
            <Link to='/sign-up' className="header__link decoration">Регистрация</Link>}
          />

          <Route path="/sign-up" element={
            <Link to='/sign-in' className="header__link decoration">Войти</Link>}
          />

          <Route exact path="/" element={

            <div className='header__menu'>
              <p className="header__email">{dataUser}</p>

              <Link to='/sign-in'
                onClick={onLogout}
                className="header__logout header__link decoration">Выйти</Link>

            </div>
          } />

        </Routes>
      </div>
  </header>
  );
}

