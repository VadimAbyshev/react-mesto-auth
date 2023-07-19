import { useState } from "react";
import { Link } from "react-router-dom";


export default function Register({onRegister, name, isLoadingSend}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <>      
      <section className="login page_login">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form form" 
                 action="#"
                 name={name}
                 noValidate
                 onSubmit={handleSubmit}>
                
          
          <input
            
            className="login__form-input"
            placeholder="Email"
            name="email"
            type="email"
            required
            onChange={handleEmailChange}
          ></input>


          <input
            className="login__form-input"
            placeholder="Пароль"
            name="password"
            type="password"
            required
            onChange={handlePasswordChange}
          ></input>
          <button className="login__form-submit-button decoration" type="submit">
            

            {isLoadingSend ? 'Зарегистрироваться' +'...' : 'Зарегистрироваться'}
          </button>
          
        </form>
        <p className="login__subtitle">Уже зарегистрированы? <Link to="/sign-in" className='login__subtitle-link decoration'> Войти</Link></p>
      </section>
    </>
  );
}

