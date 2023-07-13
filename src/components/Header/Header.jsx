import logo from '../../images/logo.png'
export default function Header(){
    return(
        <header className="header">
        <img
          className="header__logo"
          alt="Логотип Место"
          src={logo}
        />
      </header>
    );
}